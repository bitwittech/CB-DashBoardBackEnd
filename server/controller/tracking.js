const db = require('../../database/dbConfig.js')

// ======================= Tracking APis ===============================================

exports.listCardTrack = async (req,res) =>{
    await db.select('*').from('card_event')
    .then((response)=>{
    //   console.log(response)
      res.send(response)
    })
    .catch((err)=>{
        console.log(err)
        res.send("Not Done !!!")
    })

}

exports.listEnrollTrack = async (req,res) =>{
    await db.select('*').from('enroll_event')
    .then((response)=>{
    //   console.log(response)
      res.send(response)
    })
    .catch((err)=>{
        console.log(err)
        res.send("Not Done !!!")
    })

}


exports.listSearchTrack = async (req,res) =>{
    await db.select('*').from('search_event')
    .then((response)=>{
    //   console.log(response)
      res.send(response)
    })
    .catch((err)=>{
        console.log(err)
        res.send("Not Done !!!")
    })

}


exports.listTrackData = async (req,res) =>{
    await db.select('*').from('user_tracking_data')
    .then((response)=>{
    //   console.log(response)
      res.send(response)
    })
    .catch((err)=>{
        console.log(err)
        res.send("Not Done !!!")
    })

}

