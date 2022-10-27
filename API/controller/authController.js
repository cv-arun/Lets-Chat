const authhelper=require('../helper/authhelper');
const jwt_decode=require('jwt-decode');
const generateToken=require('../middleware/signJwt');
const userHelper=require('../helper/userHelper')

module.exports = {
    signup: (req, res, next) => {
      
        authhelper.doSignup(req.body).then((response) => {
            res.json( response )
        }).catch(err=>res.json(err))
    },
    login:(req,res,next)=>{
        authhelper.dologin(req.body).then((user) => {

            if (user.token) {
                res.json(user)
            } else {
                res.json({ msg: 'invalid credential' })
            }
    
        }).catch(err => res.json(err))
    },
    loginWithGoogle:(req,res,next)=>{
    
        const decoded = jwt_decode(req.body.credentialResponse.credential);
        let user={
            fname:decoded.given_name,
            lname:decoded.family_name,
            email:decoded.email,
            picture:decoded.picture
        }
        authhelper.doSignup(user).then((response)=>{
           
           let token= generateToken(response,'2h')
           res.json({token})
            
        }).catch(err=>res.json(err))
    },
    updateUser:(req,res,next)=>{
        authhelper.doUpdateUser(req.body).then(response=>{
            res.json({msg:'user data updated'})
        }).catch(err=>res.json(err))
    },
    isLogedIn:(req,res,next)=>{
        userHelper.getUser(req.userId).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err))
    }
    ,
    getUsers:(req,res,next)=>{
        let myid=req.userId
     
        userHelper.getUsers(myid).then((data)=>{
            res.json({myid,users:data})
        }).catch(err=>res.json(err))

    }
}