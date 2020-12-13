/**
 * set router socket
 * @param io
 */
const set_router = (io) => {
    io.on(`connection`, (socket) => {

        _log.log('socket_id: ' + socket.id);

        socket.auth = false;
        socket.type_user = null;
        socket.auth = true;

        socket.on('auth', (data) => {
            try{
                _log.log(`socket_id: ` + socket.id, data);
                //auth hợp lệ của soft

                if (data && _.isEqual(data.auth, _config.APP_KEY)) {
                    socket.auth = true;
                    socket.type_user = "SOFT PC";
                    socket.join(`roomSoftSocket`);
                    _log.log(`socket_id: ` + socket.id + ' connected SOFT PC');
                }
                // else if (data && _.isEqual(data.auth, _config.APP_KEY)) {
                //     socket.auth = true;
                //     socket.type_user = "APP ANDROID";
                //     socket.join(`roomAppSocket`);
                //
                //     let socket_ids = io.sockets.adapter.rooms[`roomAppSocket`].sockets;
                //     for (let socket_id in socket_ids) {
                //         let item_socket = io.sockets.sockets[socket_id];
                //         if (item_socket && item_socket.type_user && item_socket.user_id &&
                //             item_socket.type_user === `APP ANDROID`
                //             && item_socket.user_id === data.user_id && client.id !== socket_id) {
                //             io.to(socket_id).emit("logout_session", _output(405));
                //             console.log(socket_id + " bi logout");
                //         }
                //     }
                //
                //     socket.user_id = data.user_id;
                //     _log.log(`socket_id: ` + socket.id + ` connected APP`);
                 else {
                    _log.log(`socket_id: ` + socket.id + ` auth fail`);
                    socket.disconnect();
                }
            }catch (e) {
                _log.err(`socket auth`, e);
            }
        });

        socket.on(`event_demo`, (data) => {
            try {
                _log.log(`data socket event_demo`, data);
                //something
            } catch (e) {
                _log.err(`socket event_demo error`, e);
            }
        });


        setTimeout(function() {
            //sau 1s mà client vẫn chưa dc auth, thì disconnect.
            if (!socket.auth) {
                _log.log(`socket.id: ` + socket.id + ` disconnected. Het thoi gian chap nhan auth: 1(s)`);
                socket.disconnect();
            }
        }, 1000);

        // console.log(socket);
        // socket.on(`event_01`, (data) => {
        //     try {
        //         _log.log(`data socket event_01`, data);
        //         //something
        //     } catch (e) {
        //         _log.err(`socket event_01 error`, e);
        //         throw e;
        //     }
        // });
        //
        // socket.on(`event_02`, (data) => {
        //     try {
        //         _log.log(`data socket event_02`, data);
        //         //something
        //     } catch (e) {
        //         _log.err(`socket event_02 error`, e);
        //         throw e;
        //     }
        // });
    });
};


module.exports = {
    set_router: set_router,
};