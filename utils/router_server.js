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
                let controller_name = array_file_name[0];
                const obj_controller = require('../controllers/' + filename);
                const obj = new obj_controller();
                let methods = get_methods(obj);
                const endpoint_controller = '/' + controller_name + "/";
                // console.log("obj:", obj, "methods: ", methods, "controller_name: ", controller_name);
                methods.map(method => {
                    let end_point = null;
                    let method_rq = 'get';
                    // if(end_point_normal(controller_name)){
                    //
                    // }
                    if(end_point_normal(controller_name)){
                        method_rq = method.slice(1, method.lastIndexOf("_"));
                        end_point = endpoint_controller  + method.replace(`_${method_rq}_`,``);
                    } else if (method.indexOf(`_get`) !== -1) {
                        end_point = endpoint_controller  + method.replace(`_get_`,`get_`);
                        method_rq = _logic.GET_METHOD;
                    } else {
                        end_point = endpoint_controller + method.replace(`_`, ``);
                        method_rq =_logic.POST_METHOD;
                    }
                    server.route(end_point)[method_rq]((req, res) => {
                        obj[method](req, res, io);
                    });
                })
            }
        });
    } catch (e) {
        _log.err(`set router server error`, e);
        throw e;
    }
};

const end_point_normal = (controller_name) => {
    const controller = [
        'fb_messenger'
    ];
    return controller.indexOf(controller_name) !== -1;
}


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