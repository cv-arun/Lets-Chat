const jwt = require('jsonwebtoken')


const verify = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
 
      jwt.verify(token, 'shhhhh', function(err, decoded) {
        if (err) {
           
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.userId
        next();
    });



}

module.exports = verify









