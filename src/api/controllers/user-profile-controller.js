const { render } = require('node-sass')
const User = require('../models/user')
var moment = require('moment');
const Shared = require('../controllers/_shared')
const Cloudinary = require('../../../util/cloudinary')
const fetch = require('node-fetch');
const { type } = require('express/lib/response');
class ShopCategoryController {
    show(req, res, next) {
        Promise.all([User.findOne({ _id: '625a7df9f2aa2e293954e727' }), fetch('https://provinces.open-api.vn/api/?depth=3')])
            .then(async result => {
                let provincesRes = await result[1].json()
                let provincesJSON = await JSON.stringify(provincesRes)
                console.log("User Profile")
                console.log('Viet Nam Provinces')
                console.log(typeof provincesRes)
                res.render('pages/user/AccountPage/user-profile-page.ejs', { auth: false, PageIndex: 1, user: result[0], provinces: provincesRes, moment: moment, provincesJSON });
            })
       
    }
    async updateProfile(req, res, nex) {
        console.log('AJAX UPdate profile')
        if (req.body == {}) {
            res.end(Shared.jsonResponse(300, "Nothing to Modify"))
            return
        }
        let modifyObject = {}
        if (req.body.name) modifyObject['name'] = req.body.name
        if (req.body.phone) modifyObject['phone'] = req.body.phone
        if (req.body.citizenID) modifyObject['citizenID'] = req.body.citizenID
        if (req.body.gender) modifyObject['gender'] = req.body.gender
        if (req.body.deliveryAddress) {
            modifyObject['deliveryAddress'] = req.body.deliveryAddress
        }
        if (req.body.avarta) {
            console.log('start upload avarta')
            try {
                var fileStr = req.body.avarta
                var uploadRes = await Cloudinary.uploader.upload(fileStr, { folder: 'UserAvatar' })
                console.log(uploadRes)
                if (uploadRes.url) {
                    modifyObject['avatar'] = uploadRes.url
                    modifyObject['imageID'] = uploadRes.public_id
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (req.body._id) {
            User.updateOne({ _id: req.body._id }, { "$set": modifyObject })
                        .then(result => {
                            User.findOne({ _id: '625a7df9f2aa2e293954e727' })
                            .then(user => {
                               // Cloudinary.uploader.destroy(user.imageID)
                                if (user == {}) {
                                    res.end(Shared.jsonResponse(300, "Can't Find User Profile", result))
                                    return
                                }
                                if(req.body.deliveryAddress) {
                                    res.render("pages/user/AccountPage/partial/user-delivery-address.ejs",{layout:false,user})
                                    return
                                 }else{ 
                                 res.end(Shared.jsonResponse(200, 'Update Successfully', result))
                                }
                            })
                        })
                        .catch(error => {
                            res.end(Shared.jsonResponse(400, "DB Error ", error))
                        })
        } else {
            res.end(Shared.jsonResponse(300, "Can't Define User Account"))
        }
    }

}

module.exports = new ShopCategoryController;