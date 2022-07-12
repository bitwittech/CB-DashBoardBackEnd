// packages 
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
const db = require('../../database/dbConfig.js')
require('dotenv').config();


// ================================================= Apis for User ======================================================= 
//==============================================================================================================================



// for defaulting paging
exports.home = (req, res) => {
    res.send("This Apis is written for the CB DashBoard!!!");
};


// for registration API

exports.register = async(req, res) => {
    console.log('called')

    db
    .table('admin_data')
    .insert(req.body)
        .then((response) => {
            return res.status(200).send(req.body);
        })
        .catch((err) => {
            console.log({ err });
            return res.status(203).send({ massage: "User Not Added !!!" });
        });
};

// for login Api

// function for genrate JWT

function generateJWT(data) {
    // console.log(process.env.JWT_Secreet)
    const token = JWT.sign(data, process.env.JWT_Secreet);
    return token;
}


exports.login = (req, res) => {

    console.log(req.body)
    if (req.body.email === undefined || req.body.password === undefined) return res.status(203).send('Please provides the valid data')

    db
        .table('admin_data')
        .where('email','=',req.body.email)
        .then((data) => {
            console.log('>>>',data)
            if (data != null) {
                bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                    console.log(data, result)
                    if (result === true) {
                        let token = generateJWT(req.body);
                        console.log(data)
                        console.log("User Found !!!", data);
                        return res.send({ message: "Log In Successfully !!!", token, name: data.user_Name, email: data.email })

                    } else
                        return res.status(203).send({ message: ">>User Not Found !!!" })
                });
            } else {
                return res.status(203).send({ message: "User Not Found !!!" })
            }
        })
        .catch((err) => {
            console.log({ message: "User Not Found !!!", err });
            return res.status(203).send({ message: "User Not Found !!!", err })
        })

}

// ================================================= Apis for User Ends =======================================================