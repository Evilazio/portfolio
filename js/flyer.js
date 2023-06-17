const elementos = document.querySelectorAll('.flyer');

(async ()=>{
    const queue = [...elementos];
    while(true){
        const firstInQueue = queue.shift();
        await runAnimation(firstInQueue);
        changeFavicon(firstInQueue.src)
        queue.push(firstInQueue);
    }
})();

function getMatrixStartPosition() {
    return { x: Math.random() * window.innerWidth, y: window.innerHeight }
}

function getMatrixEndPosition() {
    return { x: Math.random() * window.innerWidth, y: 0 }
}

async function runAnimation(e) {

    const startMatrixPosition = getMatrixStartPosition();
    e.style.display = 'block';
    e.style.top = `0px`;
    e.style.left = `0px`;
    e.style.transform = `translate3d(${startMatrixPosition.x}px, ${startMatrixPosition.y}px, 0)`;

    await sleep(100);

    e.style.transition = "all 7s cubic-bezier(.66,.66,.89,.33)";

    
    const endMatrixPosition = getMatrixEndPosition();
    e.style.transform = `translate3d(${endMatrixPosition.x}px, ${endMatrixPosition.y - 200}px, 0)`;
    
    await sleep(7100);
    e.style.transition = "all 0s ";
}


function changeFavicon(href) {
    var favicon = document.querySelector('link[rel="shortcut icon"]');
    favicon.href = href;
}