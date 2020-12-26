require(`dotenv`).config(); //Cho phép đọc file .env

global._config = require(`./config/config`);
global._log = require(`./utils/log`);
global._ = require(`lodash`);
global._mongoose = require(`mongoose`);
global._mongoose_pageinate = require('mongoose-paginate');
global._mongooseHidden = require('mongoose-hidden')();

global._redis = require(`./connection/redis`);
global._elastic = require(`./connection/elastic`);
global._s3 = require(`./connection/aws`);
global._yup = require(`yup`);
global._res = require(`./constants/contains_response`);
global._logic = require(`./constants/contains_logic`);
global._contains = require(`./constants/contains_model`);
global._aggre = require(`./constants/contains_aggregate`);
global._socket = require(`./constants/contains_socket`);
global._helper = require(`./utils/helper`);
global._bot = require(`./utils/bot`);

const express = require(`express`);
const server = express();
const body_parser = require(`body-parser`);
const multer = require(`multer`);
const router_server = require(`./utils/router_server`);
const router_socket = require(`./utils/router_socket`);
const authentication = require(`./utils/authentication`);
const init = require(`./utils/init`);
const mongodb = require(`./connection/mongodb`);
const path = require(`path`);
const schedule = require(`./utils/schedule`);

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

        schedule.run_schedule();

        server.use('/favicon.ico', express.static(path.join(__dirname, 'assets/icons/favicon.ico')));
        server.use('/images', express.static(path.join(__dirname, 'assets/images')));
        // for parsing application/json
        server.use(body_parser.json({ extended: true, limit: _config.SIZE_FILE_LIMIT }));

        // for parsing application/xwww-
        server.use(body_parser.urlencoded({ extended: true, limit: _config.SIZE_FILE_LIMIT }));

        // for parsing multipart/form-data
        server.use(multer().array());

        server.use(authentication);

        server.set('views', 'views');
        server.set('view engine', 'ejs');

        let http = require('http').createServer(server);
        let io = socket_io(http);

        http.listen(PORT, () => {
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



