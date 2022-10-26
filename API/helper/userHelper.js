
const userModel = require('../model/userModel');
const messageModel = require('../model/messageModel')
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
            ).then(data=>{
                resolve(data)
            }).catch(err=>reject(err))
        })
    }

}