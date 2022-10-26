const userModel = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../middleware/signJwt')

const authHelper = {

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
          
            let user = await userModel.findOne({ email: userData.email })
            if (!user) {
                userData.password =userData.password? await bcrypt.hash(userData.password, 10):null

                userModel.create({
                    email: userData.email,
                    password: userData.password,
                    first_name: userData.fname,
                    last_name: userData.lname,
                    gender: userData.gender,
                    DOB: userData.dob,
                    picture: userData.picture

                }
                ).then((response) => {
                    const user = {
                        userId: response._id,
                        email: response.email
                    }

                    console.log(user)
                    resolve(user)
                }).catch(err => reject(err))
            } else {
                resolve({
                    msg: 'User Alredy Exist',
                    userId:user._id
                })
            }


        })

    },
    dologin: (loginData) => {
       
        return new Promise((resolve, reject) => {

            userModel.findOne({ email: loginData.email }).then((userData) => {

                if (userData) {
                    bcrypt.compare(loginData.password, userData.password, (err, res) => {
                        if (err) { reject(err) }
                        if (res) {

                            const user = {

                            }
                            user.token = generateToken({
                                userId: userData._id,
                                email: userData.email
                            }, "2h")

                           console.log(user,"user")
                            resolve(user)

                        } else {
                            resolve({ msg: 'user not found' })
                        }
                    })
                } else {
                    resolve({ msg: 'user not found' })
                }

            }).catch(err => reject(err))
        })

    },
    doUpdateUser: (userData) => {
        return new Promise((resolve, reject) => {

        })
    }


}

module.exports = authHelper