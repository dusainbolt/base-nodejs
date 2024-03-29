const mongoose = require(`mongoose`);

let uri_connect = `mongodb${_config.MONGODB.SRV ? "+srv" : ""}://`
    + _config.MONGODB.USERNAME + ':'
    + _config.MONGODB.PASSWORD + "@"
    + _config.MONGODB.HOST + `${!_config.MONGODB.SRV ? `:${_config.MONGODB.PORT}` : ''}`
    + '/' + _config.MONGODB.NAME + _config.MONGODB.SRV;
console.log(uri_connect);
mongoose.Promise = global.Promise;
// mongodb+srv://dusainbolt:<password>@cluster0.hxmc8.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://dusainbolt:du@dev1234@cluster0.hxmc8.mongodb.net/sainbolt-app
mongoose.connect(uri_connect, {
    useCreateIndex: true,
    useNewUrlParser: true,
    connectTimeoutMS: 4000,
    useFindAndModify: false,
    useUnifiedTopology: true,

    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 1000,
    // replicaSet: {
    //     strategy: 'ping',
    //     rs_name: _config.MONGO_REPSET,
    //     // reconnectTries: Number.MAX_VALUE,
    //     socketOptions: {
    //         keepAlive: 120
    //     }
    // },
});

// mongoose.set('useFindAndModify', false);

module.exports = mongoose.connection;
