const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const messageSchema = mongoose.Schema(
    {
        users: [{
            type: ObjectId,
            ref: 'User'
        }, {
            type: ObjectId,
            ref: 'User'
        }],
        messages: [{
            sender: String,
            time: String,
            message: String
        }]

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);
