const route = require("express").Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser')
const multer = require('multer')

// CONTROLLER
const user = require("./controller/user");
const userPanel = require("./controller/userPanel");
const tracking = require("./controller/tracking");
const dashboard = require("./controller/dashboard");
const banner = require("./controller/banner")

// middleware for the multer setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).fields([{ name: "product_image" }, { name: "featured_image" }, { name: "category_image" }, { name: 'banner_image' }]);


// middleware for encryption
function encode(req, res, next) {
    const saltRounds = 10;

    if (
        req.body.email == undefined ||
        req.body.password == undefined ||
        req.body.name == undefined 
    )
        return res
            .status(204)
            .send({ error_massage: "Please enter all the required feilds." });

    // code to hash the password

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // console.log(">>>>>", hash);
            if (hash !== null) {
                req.body.password = hash;
                console.log(req.body.password);
                next();
            }
        });
    });
}


// middile to parse the body 
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());
// Midilwear For Authenticaion

function AuthJwt(req, res, next) {
    // console.log(req.headers)

    if (req.headers.authorization === undefined) return res.sendStatus(401);

    let token = req.headers.authorization.split("Bearer ")[1];

    JWT.verify(token, process.env.JWT_Secreet, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// =============== User routes =======================

// home route
route.get("/", user.home);

// registration route
route.post("/register", encode, upload, user.register);

// login route
route.post("/login", upload, user.login);


// =============== userPanel routes =======================


// Get the list product

route.get('/getListProduct', AuthJwt, userPanel.getListUser);

// delete product

route.delete('/deleteUser', AuthJwt, userPanel.deleteUser);

// update product

route.patch('/updateUser', AuthJwt, upload, userPanel.updateUser);

// =============== User Tracking routes =======================

route.get('/listCardTrack', AuthJwt, tracking.listCardTrack);

route.get('/listEnrollTrack', AuthJwt, tracking.listEnrollTrack);

route.get('/listSearchTrack', AuthJwt, tracking.listSearchTrack);

route.get('/listTrackData', AuthJwt, tracking.listTrackData);

route.get('/searchUser', AuthJwt, tracking.searchUser);


// ================ User report ================================

route.get('/siteReport', AuthJwt, dashboard.siteReport);
route.get('/miniReport', AuthJwt, dashboard.miniReport);

// ================== Banner Routes =============================

// add banners

route.post('/addBanner', AuthJwt, upload, banner.addBanner);

// list banners

route.get('/listBanner', AuthJwt, banner.listBanner);

// change status banners

route.patch('/chaneStatusBanner', upload, AuthJwt, banner.changeStatus);

module.exports = route;