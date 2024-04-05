// From https://github.com/WebBluetoothCG/demos/blob/gh-pages/bluetooth-printer/index.html
var SERVICE = '000018f0-0000-1000-8000-00805f9b34fb';
var WRITE = '00002af1-0000-1000-8000-00805f9b34fb';

function printThermal(data){
    var DATA = data;                                                    // feed paper

    var deviceHandle;
    navigator.bluetooth.requestDevice({ filters: [{ services: [SERVICE]}] }).then(device => {
        console.log(device);
        deviceHandle = device;
        return device.gatt.connect()
    }).then(server => {
        console.log(server);
        return server.getPrimaryService(SERVICE);
    }).then(service => {
        console.log(service);
        return service.getCharacteristic(WRITE);
    }).then(channel => {
        console.log(channel);
        return channel.writeValue(new TextEncoder("utf-8").encode(DATA));
    }).catch(error => {
        console.error(error)
    }).finally(() => {
        deviceHandle.gatt.disconnect();
    });
}
