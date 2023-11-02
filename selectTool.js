// This function initializes a selection tool for a piano roll.
export function selectTool() {
    // Find the container for the piano roll and the SVG element.
    const pianoRoll = document.querySelector(".piano-roll-card-clicked");
    const selection = pianoRoll.querySelector(".piano-roll-svg");

    // Create the selection tool elements.
    const createElem = document.createElement('div');
    const createBtn = document.createElement('button');
    createBtn.classList = 'select-tool-btn';
    createElem.classList = 'select-area';

    // Get references to the selection tool and the close button.
    const getSelectedTool = document.querySelector('.select-area');
    const getCloseBtn = document.querySelector('.select-tool-btn');

    // Initialize state variables.
    let isSelecting = false;
    let startX, endX;

    // Event listener for clicking on the selection area.
    selection.addEventListener('click', (e) => {
        // Check if a selection tool already exists, and remove it if it does.
        const existingCreateElem = document.querySelector('.select-area');
        if (existingCreateElem) {
            existingCreateElem.remove();
        } else {
            // Create a new selection tool element and append it to the piano roll.
            createElem.appendChild(createBtn);
            pianoRoll.appendChild(createElem);

            // Enable selection and set the start position.
            isSelecting = true;
            startX = e.clientX;
            // Get the reference to the selection tool.
            const getSelectedTool = document.querySelector('.select-area');

            if (getSelectedTool) {
                // Customize the appearance of the selection tool.
                getSelectedTool.style.backgroundColor = '#1C1C1A';
                getSelectedTool.style.left = startX + "px";
                getSelectedTool.style.width = "2px";
                getSelectedTool.style.display = "block";
            }
        }
    });

    // Event listener for mouse down (start of selection).
    selection.addEventListener("mousedown", (e) => {
        isSelecting = true;
        startX = e.clientX;

        if (getSelectedTool) {
            getSelectedTool.style.left = startX + "px";
            getSelectedTool.style.width = "0";
            getSelectedTool.style.display = "block";
        }
    });

    // Event listener for mouse move (resizing the selection).
    selection.addEventListener("mousemove", (e) => {
        if (isSelecting) {
            endX = e.clientX;
            const minX = Math.min(startX, endX);
            const maxX = Math.max(startX, endX);

            if (getSelectedTool) {
                // Update the position and width of the selection tool.
                getSelectedTool.style.left = minX + "px";
                getSelectedTool.style.width = maxX - minX + "px";
            }
        }
    });

    // Event listener for mouse up (end of selection).
    document.addEventListener("mouseup", () => {
        if (isSelecting) {
            isSelecting = false;
            getSelectedData();
        }
    });

    // Event listener for the close button to remove the selection tool.
    if (getCloseBtn) {
        getCloseBtn.addEventListener('click', () => {
            getSelectedTool.remove();
        });
    }
}

function getSelectedData() {
    const svg = document.querySelector(".piano-roll-svg");

    // Get all the <rect> and <line> elements within the SVG
    const rects = svg.querySelectorAll("rect");
    const lines = svg.querySelectorAll("line");

    // Log data from the <rect> elements
    rects.forEach((rect, index) => {
        const x = rect.getAttribute("x");
        const y = rect.getAttribute("y");
        const width = rect.getAttribute("width");
        const height = rect.getAttribute("height");

        console.log(`Rect ${index + 1}: x=${x}, y=${y}, width=${width}, height=${height}`);
    });

    // Log data from the <line> elements
    lines.forEach((line, index) => {
        const x1 = line.getAttribute("x1");
        const y1 = line.getAttribute("y1");
        const x2 = line.getAttribute("x2");
        const y2 = line.getAttribute("y2");

        console.log(`Line ${index + 1}: x1=${x1}, y1=${y1}, x2=${x2}, y2=${y2}`);
    });
}
