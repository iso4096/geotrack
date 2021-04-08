window.addEventListener("DOMContentLoaded", function(){
    let button = document.getElementById("button");
    let times_saved = document.getElementById("times-saved");
    var times = 0
    var positions = []
    button.addEventListener("click", function(){
        if (button.innerHTML == "Start tracking") {
            button.innerHTML = "Download";
            setInterval(function(){
                navigator.geolocation.watchPosition(function(position){positions.push({lat: position.coords.latitude, long: position.coords.longitude, timestamp: Math.floor(position.timestamp/1000)});times++;}, function(){}, {enableHighAccuracy: true, timeout: 2000})
                times_saved.innerHTML = times;
            }, 2000)
        } else {
            const config = new Blob([JSON.stringify({data: positions})], {type: 'text/json;charset=utf-8'});
            const url = URL.createObjectURL(config);

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.target = "_blank";
            anchor.download = "geoloc_data.json";
            anchor.click();
            URL.revokeObjectURL(url);
        }
    })
})