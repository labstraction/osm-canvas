

// const world = await osmService().getOsmData(44.40491870319353, 8.931386063232106, 0.2); // genova
const world = await osmService().getOsmData(48.858, 2.294, 0.007, 2000, 2000, 50); // paris
console.log('world', world.filter(w => !w.highway && !w.building && !w.leisure));
drawWorldinCanvas(world, 'osm-canvas');

function drawWorldinCanvas(world, canvas) {

    const _canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    const ctx = _canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    

    world.forEach(w => {
        if (w.type === 'way') {

            ctx.beginPath();
            
            w.path.forEach((p, i) => {
                if (i === 0) {
                    ctx.moveTo(p.x, p.y);
                } else {
                    ctx.lineTo(p.x, p.y);
                }
            });
            ctx.strokeStyle = w.color || 'black';
            ctx.fillStyle = w.color || 'black';
            if (w.color !== '#f00' && w.color !== '#f0f') {
              ctx.fill();
            }
            ctx.lineWidth = _canvas.width / 1000;
            ctx.stroke();
        }
    });

}