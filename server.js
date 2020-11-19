require(`dotenv`).config(); //Cho phép đọc file .env

global._config = require(`./config/config.js`);
global._log = require(`./utils/log.js`);
global._ = require(`lodash`);
global._mongoose = require(`mongoose`);
global._redis = require(`./connection/redis.js`);
global._elastic = require(`./connection/elastic.js`);
global._yup = require(`yup`);
global._res = require(`./constants/response.js`);
global._logic = require(`./constants/logic.js`);
global._contains = require(`./constants/constants.js`);

const express = require(`express`);
const server = express();
const body_parser = require(`body-parser`);
const multer = require(`multer`);
const router_server = require(`./utils/router_server.js`);
const router_socket = require(`./utils/router_socket.js`);
const authentication = require(`./utils/authentication.js`);
const init = require(`./utils/init.js`);
const mongodb = require(`./connection/mongodb.js`);
const path = require(`path`);
const locale = require(`yup/lib/setLocale`);
const socket_io = require(`socket.io`);
const PORT = process.env.PORT || _config.SERVER_PORT;
_redis.on(`error`, (error) => {
    _log.err('redis connect fail', error.toString());
});

mongodb.once('open', async (e) => {
    _log.log(`MongoDB connected: ` + _config.MONGODB.HOST + `:` + _config.MONGODB.PORT);
    await new init().create_data_default();
    start_server();
});

mongodb.on('error', (error) => {
    _log.err('Connect to MongoDD error!', error.toString());
});


const start_server = () => {
    try {
        locale(_res.VALIDATE);

        server.use('/favicon.ico', express.static(path.join(__dirname, 'assets/icons/favicon.ico')));
        server.use('/images', express.static(path.join(__dirname, 'assets/images')));

        // for parsing application/json
        server.use(body_parser.json());

        // for parsing application/xwww-
        server.use(body_parser.urlencoded({ extended: true, limit: _config.SIZE_FILE_LIMIT }));

        // for parsing multipart/form-data
        server.use(multer().array());

        server.use(authentication);

        server.set('views', 'views');
        server.set('view engine', 'ejs');

        server.listen(PORT, () => {
            let http = require('http').Server(server);
            let io = socket_io(http, {transports: ['websocket', 'polling']});

            router_server.set_router(server, io);
            router_socket.set_router(io);

            server.use((req, res) => {
                return res.send({
                    status: _res.STATUS.ERROR,
                    message: _res.MESSAGE.NOT_FOUND,
                    error_code: _res.ERROR_CODE.NOT_FOUND
                })
            });
            _log.log(`Server is running port: ` + PORT);
        });
    } catch (e) {
        _log.err('startServer fail!', e.toString());
    }
};



