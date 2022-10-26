const userHelper = require("./helper/userHelper");

userHelper

const socketServer = (socket) => {
    console.log(`User Connected: ${socket.id}`);
    console.log(socket.handshake.query.loggeduser)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data)
        userHelper.addChat(data).then(data=>{
            console.log('message added to data base')
        })
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
}


module.exports= socketServer