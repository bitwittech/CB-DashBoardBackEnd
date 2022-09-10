
// 0-2 year 
// 1-0 month 
// 2-1 year 

const { parse } = require("path");
const db = require("../../database/dbConfig.js");

// ======================= Tracking APis ===============================================

exports.siteReport = async (req, res) => {
  const presentDate = new Date().toLocaleDateString().split("/");

  let todayLog = 0;
  let monthLog = 0;
  let yearLog = 0;
  let anonymous = 0;
  let todayAnonymous = 0;
  let monthAnonymous = 0;

  // [ '2022', '05', '19' ] time
  // [ '23', '05', '2022' ] present
  let arr = [0,1,2]

  await db
    .table("user_tracking_data").orderBy('_id', 'desc')
    .then(async (response) => {

      // //console.log(response)

      response.map((data) => {
        let time = JSON.stringify(data.time_stamp)
          .split("T")[0]
          .slice(1)
          .split("-");

        arr.map((val,index)=>{
          time[index] = parseInt(time[index])
          presentDate[index] = parseInt(presentDate[index])

        })

           if (data.user_email !== 'User Not Logged In') {
          // day
          if (time[2] === presentDate[0] && time[1] === presentDate[1] && time[0] === presentDate[2])
            todayLog += 1;
          //month 
          if (time[1] === presentDate[1] && time[0] === presentDate[2])
            monthLog += 1;
          // year
          if (time[0] === presentDate[2])
            yearLog += 1;
        }
        else {
          // day
          if (time[2] === presentDate[0] && time[1] === presentDate[1] && time[0] === presentDate[2])
{
            todayAnonymous += 1;
            anonymous += 1
          }
          //month 
          if (time[1] === presentDate[1] && time[0] === presentDate[2])
          {
            monthAnonymous += 1;
            anonymous += 1
          }
          else {
            anonymous += 1
          }
        }
      });


      // count user
      await db
        .table("newregistration")
        .count("_id as CNT")
        .then(async (data) => {
          const totalUser = data[0].CNT;
          // count free courses
          await db
            .table("data")
            .whereNull("price")
            .count("index as CNT")

            .then(async (free) => {
              const freeCourse = free[0].CNT;

              await db
                .table("data")
                .whereNotNull("price")
                .count("index as CNT")
                .then(async (paid) => {
                  const totalCourse = parseInt(paid[0].CNT) + parseInt(freeCourse);

                  const paidCourse = paid[0].CNT;

                  res.send({
                    todayLog,
                    monthLog,
                    yearLog,
                    totalUser,
                    totalCourse,
                    freeCourse,
                    paidCourse,
                    anonymous,
                    todayTraffic: todayLog + todayAnonymous,
                    monthTraffic: monthLog + monthAnonymous,
                    yearTraffic: yearLog + anonymous,
                  });
                });
            });
        });
    })
    .catch((err) => {
      //console.log(err);
      res.send("Not Done !!!");
    });
};


exports.miniReport = async (req,res) =>{
 
  let anonymous = 0;
  let logged = 0;

  //console.log(req.query.filter)
 
  const filter = JSON.parse(req.query.filter)

  if (filter.startDate === undefined && filter.endDate === undefined )
      return   res.send('please provide filter date')

    await db.select('user_email').from('user_tracking_data')
        .where((qp) => {
            if (filter.startDate !== '' && filter.endDate !== '') {
                qp.where('time_stamp', '>', filter.startDate)
                qp.andWhere('time_stamp', '<', filter.endDate)
            }
        }).then((response)=>{
          response.map((data)=>{
            if(data.user_email !== 'User Not Logged In')
              logged += 1;
            else anonymous += 1; 
          })
        })
        .catch((err)=>{
          //console.log(err)
        })
        
    let cardCount = await db.select('user_email').from('card_event')
        .where((qp) => {
            if (filter.startDate !== '' && filter.endDate !== '') {
                qp.where('event_time', '>', filter.startDate)
                qp.andWhere('event_time', '<', filter.endDate)
            }
        }).then((response)=>{
          return response.length
        })
        .catch((err)=>{
          //console.log(err)
        })

    let totalCardCount = await db.select('user_email').from('card_event')
        .then((response)=>{
          return response.length
        })
        .catch((err)=>{
          //console.log(err)
        })

    let enrollCount = await db.select('user_email').from('enroll_event')
        .where((qp) => {
            if (filter.startDate !== '' && filter.endDate !== '') {
                qp.where('event_time', '>', filter.startDate)
                qp.andWhere('event_time', '<', filter.endDate)
            }
        }).then((response)=>{
          return response.length
        })
        .catch((err)=>{
          //console.log(err)
        })

    let totalEnrollCount = await db.select('user_email').from('enroll_event')
        .then((response)=>{
          return response.length
        })
        .catch((err)=>{
          //console.log(err)
        })

        res.send({anonymous,
          logged,
          enrollCount,
          cardCount,
          totalEnrollCount,
          totalCardCount})

      }