let local_config = require(`../config/local_config`);
let dev_config = require(`../config/dev_config`);

let data_config = {};

switch (process.env.NODE_ENV) {
    case `local`:
        data_config = local_config;
        break;
    case `dev`:
        data_config = dev_config;
        break;
    case `prod`:
        data_config ={};
        break;
    default:
        console.error(`env invalid`);
        break;
}

module.exports = data_config;