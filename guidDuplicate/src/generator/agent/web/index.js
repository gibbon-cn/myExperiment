// (function(){
    function createGUID(){
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    const ws = new WebSocket(
        "ws://" + location.host + location.pathname
    );

    ws.onopen = function (evt) {
        console.log("Connection open ...");
        ws.send("agent::" + window.navigator.userAgent);
        for(var i =0; i<10000; i++) {
            var guid = createGUID();
            ws.send(guid);
        }
        window.location.reload();       
    };

    ws.onmessage = function (evt) {
        console.log("Received Message: " + evt.data);
        ws.close();
    };

    ws.onclose = function (evt) {
        console.log("Connection closed.");
    };
  
// })();
