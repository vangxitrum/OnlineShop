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
