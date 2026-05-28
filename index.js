(() => {
    let activeDragShape = null;

    const shapeDisplays = {
        'square': 'resources/shape-4-sided-square.svg',
        'circle': 'resources/circle.svg',
        'triangle': 'resources/shape-3-sided-triangle.svg',
        'hexagon': 'resources/shape-6-sided-hexagon.svg'
    }

    init = () => {
        [... document.getElementsByClassName("shape")].forEach(shape => {
            shape.addEventListener("dragstart", e => {
                activeDragShape = e.target;
            });

            updateShape(shape, shape.parentNode.dataset.targetShape);
        });
        
        [... document.getElementsByClassName("quadrant")].forEach(quadrant => {
            quadrant.addEventListener("dragover", e => {
                e.preventDefault();
            });

            quadrant.addEventListener("drop", e => {
                e.preventDefault();

                activeDragShape.parentNode.removeChild(activeDragShape);
                e.target.appendChild(activeDragShape);

                updateShape(activeDragShape, e.target.dataset.targetShape);
            })
        });
    }

    updateShape = (element, targetShape) => {
        if (shapeDisplays[targetShape] == undefined) return;

        element.src = shapeDisplays[targetShape];
    };

    init();
})()