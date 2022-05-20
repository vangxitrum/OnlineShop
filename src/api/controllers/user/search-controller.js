const ProductDetail = require('../../models/user/productDetail')
const Shared = require('../../controllers/user/_shared')
class HomePageController {
    showSuggestion(req, res, next) {
      
      let searchText = req.body.searchText
      if(searchText){
        let searchObject={name:{$regex: new RegExp(`.*${searchText}.*`,'i')}}
        if(req.body.type!=="0"){
          searchObject['type']=req.body.type
        }
        ProductDetail.find(searchObject)
        .limit(5)
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