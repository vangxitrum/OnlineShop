const ProductDetail = require('../../models/user/productDetail')
class HomePageController {
    showSuggestion(req, res, next) {
      ProductDetail.find({})
        .then((products) => {
            suggestionObject={}
            products.forEach((product) => {
                suggestionObject[product.id] = product.name
                })
                res.send(suggestionObject)
        })
        .catch((error)=>{
            console.log(error)
        })
  
    }
  
  }
  module.exports = new HomePageController;