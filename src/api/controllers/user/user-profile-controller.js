const User = require('../../models/user/user')
const Cart = require('../../models/user/cart')
const Order = require('../../models/user/order')
const Shared = require('../../controllers/user/_shared')
const fetch = require('node-fetch');
const Cloudinary = require('../../../../util/cloudinary')

const moment = require('moment');

class ShopCategoryController {
    show(req, res, next) {
        console.log(req.user)
        if (req.user) {
            Promise.all([fetch('https://provinces.open-api.vn/api/?depth=3'),Cart.find({customerID:req.user._id}),Order.find({customerID:req.user._id})]).then(async result => {
                let provincesRes = await result[0].json()
                let provincesJSON = JSON.stringify(provincesRes)
                res.render('pages/user/AccountPage/user-profile-page.ejs', { auth: req.auth, pageIndex: 1, user: req.user, provinces: provincesRes, moment: moment, provincesJSON, cartList:result[1],orderList:result[2] });
            })
        }
        else {
            res.direct('/login')
        }

    }
    deleteWishItem(req, res, next) {
        console.log('AJAX DELETE WISH item');
        let currentPage = req.body.currentPage || 1
        let deleteItem = req.body.deleteItem
        console.log(req.body)
        if (req.user&&deleteItem) {
            User.updateOne({ _id: req.user._id }, {"$pull": { wishlist: { productid: deleteItem } }})
            .then(result => {
                User.findOne({ _id: req.user._id })
                .then(user => {
                    if (user == {}) {
                        res.end(Shared.jsonResponse(300, "Can't Find User Profile", JSON.stringify(user)))
                        return
                    }
                    console.log(`user: ${user}`)
                    res.render("pages/user/AccountPage/partial/user-wishlist.ejs", { layout: false, user, currentPage })
                })
            })
            .catch(err => {
                res.end(Shared.jsonResponse(500, "Can't Delete Wish Item"))
            })
        } else {
            res.end(Shared.jsonResponse(300, "Can't Define User Account"))
        }

    }
    showWishLish(req, res, next) {
        console.log('AJAX wishlist')
        let currentPage = req.body.currentPage || 1
        let queryObject = {}
        console.log(`my usre${req.user}`)
        if (req.user) {
            User.findOne({ _id: req.user._id })
                .then(user => {
                    if (user == {}) {
                        res.end(Shared.jsonResponse(300, "Can't Find User Profile", JSON.stringify(user)))
                        return
                    }
                    console.log(`user: ${user}`)
                    res.render("pages/user/AccountPage/partial/user-wishlist.ejs", { layout: false, user, currentPage })
                })

        } else {
            res.end(Shared.jsonResponse(300, "Can't Define User Account"))
        }

    }
    async updateProfile(req, res, nex) {
        console.log('AJAX UPdate profile')
        console.log(`user profile: ${req.user._id}`)
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
        if (req.body.wantProduct) {
            let wantProductJSON = JSON.stringify(req.body.wantProduct)
            let isExisted = false
            req.user.wishlist.forEach(element => {
                if (JSON.stringify(element) == wantProductJSON) {
                    isExisted = true
                    return false

                }
            });
            if (!isExisted) {
                req.user.wishlist.push(req.body.wantProduct)
                modifyObject['wishlist'] = req.user.wishlist
            } else {
                res.end(Shared.jsonResponse(300, 'The Product has been added to your wishlist.'))
                return;
            }

        }
        if (req.body.wishlist) {
            req.user.wishlist = req.body.wishlist
            modifyObject['wishlist'] = req.user.wishlist
        }


        if (req.body.avarta) {
            try {
                var fileStr = req.body.avarta
                var uploadRes = await Cloudinary.uploader.upload(fileStr, { folder: 'UserAvatar' })
                // Cloudinary.uploader.destroy(req.user.imageID)
                if (uploadRes.url) {
                    modifyObject['avatar'] = uploadRes.url
                    modifyObject['imageID'] = uploadRes.public_id
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (req.user) {
            User.updateOne({ _id: req.user._id }, { "$set": modifyObject })
                .then(result => {
                    User.findOne({ _id: req.user._id })
                        .then(user => {
                            if (user == {}) {
                                res.end(Shared.jsonResponse(300, "Can't Find User Profile", JSON.stringify(user)))
                                return
                            }
                            if (req.body.deliveryAddress) {

                                res.render("pages/user/AccountPage/partial/user-delivery-address.ejs", { layout: false, user })
                                return
                            } else {
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
    async changePassword(req, res,next){
        console.log(req.user)
        console.log(req.body)
        let currentPassword = req.body.currentPassword
        let newPassword = req.body.newPassword
        User.findById(req.user._id).then(user =>{
            console.log(user)
        if(!user){
            res.end(Shared.jsonResponse(300, "Cant find User Profile"))
            return
        }
        user.isValidPassword(currentPassword)
        .then(rs=>{
            if(rs){
                console.log(rs)
                user.password=newPassword
                user.save()
                res.end(Shared.jsonResponse(200, "Change Password Successfully"))
                return
            } else{
                res.end(Shared.jsonResponse(300, "Your password is incorrect"))
                return 
            }
          
        })
        .catch(err => {
            res.end(Shared.jsonResponse(300, "Your password is incorrect"))
            return
        }) 
        })
        .catch(error => {
            console.log(error)  
            res.end(Shared.jsonResponse(400, "DB Error", error))
        })
    }

}

module.exports = new ShopCategoryController;