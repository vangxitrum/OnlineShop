
const priceInput = document.querySelectorAll(".price-input input")
const rangeInput = document.querySelectorAll(".range-input input")
const progress = document.querySelector(".range-wrapper .progress")
let priceGap = 1000;
rangeInput.forEach(input => {
    input.addEventListener("input", () => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);
        if (maxVal - minVal < priceGap) {
            if (maxVal - minVal < priceGap) {
                if (event.target.className === "range-min") {
                    rangeInput[0].value = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap
                }
            }
        }
        else {
            setPriceInput(minVal, maxVal)
        }

    })
});


priceInput.forEach(input => {
    input.addEventListener("input", () => {
        let minVal = +parseInt(priceInput[0].dataset.price),
            maxVal = +parseInt(priceInput[1].dataset.price);
        setRangeInput(minVal, maxVal)
    })
});

// Script for page's action
$('.filter-btn').on('click', function () {
    let compareObject = {}
    compareObject = {
        'gt': $('.input-min').attr('data-price'),
        'lt': $('.input-max').attr('data-price')
    }

    rhef = `/shopcategory/?${addMultibleParam(compareObject)}`

    $.post(rhef, {}, function (view) {
        setUrlForCategoryPage(rhef)

        setHtmlForProductCategory(view)
    })

})
$('#sort_select').val(sort)
$("#sort_select").change(function () {
    // $('#sort_form').attr('action',`/shopcategory/?${addParam('sort', $("#sort_select").val())}`)
    rhef = `/shopcategory/?${addParam('sort', $("#sort_select").val())}`
    $.post(rhef, {}, function (view) {
        setUrlForCategoryPage(rhef)
        setHtmlForProductCategory(view)
    })
});


$('.filter-item').on('click', function () {
    let param = $(this).attr('data-param')
    let value = $(this).attr('data-key')
    $(`.${param}`).removeClass('text-warning')
    if (value != getValueOfParam(param))
        $(this).addClass(' text-warning')
    let link
    value === getValueOfParam(param) ? link = deleteParam(param) : link = addParam(param, value)
    rhef = `/shopcategory/?${link}`
    $.post(rhef,
        {},
        function (view) {
            setUrlForCategoryPage(rhef)

            setHtmlForProductCategory(view)
        });
})
$(".pagination_button").on('click', function () {
    let pageNumber = $(this).attr('data-page')
    let rhef = `/shopcategory/${pageNumber}/?${getParam()}`
    $.post(rhef, {}, function (view) {
        setUrlForCategoryPage(rhef)

        setHtmlForProductCategory(view)
    })
})

//  js funtion
function setRangeInput(min, max) {
    let minVal = +min
    let maxVal = +max
    if (maxVal - minVal >= priceGap && maxVal <= 3000000 && minVal >= 0) {

        rangeInput[0].value = minVal;
        progress.style.marginLeft = (Math.round((minVal / rangeInput[0].max) * 100)).toString() + '%';
        //  } else{
        rangeInput[1].value = maxVal;
        progress.style.marginRight = (100 - Math.round((maxVal / rangeInput[1].max) * 100)).toString() + '%';
        //   }
    }
}
function setPriceInput(min, max) {
    let minVal = +min
    let maxVal = +max
    priceInput[0].value = formatPrice(minVal);
    priceInput[1].value = formatPrice(maxVal);
    priceInput[0].dataset.price = minVal
    priceInput[1].dataset.price = maxVal
    progress.style.marginLeft = (Math.round((minVal / rangeInput[0].max) * 100)).toString() + '%';
    progress.style.marginRight = (100 - Math.round((maxVal / rangeInput[1].max) * 100)).toString() + '%';
}

function addParam(param, value) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(param, value)
    return searchParams.toString()
}
function addMultibleParam(prameObject) {
    var searchParams = new URLSearchParams(window.location.search)
    for (const [key, value] of Object.entries(prameObject)) {
        searchParams.set(key, value)
    }
    return searchParams.toString()
}
function deleteParam(param) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.delete(param)
    return searchParams.toString()
}
function getValueOfParam(param) {
    var searchParams = new URLSearchParams(window.location.search)
    return searchParams.get(param)
}
function getParam() {
    var searchParams = new URLSearchParams(window.location.search)
    return searchParams.toString()
}


function formatPrice(price) {
    rs = price.toString();
    index = rs.length - 3;
    len = rs.length;
    while (index > 0) {
        txt = rs.slice(0, index) + "." + rs.slice(index);
        rs = txt;
        index -= 3;
    }

    rs += ' ₫'
    return rs;
}

function paginationOnclickEvent(buttonIndex) {
    let rhef = `/shopcategory/${buttonIndex}/?${getParam()}`
    $.post(rhef, {}, function (view) {
        setUrlForCategoryPage(rhef)
        setHtmlForProductCategory(view)
    })
}
function setUrlForCategoryPage(rhef) {
    let currentUrl = window.location.href.toString()
    let newUrl = currentUrl.slice(0, currentUrl.search('/shopcategory')) + rhef
    window.history.pushState({}, "", newUrl);
}
function setHtmlForProductCategory(htmlText) {
    if ($("#product-category").hasClass("grid_list")) {
        htmlText = htmlText.toString().replaceAll("col-lg-3 col-md-4 col-sm-6", "col-12")
    }
    $('#product-category').html(htmlText)
}

