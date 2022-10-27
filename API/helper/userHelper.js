
const userModel = require('../model/userModel');
const messageModel = require('../model/messageModel');
const jwt = require('jsonwebtoken')

module.exports = {

    getUsers: (myid) => {
        return new Promise((resolve, reject) => {
            userModel.find({ _id: { $ne: myid } }).then((data) => {
                resolve(data)
            }).catch(err => reject(err))
        })
    },
    getFriendDetails: ({ toid }) => {
        return new Promise((resolve, reject) => {
            userModel.findById(toid).then((data) => {
                resolve(data)
            }).catch(err => reject(err))
        })
    },
    GetChatDetails: (friendId, myId) => {
        return new Promise(async (resolve, reject) => {
            let chat = await messageModel.findOne({ users: { $all: [friendId, myId] } });
            !chat && messageModel.create({ users: [friendId, myId] }).then(data => {
                resolve(data)
            })
            chat && resolve(chat)
        })

    },
    addChat: (message) => {
        return new Promise((resolve, reject) => {
            messageModel.findByIdAndUpdate(message.room, {
                $push: {
                    messages: {
                        $each: [message],
                        $position: 0
                    }
                }
            }
            ).then(data => {
                resolve(data)
            }).catch(err => reject(err))
        })
    },
    getUser: (myid) => {
        return new Promise((resolve, reject) => {
            userModel.findById(myid).then(data => {

                let user = {
                    name: data.first_name,
                    id: data._id
                }
                resolve(user)

            }).catch(err => reject(err))
        })
    },
    registerOnline: (SocketId, token) => {
       
        return new Promise(async(resolve, reject) => {
            let decode;
            try{ decode=await jwt.verify(token, 'shhhhh')}
            catch(err){
                reject(err)
            }
            decode && userModel.findByIdAndUpdate(decode.userId,{isOnline:true,SocketId}).then(data=>{
                resolve(data)
            }).catch(err=>reject(err))

        })
    },
    registerOffline:(SocketId)=>{
        return new Promise((resolve,reject)=>{
            userModel.findOneAndUpdate({SocketId},{isOnline:false}).then(data=>{
                resolve(data)
            }).catch(err=>reject(err))
        })
    }

}