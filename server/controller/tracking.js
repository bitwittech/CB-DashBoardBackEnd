const db = require('../../database/dbConfig.js')


// ======================= Tracking APis ===============================================

exports.listCardTrack = async (req,res) =>{
  console.log(req.query)
  req.query.email = req.query.email.trim()
  if(req.query.email !== '')
  {
    await db.select('*').from('card_event').where('user_email', 'like', `%${req.query.email}%`).then((response)=>{
      console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('card_event').orderBy('_id','desc')
        .then((response)=>{
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })

  }


}

exports.listEnrollTrack = async (req,res) =>{
  req.query.email = req.query.email.trim()

  if(req.query.email !== '')
  {
    await db.select('*').from('enroll_event').where('user_email', 'like', `%${req.query.email}%`).then((response)=>{
      console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('enroll_event').orderBy('_id','desc')
        .then((response)=>{
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })

  }

}


exports.listSearchTrack = async (req,res) =>{
  req.query.email = req.query.email.trim()

  if(req.query.email !== '')
  {
    await db.select('*').from('search_event').where('user_email', 'like', `%${req.query.email}%`).then((response)=>{
      console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('search_event').orderBy('_id','desc')
        .then((response)=>{
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })

  }

}


exports.listTrackData = async (req,res) =>{
  console.log(req.query)
  req.query.email = req.query.email.trim()

  if(req.query.email !== '')
  {
    await db.select('*').from('user_tracking_data').where('user_email', 'like', `%${req.query.email}%`).then((response)=>{
      // console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('user_tracking_data').orderBy('_id','desc')
        .then((response)=>{
          // console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Not Done !!!")
        })

  }
}

exports.searchUser = async (req,res) =>{
  console.log(req.query)

  if(req.query.email !== '' || req.query.data !== '')
  {
    await db.select('*').from(req.query.table).where('user_email', 'like', `%${req.query.email}%`)
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
       console.log(err)
       res.send(err)
    })
  }
  else{
    await db.select('*').from('user_tracking_data').orderBy('_id','desc')
    .then((response)=>{
    //   console.log(response)
      res.send(response)
    })
    .catch((err)=>{
        console.log(err)
        res.send("Not Done !!!")
    })

  }

}