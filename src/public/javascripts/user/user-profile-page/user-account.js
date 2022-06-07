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

$("#imageUpload").change(function () {
    $('.message_container').html(createAlertHtml(3,"Change avarta"))
    alertSettimer()
    readURL(this)
});



Validator({
    form: '#profile-form', // id của cái form cần validate
    errorSelector: '.form-message', // tên class để hiện cái lỗi
    rules: [
        Validator.isRequire('#name_input', '* Please enter your name'),
        Validator.isRequire('#phone_input', '* Please enter your phone'),
        Validator.isRequire('#cmnd_input', '* Please enter your citizenID'),
        Validator.isNumber('#phone_input', '* Phone number must contain only numbers')
    ],
    onSubmit: function() {
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
        $('.message_container').html(createAlertHtml(1,"Nothing Has Changed"))
        alertSettimer()
        return
    }
    $.post('/userprofile', modifyObject, function (data, status) {
        let msg = data
       
        if (!data.includes('div')) {
            let dataObject= JSON.parse(data)
            $('.message_container').html(createAlertHtml(3,dataObject.msg))
            alertSettimer()
            
        } else {
            $('#list-profile').html(data)
        }
    }) 
      }
    })
