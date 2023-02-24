function osmService() {

    function prepareOsmDataForCanvas(osmData, canvas) {
      if(typeof canvas === 'string'){
        canvas = document.getElementById(canvas)
      }
      const {width, height} = canvas;
    }

    function getOsmData(lat, lon, radius) {
        const bbox = [lat - radius, lon - radius, lat + radius, lon + radius].join(',');
        var url = 'http://overpass-api.de/api/interpreter?data=[out:json];way('+ bbox +');out geom;';
        return fetch(url).then((r) => r.json())
    }

    return {
        getOsmData,
    }



}