const  provincesArray = async function () {
    return await JSON.parse(provincesString)
}()
deliveryAddressJSON = deliveryAddressJSON.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
deliveryAddressJSON = deliveryAddressJSON.replace(/[\u0000-\u0019]+/g,""); 

 let deliveryAddressArray = JSON.parse(deliveryAddressJSON)

function fillAddressSelect(id, addressArray, firstValue) {

    $(`#${id}`).empty()
    $(`#${id}`).append(`<option value="-1">${firstValue}</option>`)
    let i = 0
    addressArray.forEach(element => {
        $(`#${id}`).append(`<option value="${i}">${element.name}</option>`)
        i++
    });
}

async function  fillAddressInfo  (provinceName, districtName, wardName)  {
    var provinces = await provincesArray
    var i = -1
    var j = -1
    var k = -1
    fillAddressSelect('modified_province_input', provinces, `Select Province`)
    provinces.forEach(province => {
        i++
        if (provinceName.localeCompare(province.name) == 0) {  
           j = -1
           fillAddressSelect('modified_district_input', province.districts, `Select District`)
            province.districts.forEach(district => {
                j++
                if (districtName.localeCompare(district.name) == 0) {
                    fillAddressSelect('modified_ward_input', district.wards, `Select Ward`)
                    k = -1
                    district.wards.forEach(ward => {
                        k++
                        if (wardName.localeCompare(ward.name) == 0) {
                            $('#modified_ward_input').val(`${k}`)
                            return true;
                        }
                    });
                    $('#modified_district_input').val(`${j}`)
                    return true ;
                }
            });
            $('#modified_province_input').val(`${i}`)
            return true;
        }
    });
  

}

function getModifiedDeleveryObject() {
    let deliveryObject = {}
    if ($("#modified_province_input").val() != '-1') deliveryObject['province'] = $("#modified_province_input option:selected").text();
    if ($("#modified_district_input").val() != '-1') deliveryObject['district'] = $("#modified_district_input option:selected").text();
    if ($("#modified_ward_input").val() != '-1') deliveryObject['ward'] = $("#modified_ward_input option:selected").text();
    if ($('#modified_address_input').val()) deliveryObject['address'] = $('#modified_address_input').val()
    if ($('#modified_name_input').val()) deliveryObject['name'] = $('#modified_name_input').val()
    if ($('#modified_phone_input').val()) deliveryObject['phone'] = $('#modified_phone_input').val()
    deliveryObject['default'] = $('#modifiedAddressCheckBox').is(":checked")
    return deliveryObject
}
function getAddedDeleveryObject() {
    let deliveryObject = {}
    if ($("#province_input").val() != '-1') deliveryObject['province'] = $("#province_input option:selected").text();
    if ($("#district_input").val() != '-1') deliveryObject['district'] = $("#district_input option:selected").text();
    if ($("#ward_input").val() != '-1') deliveryObject['ward'] = $("#ward_input option:selected").text();
    if ($('#address_input').val()) deliveryObject['address'] = $('#address_input').val()
    if ($('#modal_name_input').val()) deliveryObject['name'] = $('#modal_name_input').val()
    if ($('#modal_phone_input').val()) deliveryObject['phone'] = $('#modal_phone_input').val()
    deliveryObject['default'] = $('#addAddressCheckBox').is(":checked")
    return deliveryObject
}

function checkDeliveryHasExisted(deliveryObject ,index){
    let isExisted = false
        let temp = JSON.parse(JSON.stringify(deliveryObject));
        delete temp.default
        delete temp.name
        delete temp.phone
        let jsonDelivery = JSON.stringify(temp)
        i=0
        deliveryAddressArray.forEach(element => {
          
            let temp0 = JSON.parse(JSON.stringify(element));
            delete temp0.default
            delete temp0.name
            delete temp0.phone
            if (JSON.stringify(temp0) == jsonDelivery && i!=index ) {
                isExisted = true
            }
            i++
        });
return isExisted
}


$("#province_input, #modified_province_input").change(async function () {
    var indexProvince = parseInt($(this).val())
    if (indexProvince == -1) return
    var provinces = await provincesArray
    var districtsArray = provinces[indexProvince].districts
    if ($(this).attr("id").localeCompare("province_input")==0) {
        fillAddressSelect('district_input', districtsArray, `Select District`)
    } else {
        fillAddressSelect('modified_district_input', districtsArray, `Select District`)
    }
})
$("#district_input, #modified_district_input").change(async function () {
    var indexProvince = -1
    if ($(this).attr("id").localeCompare("district_input")==0) {
         indexProvince = parseInt($('#province_input').val())
    } else  {
         indexProvince = parseInt($('#modified_province_input').val())
    }
    var indexDistrict = parseInt($(this).val())
    if (indexProvince == -1 || indexDistrict == -1) return
    var provinces = await provincesArray
    var wardsArray = provinces[indexProvince].districts[indexDistrict].wards
    if ($(this).attr("id").localeCompare("district_input")==0) {
        fillAddressSelect('ward_input', wardsArray, `Select Ward`)
    } else {
        fillAddressSelect('modified_ward_input', wardsArray, `Select Ward`)
    }
})

$(document).on('click', '.modified-btn',  function () {
    let index = parseInt($(this).attr('data-index'))
    let deliveryObject = deliveryAddressArray[index]
    fillAddressInfo(deliveryObject.province, deliveryObject.district, deliveryObject.ward)
    $('#modified_name_input').val(deliveryObject.name)
    $('#modified_phone_input').val(deliveryObject.phone)
    $('#modified_address_input').val(deliveryObject.address)
    $('#modifiedAddressCheckBox').prop('checked',deliveryObject.default ==='true');
    $('#modified_address_button').attr('data-index', index)

})


$(document).on('click', '.open-delete-modal', function () {
    let removeIndex = parseInt($(this).attr('data-index'))
    $('#access-delete-button').attr('data-index', `${removeIndex}`)
})


$('.add_modify_button').on('click', function () {
    var type = $(this).attr('data-type')
    let index = parseInt($(this).attr('data-index'))
    let deliveryObject = {}
    if (type == 'add') {
        deliveryObject = getAddedDeleveryObject()
    }
    else {
        deliveryObject = getModifiedDeleveryObject()
    }
    if (Object.keys(deliveryObject).length != 7) {
        $('.message_container').html(createAlertHtml(1,"Not Enought Infomation"))
        alertSettimer()
        return
    }
    if (deliveryObject.default==true)
        deliveryAddressArray.forEach(element => {
            element.default = false
        })

    if(checkDeliveryHasExisted(deliveryObject,index)) {
        $('.message_container').html(createAlertHtml(1,"Delivery Address has already been registered"))
        alertSettimer()
        return
    }

    if (type =='add') {       
            deliveryAddressArray.push(deliveryObject)
    } else {
        deliveryAddressArray[index] = deliveryObject
    }
    $.post('/userprofile', { _id: "625a7df9f2aa2e293954e727", deliveryAddress: deliveryAddressArray }, function (view) {
        $('#address-area').html(view)
        $('.message_container').html(createAlertHtml(2,"Successfully registered address"))
        alertSettimer()
        $('#addAddressModal').modal('hide')
        $('#modifiedAddressModal').modal('hide')
    })
})

$('#access-delete-button').on('click', function () {
    var removeIndex = parseInt($(this).attr('data-index'))
    if (removeIndex == -1) return
    deliveryAddressArray.splice(removeIndex, 1)
    if(deliveryAddressArray.length==0){
        $.post('/userprofile', { deliveryAddress: "EMPTY" }, function (view) {
            $('#address-area').html(view)
            $('.message_container').html(createAlertHtml(1,"Your has not registered delivery Address"))
            alertSettimer()
        })
        return
    }
    $.post('/userprofile', {  deliveryAddress: deliveryAddressArray }, function (view) {
        $('#address-area').html(view)
        $('.message_container').html(createAlertHtml(2,"Successfully remove address"))
        alertSettimer()
    })
})

$(window).resize(function () {
    var width = $(window).width();
    if (width < 1100) {
        $('#menu-area').removeClass("row")
        $('#menu-area').addClass("col")
        $('#tag-area').removeClass("col-4")
        $('#tag-area').addClass("row")
        $('#content-area').removeClass("col-8")
        $('#content-area').addClass("row")
    }
    else if (width >= 1100) {
        $('#menu-area').removeClass("col")
        $('#menu-area').addClass("row")
        $('#tag-area').removeClass("row")
        $('#tag-area').addClass("col-4")
        $('#content-area').removeClass("row")
        $('#content-area').addClass("col-8")
    }
})