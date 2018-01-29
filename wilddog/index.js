var config = {
    syncURL: "https://siyu-test.wilddogio.com",
    // 连接方式可选项，如不设置该参数，则默认为 false，连接 WilddogSync 服务器时采用 polling 和 websocket 两种模式
    websocketOnly: false,
    // 若同时使用 Auth SDK ，应设置 authDomain
    authDomain: "siyu-test.wilddog.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
console.log(wilddog.app().name);