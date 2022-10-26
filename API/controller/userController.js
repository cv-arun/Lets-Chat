const userHelper=require('../helper/userHelper.js')

module.exports={
    getChat:(req,res,next)=>{
        
        userHelper.getFriendDetails(req.body).then((friend)=>{
            userHelper.GetChatDetails(friend._id,req.userId).then(data=>{
                res.json({data,friend})
            })
        })
    }
}