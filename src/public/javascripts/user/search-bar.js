
 let searchTimeout 
 let searchString =""
 $(document).ready(function(){
    $('.search-input').focusout(() =>{
        if ($(".suggesstion-box").hasClass("show")){
            $(".suggesstion-box").removeClass("show");
        }
    })

    $('.search-input').focus(() =>{
        if (searchString != ""){
            $.post('/search', {searchText:searchString},function(data) {
                let productSuggesstion = JSON.parse(data);
                let htmlSearchSuggesstion='';
                 Object.keys(productSuggesstion).forEach(function(key) {
                     htmlSearchSuggesstion += `<div <class="product-suggesstion" data-id="${key}"> <a>${productSuggesstion[key]}</a> </div>`
                 })
                 $(".suggesstion-box").html(htmlSearchSuggesstion);
             });
            $(".suggesstion-box").addClass("show");
        }
        else{
            $(".suggesstion-box").removeClass("show");
        }
        
    })
    $('.search-input').keyup(function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(search,800)
        searchString = $(this).val();
        if (searchString != ""){
            $(".suggesstion-box").addClass("show");
        }
        else{
            $(".suggesstion-box").removeClass("show");
        }
       
    });
    function search() {
        let existingString = $(".search-input").val();
        $.post('/search', {searchText:searchString},function(data) {
           let productSuggesstion = JSON.parse(data);
           let htmlSearchSuggesstion='';
            Object.keys(productSuggesstion).forEach(function(key) {
                htmlSearchSuggesstion += `<div <class="product-suggesstion" data-id="${key}"> <a>${productSuggesstion[key]}</a> </div>`
            })
            $(".suggesstion-box").html(htmlSearchSuggesstion);
        });
    }
    

 })
