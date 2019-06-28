(() => {
    function createGUID(){
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    const ws = new WebSocket(
        `ws://${location.host}${location.pathname}`,
    );

    ws.onopen = function (evt) {
        console.log("Connection open ...");
        ws.send("Hello WebSockets!");
        for(var i =0; i<100; i++) {
            var guid = createGUID();
            ws.send(guid);
        }        
    };

    ws.onmessage = function (evt) {
        console.log("Received Message: " + evt.data);
        ws.close();
    };

    ws.onclose = function (evt) {
        console.log("Connection closed.");
    };
  
})();
