
let searchTimeout
let searchString = ""
let type = ""
$(document).ready(function () {
  
    $('.search-input ').focusout(() => {
        setTimeout(() => {
            if ($(".suggesstion-box").hasClass("show")) {
                $(".suggesstion-box").removeClass("show");
            }
        }, 150);
           
       
    })

    $('.search-input').focus(() => {
        let searchObject = {}
        let typeIndex = $(this).attr('data-index')
        if (typeIndex) {
            searchObject[type] = typeIndex
            alert(typeIndex)

        }
        if (searchString != "") {
           
            searchObject[searchText] = searchString
            $.post('/search', searchObject, function (data) {
                let productSuggesstion = JSON.parse(data);
                let htmlSearchSuggesstion = '';
                Object.keys(productSuggesstion).forEach(function (key) {
                    htmlSearchSuggesstion += `<div <class="product-suggesstion" data-id="${key}"> <a>${productSuggesstion[key]}</a> </div>`
                })
                $(".suggesstion-box").html(htmlSearchSuggesstion);
            });
            $(".suggesstion-box").addClass("show");
        }
        else {
            $(".suggesstion-box").removeClass("show");
        }

    })
    $('.search-input').keyup(function (e) {
        let typeIndex = $(this).attr('data-index')
        let type=0
        if (typeIndex) {
        type=$(`#categori${typeIndex}`).val()
        }
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(search(type), 100)
        searchString = $(this).val();
        if (searchString != "") {
            $(".suggesstion-box").addClass("show");
        }
        else {
            $(".suggesstion-box").removeClass("show");
        }

    });
    function search(typeCategory) {
        $.post('/search', { searchText: searchString,type:typeCategory }, function (data) {
            let productSuggesstion = JSON.parse(data);
            let htmlSearchSuggesstion = '';
            Object.keys(productSuggesstion).forEach(function (key) {
                htmlSearchSuggesstion += `<a href="/productdetail?id=${key}">${productSuggesstion[key]}</a> `
            })
            $(".suggesstion-box").html(htmlSearchSuggesstion);
        });
    }


})

