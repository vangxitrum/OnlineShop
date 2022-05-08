const ProductDetail = require('../../models/user/productDetail')
const Shared = require('../../controllers/user/_shared')
class HomePageController {
    showSuggestion(req, res, next) {
      
      let searchText = req.body.searchText
      if(searchText){
        console.log(searchText)
        ProductDetail.find({name:{$regex: new RegExp(`.*${searchText}.*`,'i')}})
        .then((products) => {
          console.log(products)
            let suggestionObject={}
            products.forEach((product) => {
                suggestionObject[product.id] = product.name
                })
                res.send(JSON.stringify(suggestionObject))
        })
        .catch((error)=>{
            console.log(error)
        })
      }
    }
  
  }
  module.exports = new HomePageController;