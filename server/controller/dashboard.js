const db = require("../../database/dbConfig.js");

// ======================= Tracking APis ===============================================

exports.siteReport = async (req, res) => {
  const presentDate = new Date().toLocaleDateString().split("/");

  let todayLog = 0;
  let monthLog = 0;
  let yearLog = 0;
  let anonymous  = 0;
  let todayAnonymous = 0;
  let monthAnonymous = 0;

  // [ '2022', '05', '19' ] time
  // [ '23', '05', '2022' ] present

  await db
    .table("user_tracking_data").orderBy('_id','desc')
    .then(async (response) => {
      response.map((data) => {
        let time = JSON.stringify(data.time_stamp)
          .split("T")[0]
          .slice(1)
          .split("-");

          // time[2] = (parseInt(time[2]) + 1).toString();
          // [ '2022', '05', '12' ] [ '12', '07', '2022' ]
        if (data.user_email !== 'User Not Logged In')
        {
          console.log(time,presentDate)
          // day
          if (time.includes(presentDate[0]) && time.includes(presentDate[1]) && time.includes(presentDate[2]) )
              todayLog += 1;
          //month 
          if (time.includes(presentDate[1]) && time.includes(presentDate[2]) )
              monthLog += 1;
          // year
            if (time.includes(presentDate[2]) )
            yearLog += 1; 
        }
        else {
          if (time.includes(presentDate[0]) && time.includes(presentDate[1]) && time.includes(presentDate[2])) 
          {
            todayAnonymous += 1;
            anonymous+=1
          }
          if (time.includes(presentDate[1]) && time.includes(presentDate[2]) ) 
          {
            monthAnonymous += 1;
            anonymous+=1
          } 
          else {
          anonymous+=1
        }
        }
      });

      console.log(todayLog,todayAnonymous)

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
                    todayTraffic : todayLog + todayAnonymous,
                    monthTraffic : monthLog + monthAnonymous, 
                    yearTraffic : yearLog + anonymous, 
                  });
                });
            });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send("Not Done !!!");
    });
};
