const draggers = document.querySelectorAll(".dragger")

draggers.forEach(element => {
    element.addEventListener('mousedown',(e) => {
        dragStart(e,element)
    })
})

let mouseMove;
let mouseUp;

function dragStart(e,element){
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = parseInt(document.defaultView.getComputedStyle(element.parentNode).width,10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(element.parentNode).height,10);
    
    const parent = element.parentNode;
    const parentRect = parent.getBoundingClientRect();
    const parentCenterX = parentRect.left + parentRect.width / 2;
    const parentCenterY = parentRect.top + parentRect.height / 2;

    mouseMove = (e) => {dragResize(e, element, parentCenterX, parentCenterY, startX, startY, startWidth, startHeight)};
    mouseUp = (e) => {dragEnd(e)};

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    document.body.style.userSelect = 'none';
}

function dragResize(e, element, parentCenterX, parentCenterY, startX,startY,startWidth,startHeight){
    let newWidth;
    let newHeight;

    if(element.classList.contains("vertical")){
        if(startX > parentCenterX){
            newWidth = startWidth + e.clientX - startX;
        }else{
            newWidth = startWidth + startX - e.clientX;
        }        
    }
    if(element.classList.contains("horizontal")){
        if(startY < parentCenterY){
            newHeight = startHeight + startY - e.clientY;
        }else{
            newHeight = startHeight + e.clientY - startY;
        }   
    }

    element.parentNode.style.width = `${newWidth}px`
    element.parentNode.style.height = `${newHeight}px`
}

function dragEnd(e){
    document.body.style.userSelect = '';''
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
}