
const db = require('../../database/dbConfig.js')

const localBaseUrl = 'http://localhost:8000'



// ================================================= Apis for banner ======================================================= 
//==============================================================================================================================

exports.addBanner = async(req,res) => {

console.log(req.files['banner_image'])
if(req.files !== undefined)
    req.body.banner_URL = `${localBaseUrl}/${req.files['banner_image'][0].path}`;
else 
    return res.status(203);


await db.table('banner').insert(req.body)
.then((data)=>{
    console.log(data)
    return res.send('Banner Added Successfully !!!')
})
.catch((err)=>{
    return res.send('Something went wrong')
})

}


// list all the banners

exports.listBanner = async(req,res)=>{

    await db.table('banner')
    .then((data)=>{
        // console.log(data)
        if (data !== null)
            return res.send(data)
        else
            return res.send('Please Add some banner')
    })
    .catch((err)=>{
        console.log(err)
        return res.send("Something went wrong !!!")
    })


}

// for Changing the Status of the banner

exports.changeStatus = async(req,res) =>{
    console.log(req.body)
    const _id = req.body._id
    await db.table('banner').where('_id','=',_id).update(req.body)
    .then((data)=>{
        console.log(data)
        res.send('all okay')
    })
    .catch((err)=>{
        console.log(err)
        res.send('Something went wrong !!!')
    })
}

// ================================================= Apis for banner ends ======================================================= 
//==============================================================================================================================
