
const localhost = 'http://localhost:8000';
const db = require('../../database/dbConfig.js')

// ================================================= Apis for Products ======================================================= 
//==============================================================================================================================

// Get Product List 

exports.getListUser = async (req, res) => {
    const filter = JSON.parse(req.query.filter)
    //console.log(filter)

    if (filter !== '') {
        await db.select('*').from('newregistration')
            .where((qp) => {
                if (filter.startDate !== '' && filter.endDate !== '') {
                    qp.where('reg_time', '>', filter.startDate)
                    qp.andWhere('reg_time', '<', filter.endDate)
                }
                if (filter.mobile !== '')
                    qp.andWhere('mobile_no', '=', filter.mobile)


            }).then((response) => {
                // //console.log(response)
                res.send(response)
            })
            .catch((err) => {
                //console.log(err)
                res.send("Not Done !!!")
            })
    }
    else {

        await db.select('*').from('newregistration').orderBy('_id', 'desc')
            .then((response) => {
                res.send(response)
            })
            .catch((err) => {
                //console.log(err)
                res.send("Not Done !!!")
            })

    }

}


// delete products 

exports.deleteUser = async (req, res) => {
    // //console.log(req.query.ID)
    db.table('newregistration').delete().where('_id', '=', req.query.ID)
        .then((data) => {
            //console.log(data)
            res.send({ message: "Product deleted successfully !!!" })
        })
        .catch((err) => {
            res.send({ message: 'Some error occurs !!!' })

        })
}

// update products 

exports.updateUser = async (req, res) => {
    //console.log(req.body);
    //    res.send('Okay')
    //    //console.log(req.files);

    //    if (req.files['featured_image'] !== undefined)
    //     req.body.featured_image = `${localhost}/${req.files['featured_image'][0].path}`;


    if (req.body._id === undefined) return res.status(204).send('Payload is absent.')

    const _id = req.body._id;
    delete req.body._id;

    await db.table('newregistration').where('_id', '=', _id).update(req.body)
        .then((data) => {
            //console.log(data)
            if (data)
                return res.status(200).send({ message: 'User is updated successfully.' })
            else
                return res.status(203).send({ message: 'No entries found' })
        })
        .catch((error) => {
            //console.log(error)
            return res.status(203).send('Something Went Wrong')
        })
}
  // ================================================= Apis for Products Ends =======================================================
