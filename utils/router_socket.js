/**
 * set router socket
 * @param io
 */
const set_router = (io) => {
    io.on(`connection`, (socket) => {
        socket.on(`event_01`, (data) => {
            try {
                _log.log(`data socket event_01`, data);
                //something
            } catch (e) {
                _log.err(`socket event_01 error`, e);
                throw e;
            }
        });

        socket.on(`event_02`, (data) => {
            try {
                _log.log(`data socket event_02`, data);
                //something
            } catch (e) {
                _log.err(`socket event_02 error`, e);
                throw e;
            }
        });
    });
};


module.exports = {
    set_router: set_router,
};