const jwt=require('jsonwebtoken');

let signJwt=function(payload,expiry){
return jwt.sign(
    payload,'shhhhh',
    {
        expiresIn:expiry,
    }
)
}

module.exports=signJwt