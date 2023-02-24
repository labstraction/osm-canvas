function osmService() {

    function prepareOsmData(osmData, lat, lng, renderWidth, renderHeight) {
        console.log('eccp',osmData);
        const centerW = renderWidth / 2;
        const centerH = renderHeight / 2;
        const scale = 200000;
        const world = osmData.elements.map(w => {
            const worldObj = {...w.tags, type: w.type, color: w.tags?.building ? 'red' : 'black'};
            worldObj.path = w.geometry.map(n => {
                const x = (n.lon - lng) * scale + centerW;
                const y = (n.lat - lat) * scale + centerH;
                return {x, y};
            });
            return worldObj;
        })
        return world;
    }

    function getOsmData(lat, lng, radius) {
        const bbox = [lat - radius, lng - radius, lat + radius, lng + radius].join(',');
        var url = 'http://overpass-api.de/api/interpreter?data=[out:json];(way["building"]('+ bbox +');way["highway"]('+ bbox +'););out geom;';
        return fetch(url).then((r) => r.json())
                         .then(d => prepareOsmData(d, lat, lng, 500, 500));
    }

    return {
        getOsmData,
    }



}
