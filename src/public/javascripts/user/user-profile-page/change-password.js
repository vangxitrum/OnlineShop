
//add vadidator required current password fields
Validator({
    form: '#repassword-form', // id của cái form cần validate
    errorSelector: '.form-message', // tên class để hiện cái lỗi
    rules: [
        Validator.isRequire('#current-password', 'Please fill out the required fields'),
        Validator.isRequire('#new-password', 'Please fill out the required fields'),
        Validator.isRequire('#re-password', 'Please fill out the required fields'),
        Validator.isDuplicatePassword('#re-password',"#new-password", 'Confirm password does not match'),
    ],
    onSubmit: function() {
        var currentPassword=$('#current-password').val()
        var newpassword= $('#new-password').val();
        $.ajax({
            url: "/userprofile/password",
            type: "PUT", 
            data: { currentPassword: currentPassword, newPassword: newpassword },
            success: function(data) {
                let dataObject =JSON.parse(data)
                if(dataObject.status===200){
                    $('.message_container').html(createAlertHtml(3,dataObject.msg))
                    alertSettimer()
                } else{
                    $('.message_container').html(createAlertHtml(1,dataObject.msg))
                    alertSettimer()
                }
                $('#new-password').val("");
                $('#re-password').val("");
                $('#current-password').val("")
            },
            error: function() {
            }
        });
     

      }
    })
//ajax call to server to repassword
function ajaxCallToReassignPassword(){
    var currentPassword=$('#current-password').val()
    var newpassword= $('#new-password').val();
    var newpasswordConfirm= $('#re-password').val();
    alert(`current password: ${currentPassword} new password: ${newpassword} confirmation: ${newpasswordConfirm}`);
    $('#current-password').html("")
}
function check() {
        $("#current-password-error").html($('#password-temp').text())
        $("#new-password-error").html($('#new-password-temp').text())
        $("#confirm-password-error").html($('#confirm-temp').text())
    setTimeout(check, 500);

    // do work here
}

check();