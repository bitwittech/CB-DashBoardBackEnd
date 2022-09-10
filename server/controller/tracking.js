const db = require('../../database/dbConfig.js')


// ======================= Tracking APis ===============================================

exports.listCardTrack = async (req,res) =>{
  const filter = JSON.parse(req.query.filter)
  //console.log('>>>>>',filter)

  if (filter.startDate !== '' && filter.endDate !== '') {
      await db.select('*').from('card_event')
          .where((qp) => {
              if (filter.startDate !== '' && filter.endDate !== '') {
                  qp.where('event_time', '>', filter.startDate)
                  qp.andWhere('event_time', '<', filter.endDate)
              }
              // if (filter.mobile !== '')
              //     qp.andWhere('mobile_no', '=', filter.mobile)


          }).then((response)=>{
      //console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('card_event').orderBy('_id','desc')
        .then((response)=>{
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })

  }


}

exports.listEnrollTrack = async (req,res) =>{
  const filter = JSON.parse(req.query.filter)
  //console.log('>>>>>',filter)

  if (filter.startDate !== '' && filter.endDate !== '') {
      await db.select('*').from('enroll_event')
          .where((qp) => {
              if (filter.startDate !== '' && filter.endDate !== '') {
                  qp.where('event_time', '>', filter.startDate)
                  qp.andWhere('event_time', '<', filter.endDate)
              }
              // if (filter.mobile !== '')
              //     qp.andWhere('mobile_no', '=', filter.mobile)


          }).then((response)=>{
      //console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('enroll_event').orderBy('_id','desc')
        .then((response)=>{
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })

  }

}


exports.listSearchTrack = async (req,res) =>{
  const filter = JSON.parse(req.query.filter)
  //console.log('>>>>>',filter)

  if (filter.startDate !== '' && filter.endDate !== '') {
      await db.select('*').from('search_event')
          .where((qp) => {
              if (filter.startDate !== '' && filter.endDate !== '') {
                  qp.where('event_time', '>', filter.startDate)
                  qp.andWhere('event_time', '<', filter.endDate)
              }
              // if (filter.mobile !== '')
              //     qp.andWhere('mobile_no', '=', filter.mobile)


          }).then((response)=>{
      //console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('search_event').orderBy('_id','desc')
        .then((response)=>{
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })

  }

}


exports.listTrackData = async (req,res) =>{
  const filter = JSON.parse(req.query.filter)
    //console.log('>>>>>',filter)

    if (filter.startDate !== '' && filter.endDate !== '') {
        await db.select('*').from('user_tracking_data')
            .where((qp) => {
                if (filter.startDate !== '' && filter.endDate !== '') {
                    qp.where('time_stamp', '>', filter.startDate)
                    qp.andWhere('time_stamp', '<', filter.endDate)
                }
                // if (filter.mobile !== '')
                //     qp.andWhere('mobile_no', '=', filter.mobile)


            }).then((response)=>{
      // //console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })
  }
  else{
    
        await db.select('*').from('user_tracking_data').orderBy('_id','desc')
        .then((response)=>{
          // //console.log(response)
          res.send(response)
        })
        .catch((err)=>{
            //console.log(err)
            res.send("Not Done !!!")
        })

  }
}

exports.searchUser = async (req,res) =>{
  //console.log(req.query)

  if(req.query.email !== '' || req.query.data !== '')
  {
    await db.select('*').from(req.query.table).where('user_email', 'like', `%${req.query.email}%`)
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
       //console.log(err)
       res.send(err)
    })
  }
  else{
    await db.select('*').from('user_tracking_data').orderBy('_id','desc')
    .then((response)=>{
    //   //console.log(response)
      res.send(response)
    })
    .catch((err)=>{
        //console.log(err)
        res.send("Not Done !!!")
    })

  }

}