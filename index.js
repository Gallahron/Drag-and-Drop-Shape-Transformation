(() => {
    let activeDragShape = null;

    init = () => {
        [... document.getElementsByClassName("shape")].forEach(shape => {
            shape.addEventListener("dragstart", e => {
                activeDragShape = e.target;
            })
        });
        
        [... document.getElementsByClassName("quadrant")].forEach(quadrant => {
            quadrant.addEventListener("dragover", e => {
                e.preventDefault();
            });

            quadrant.addEventListener("drop", e => {
                e.preventDefault();

                activeDragShape.parentNode.removeChild(activeDragShape);
                e.target.appendChild(activeDragShape);
            })
        });
    }

    init();
})()