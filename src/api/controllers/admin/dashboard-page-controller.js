
class DashBoardPageController{
    show(req,res,next){
        res.render('pages/admin/dashboard-page.ejs',{pageName: "aboutPage"});
    }


}

module.exports = new DashBoardPageController;