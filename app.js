
function centerNodes(json, canvas) {

    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLon = Infinity;
    let maxLon = -Infinity;
    json.elements.forEach((element) => {
      if (element.type === "node") {
        minLat = Math.min(minLat, element.lat);
        maxLat = Math.max(maxLat, element.lat);
        minLon = Math.min(minLon, element.lon);
        maxLon = Math.max(maxLon, element.lon);
      }
    });
  

    const latMid = (minLat + maxLat) / 2;
    const lonMid = (minLon + maxLon) / 2;

    const normMinX = (minLon - lonMid) / (maxLon - minLon);
    const normMaxX = (maxLon - lonMid) / (maxLon - minLon);
    const normMinY = (minLat - latMid) / (maxLat - minLat);
    const normMaxY = (maxLat - latMid) / (maxLat - minLat);
  

    const newWidth = canvas.width;
    const newHeight = canvas.height;
    const newX1 = normMinX * newWidth;
    const newX2 = normMaxX * newWidth;
    const newY1 = normMinY * newHeight;
    const newY2 = normMaxY * newHeight;
  

    const xOffset = (newWidth - (newX1 + newX2)) / 2 - newX1;
    const yOffset = (newHeight - (newY1 + newY2)) / 2 - newY1;
    json.elements.forEach((element) => {
      if (element.type === "node") {
        element.xCord = (element.lon - lonMid) / (maxLon - minLon) * newWidth + xOffset;
        element.yCord = (element.lat - latMid) / (maxLat - minLat) * newHeight + yOffset;
      }
    });
  }

  function centerNodes2(nodes, canvas) {
    // trovare le coordinate x e y minime e massime dei nodi
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
  
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.x < minX) {
        minX = node.lat;
      }
      if (node.y < minY) {
        minY = node.lng;
      }
      if (node.x > maxX) {
        maxX = node.lat;
      }
      if (node.y > maxY) {
        maxY = node.lng;
      }
    }
  
    // trovare le dimensioni della canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    // trovare il centro della canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
  
    // trovare la larghezza e l'altezza del rettangolo contenente i nodi
    const width = maxX - minX;
    const height = maxY - minY;
  
    // trovare il fattore di scala per adattare le dimensioni del rettangolo alla canvas
    const scaleX = canvasWidth / width;
    const scaleY = canvasHeight / height;
    const scale = Math.min(scaleX, scaleY);
  
    // riproiettare i nodi in modo che siano centrati sulla canvas
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const x = (node.x - minX) * scale + (centerX - (width * scale) / 2);
      const y = (node.y - minY) * scale + (centerY - (height * scale) / 2);
      node.xCord = x;
      node.yCord = y;
    }
  
    return nodes;
  }

function drawOsmJson(data, canvas) {
  const ctx = canvas.getContext("2d");

  console.log(data);


//   for (const node of data.elements.filter((e) => e.type === "node")) {
//     const x = node.xCord;
//     const y = node.yCord;

//     ctx.beginPath();
//     ctx.arc(x, y, 2, 0, 2 * Math.PI);
//     ctx.fillStyle = "#000000";
//     ctx.fill();
//   }

  for (const way of data.elements.filter((e) => e.type === "way")) {
    const nodes = way.nodes.map((n) => {
      const node = data.elements.find((e) => e.id === n);
      console.log(node);
      return { x: node.xCord, y: node.yCord, color: way.tags.highway ? "red" : "black" };
    });

    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    for (let i = 1; i < nodes.length; i++) {
      ctx.lineTo(nodes[i].x, nodes[i].y);
    }
    ctx.strokeStyle = nodes[0].color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

const canvas = document.getElementById("osm-canvas");
fetch("./osm.json").then(resp => resp.json()).then(json => {
    centerNodes2(json, canvas);
    drawOsmJson(json, canvas);
});
