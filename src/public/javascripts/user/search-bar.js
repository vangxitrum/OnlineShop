
 let searchTimeout 
 let searchString =""
 $(document).ready(function(){
    $('.search-input').keyup(function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(search,800)
        searchString = $(this).val();
       
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
