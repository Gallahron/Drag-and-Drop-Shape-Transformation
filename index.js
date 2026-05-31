(() => {
    let activeDragShape = null;

    const shapeDisplays = {
        'square': 'resources/shape-4-sided-square.svg',
        'circle': 'resources/circle.svg',
        'triangle': 'resources/shape-3-sided-triangle.svg',
        'hexagon': 'resources/shape-6-sided-hexagon.svg'
    }

    const quadrants = [... document.getElementsByClassName("quadrant")];
    const shapes = [... document.getElementsByClassName("shape")];

    init = () => {
        shapes.forEach(shape => {
            shape.addEventListener("dragstart", e => {
                activeDragShape = e.target;
            });

            updateShape(shape, shape.parentNode.dataset.targetShape);
        });
        
        quadrants.forEach(quadrant => {
            quadrant.addEventListener("dragover", e => {
                e.preventDefault();
            });

            quadrant.addEventListener("drop", e => {
                e.preventDefault();

                let target = e.target;
                if (!target.classList.contains("quadrant")) target = target.closest(".quadrant"); 
                moveShape(target);
            })
        });

        document.addEventListener("keydown", e => {
            if (e.key === " ") {
                if (activeDragShape == null && document.activeElement.classList.contains("shape")) {
                    activeDragShape = document.activeElement;
                    activeDragShape.classList.add("highlighted");
                    makeQuadrantsTabbable();
                }
                else if (document.activeElement.classList.contains("quadrant")) {
                    activeDragShape.classList.remove("highlighted");
                    moveShape(document.activeElement);
                    makeShapesTabbable();
                }
            }
            else if (e.key === "Escape") {
                activeDragShape.classList.remove("highlighted");
                activeDragShape = null;
                makeShapesTabbable();
            }
        });

        makeShapesTabbable();
    }

    moveShape = (target) => {
        activeDragShape.parentNode.removeChild(activeDragShape);
        target.appendChild(activeDragShape);

        updateShape(activeDragShape, target.dataset.targetShape);
        makeShapesTabbable();

        activeDragShape = null;
    }

    updateShape = (element, targetShape) => {
        if (shapeDisplays[targetShape] == undefined) return;

        element.src = shapeDisplays[targetShape];
    };


    makeShapesTabbable = () => {
        let i = 1;

        quadrants.forEach(quadrant => {
            quadrant.setAttribute("tabindex", -1);

            [...quadrant.getElementsByClassName("shape")].forEach(shape => {
                shape.setAttribute("tabindex", i++);
            });
        });

        document.activeElement.blur();
    }

    makeQuadrantsTabbable = () => {
        shapes.forEach(shape => shape.setAttribute("tabindex", -1));
        
        let i = 1;
        quadrants.forEach(quadrant => quadrant.setAttribute("tabindex", i++));
    }

    init();
})()