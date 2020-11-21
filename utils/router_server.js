const path = require(`path`);
const fs = require(`fs`);

/**
 * set router cho tất cả controller
 * @param server
 * @param io
 */
const set_router = (server, io) => {
    try {
        fs.readdirSync(path.join(__dirname, '../controllers')).map(filename => {
            let array_file_name = filename.split(`.`);
            if (array_file_name[1] === 'js') {
                let controller_name = array_file_name[0].replace("/", "");
                let obj_controller = require('../controllers/' + filename);
                let obj = new obj_controller();
                let methods = get_methods(obj);
                // console.log("obj:", obj, "methods: ", methods, "controller_name: ", controller_name);
                methods.map(method => {
                    let end_point = ``;
                    if (method === `_test`) {
                        end_point = '/' + controller_name;
                        server.route(end_point).get((req, res) => {
                            obj[method](req, res, io);
                        });
                    } else {
                        end_point = '/' + controller_name + `/` + method.replace(`_`, ``);
                        server.route(end_point).post((req, res) => {
                            obj[method](req, res, io);
                        })
                    }
                })
            }
        });
    } catch (e) {
        _log.err(`set router server error`, e);
        throw e;
    }
};


/**
 * Lấy ra các method trong 1 class controller
 * @param obj
 * @returns {unknown[]}
 */
const get_methods = (obj) => {
    try {
        let properties = new Set();
        let current_obj = obj;
        do {
            Object.getOwnPropertyNames(current_obj).map(item => properties.add(item))
        } while ((current_obj = Object.getPrototypeOf(current_obj)));
        return [...properties.keys()].filter(item => {
            return (typeof obj[item] === 'function' && item[0] === `_` && item[1] !== `_`)
        })
    } catch (e) {
        throw e;
    }
};


module.exports = {
    set_router: set_router,
};