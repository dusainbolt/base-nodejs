/**
 * set router socket
 * @param io
 */
const set_router = (io) => {
    io.on(`connection`, (socket) => {

        socket.auth = false;
        socket.type_user = null;

        socket.on(_socket.EVENT_AUTH, (data) => {
            try {
                //auth hợp lệ của soft
                const { auth, userDetail } =data;
                if (data && _.isEqual(auth, _config.APP_KEY)) {
                    socket.auth = true;
                    socket.type_user = userDetail.role;
                    const roomName = socket.type_user === _contains.USER.ROLE.ADMIN_APP ? _socket.ROOM_ADMIN : `${_socket.ROOM_CLASS}${userDetail.class}`
                    socket.join(roomName);
                    _log.log(`${data.userDetail.fullName} - socket_id: ${socket.id} -room: ${roomName} -connected`);
                }
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
    });
};


module.exports = {
    set_router: set_router,
};