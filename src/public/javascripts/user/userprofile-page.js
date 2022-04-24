const provincesArray = async function () {
    return await JSON.parse(provincesString)
}()
let deliveryAddressArray = JSON.parse(deliveryAddressJSON)
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0])
    }
}


function fillAddressSelect(id, addressArray, firstValue) {

    $(`#${id}`).empty()
    $(`#${id}`).append(`<option value="-1">${firstValue}</option>`)
    let i = 0
    addressArray.forEach(element => {
        $(`#${id}`).append(`<option value="${i}">${element.name}</option>`)
        i++
    });
}

async function fillAddressInfo(provinceName, districtName, wardName) {
    var provinces = await provincesArray
    var i = -1
    var j = -1
    var k = -1
    $('#province_input').val(-1)
    provinces.forEach(province => {
        i++
        if (provinceName.localeCompare(province.name) == 0) {
            fillAddressSelect('district_input', province.districts, `Select District`)
            j = -1
            province.districts.forEach(district => {
                j++
                if (districtName.localeCompare(district.name) == 0) {
                    fillAddressSelect('ward_input', district.wards, `Select Ward`)
                    k = -1
                    district.wards.forEach(ward => {
                        k++
                        if (wardName.localeCompare(ward.name) == 0) {
                            $('#ward_input').val(`${k}`)
                            return;
                        }
                    });
                    $('#district_input').val(`${j}`)
                    return;
                }
            });
            $('#province_input').val(`${i}`)
            return
        }
    });
}

$("#province_input").change(async function () {
    var indexProvince = parseInt($(this).val())
    if (indexProvince == -1) return
    var provinces = await provincesArray
    var districtsArray = provinces[indexProvince].districts
    fillAddressSelect('district_input', districtsArray, `Select District`)
})
$("#district_input").change(async function () {
    var indexProvince = parseInt($('#province_input').val())
    var indexDistrict = parseInt($(this).val())
    if (indexProvince == -1 || indexDistrict == -1) return
    var provinces = await provincesArray
    var wardsArray = provinces[indexProvince].districts[indexDistrict].wards
    fillAddressSelect('ward_input', wardsArray, `Select Ward`)
})
$("#imageUpload").change(function () {
    alert('modify image')
    readURL(this)
});
$('#save_profile').on('click', function () {
    let bg = $('#imagePreview').css('background-image')
    bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
    modifyObject = {}
    if (bg.includes("data:")) {
        modifyObject['avarta'] = bg
    }
    if ($('#name_input').val() != $('#name_input').attr('data-initial')) {
        modifyObject['name'] = $('#name_input').val()
    }
    if ($('#phone_input').val() != $('#phone_input').attr('data-initial')) {
        modifyObject['phone'] = $('#phone_input').val()
    }
    if ($('#cmnd_input').val() != $('#cmnd_input').attr('data-initial')) {
        modifyObject['citizenID'] = $('#cmnd_input').val()
    }
    if ($('#gender_input').val() != $('#gender_input').attr('data-initial')) {
        modifyObject['gender'] = $('#gender_input').val()
    }
    if (JSON.stringify(modifyObject) == "{}") {
        alert("Nothing Has Changed")
        return
    }
    modifyObject['_id'] = "625a7df9f2aa2e293954e727"
    $.post('/userprofile', modifyObject, function (data, status) {
        let msg = data
        if (!data.includes('div')) {
            alert(msg)
        } else {
            $('#list-profile').html(data)
        }
    })
})

// Manage Delivery Address Start


$(document).on('click', '.modified-btn', function () {
    let index = parseInt($(this).attr('data-index'))
    let isDefault = $(this).attr('data-default')
    if (isDefault == 'true') {
        $('#set_default_check_box').prop('checked', true);
    } else {
        $('#set_default_check_box').prop('checked', false);
    }
    let deliveryObject = deliveryAddressArray[index]
    fillAddressInfo(deliveryObject.province, deliveryObject.district, deliveryObject.ward)
    $('#modal_name_input').val(deliveryObject.name)
    $('#modal_phone_input').val(deliveryObject.phone)
    $('#address_input').val(deliveryObject.address)
    $("#add_modify_button").attr('data-index', `${index}`);
})

$(document).on('click', '.open-delete-modal', function () {
    let removeIndex = parseInt($(this).attr('data-index'))
    $('#access-delete-button').attr('data-index', `${removeIndex}`)
})

$('#add_new_address').on('click', function () {
    let removeIndex = parseInt($(this).attr('data-index'))
    $("#add_modify_button").attr('data-index', `${removeIndex}`);
})

$('#add_modify_button').on('click', function () {
    var index = +$(this).attr('data-index')
    let deliveryObject = {}
    if ($("#province_input").val() != '-1') deliveryObject['province'] = $("#province_input option:selected").text();
    if ($("#district_input").val() != '-1') deliveryObject['district'] = $("#district_input option:selected").text();
    if ($("#ward_input").val() != '-1') deliveryObject['ward'] = $("#ward_input option:selected").text();
    if ($('#address_input').val()) deliveryObject['address'] = $('#address_input').val()
    if ($('#modal_name_input').val()) deliveryObject['name'] = $('#modal_name_input').val()
    if ($('#modal_phone_input').val()) deliveryObject['phone'] = $('#modal_phone_input').val()
    deliveryObject['default'] = $('#set_default_check_box').is(":checked")
    $('#modal_phone_input').val()
    $('#address_input').val()
    if (Object.keys(deliveryObject).length != 7) {
        alert("Chua day du thong tin")
        return
    }
    if (deliveryObject.default == true)
        deliveryAddressArray.forEach(element => {
            element.default = false
        })
    if (index == -1) {
        let isExisted = false
        let temp = JSON.parse(JSON.stringify(deliveryObject));
        delete temp.default
        delete temp.name
        delete temp.phone
        let jsonDelivery = JSON.stringify(temp)
        deliveryAddressArray.forEach(element => {
            let temp0 = JSON.parse(JSON.stringify(element));
            delete temp0.default
            delete temp0.name
            delete temp0.phone
            if (JSON.stringify(temp0) === jsonDelivery) {
                isExisted = true
            }
        });
        if (isExisted) {
            alert("Has Existed")
            return
        } else {
            deliveryAddressArray.push(deliveryObject)
        }
    } else {
        deliveryAddressArray[index] = deliveryObject
    }
    $.post('/userprofile', { _id: "625a7df9f2aa2e293954e727", deliveryAddress: deliveryAddressArray }, function (view) {
        $('#address-area').html(view)
        $('#addModal').modal('toggle')
    })
})

$('#access-delete-button').on('click', function () {
    var removeIndex = parseInt($(this).attr('data-index'))
    if (removeIndex == -1) return
    deliveryAddressArray.splice(removeIndex, 1)
    $.post('/userprofile', { _id: "625a7df9f2aa2e293954e727", deliveryAddress: deliveryAddressArray }, function (view) {
        $('#address-area').html(view)
    })
})



$(window).resize(function() {
    var width = $(window).width();
    if (width < 1100){
        $('#menu-area').removeClass("row")
        $('#menu-area').addClass("col")
        $('#tag-area').removeClass("col-4")
        $('#tag-area').addClass("row")
        $('#content-area').removeClass("col-8")
        $('#content-area').addClass("row")
    }
    else if (width >= 1100){
        $('#menu-area').removeClass("col")
        $('#menu-area').addClass("row")
        $('#tag-area').removeClass("row")
        $('#tag-area').addClass("col-4")
        $('#content-area').removeClass("row")
        $('#content-area').addClass("col-8")
    }
})
