$('#change-password').on('click', function() {
var currentPassword=$('#current-password').val()
var newpassword= $('#new-password').val();
var newpasswordConfirm= $('#re-password').val();
if(newpassword==currentPassword){
    alert("This password is used")
    return
}
if(newpassword!=currentPassword){
    alert("Wrong password. Try again or click Forgot password to reset it.")
}

})