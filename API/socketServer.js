const userHelper = require("./helper/userHelper");



const socketServer = (socket) => {
    console.log(`User Connected: ${socket.id}`);



    socket.on('online', (token) => {
        userHelper.registerOnline(socket.id, token).then(data => {
            console.log(`${data.first_name} is online`)
        }).catch(err => console.log('User is logged out'))
    })

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data)
        userHelper.addChat(data).then(data => {
            console.log('message added to data base')
        })
        socket.to(data.room).emit("receive_message", data);
    });
    socket.on('offline', () => {
        userHelper.registerOffline(socket.id).then(data => {
            console.log(`${data.first_name} is offline`)
        }).catch(err => console.log(err))
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
        userHelper.registerOffline(socket.id).then(data => {
            console.log(`${data.first_name} is offline`)
        }).catch(err => console.log(err))

    });
}


module.exports = socketServer