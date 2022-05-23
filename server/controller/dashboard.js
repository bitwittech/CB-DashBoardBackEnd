const db = require('../../database/dbConfig.js')

// ======================= Tracking APis ===============================================

exports.siteReport = async (req,res) =>{

    const presentDate = new Date().toLocaleDateString().split('/')

    let todayLog = 0;
    let monthLog = 0;
    let yearLog = 0;

    // [ '2022', '05', '19' ] time 
    // [ '23', '05', '2022' ] present
   
    await db.table('user_tracking_data')
    .then((response)=>{

       response.map((data)=>{

        let time = JSON.stringify(data.time_stamp).split('T')[0].slice(1).split('-')
        
        if(time[2] === presentDate[0]) todayLog+=1;
        if(time[1] === presentDate[1]) monthLog+=1;
        if(time[0] === presentDate[2]) yearLog+=1;
    })
       
      res.send({todayLog,monthLog,yearLog})
    })
    .catch((err)=>{
        console.log(err)
        res.send("Not Done !!!")
    })

}
