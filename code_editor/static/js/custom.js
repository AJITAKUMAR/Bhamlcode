 function Sendotp(){
    var form_data = $("#form-mobile").serialize();
    var contactno = $("#phone").val()
    if(contactno=='' || contactno==undefined)
    {
    $('#gmessage').html('<b>Mobile Number field is mandatory</b>');
    return false;
    }
    else{
    if(contactno.length == 10){
    $('#gmessage').html('');
        $.ajax(
        {
            url: "/accounts/generate_otp/",
            type: 'POST',
            dataType:'json',
            data: form_data,
            success: function(result)
            {
                if(result.is_first_time == true)
                {
                    $('#gmessage').html(result.msg);
                    $("#phone").prop("readonly", true);
                    $("#otp_varify").show();

                }
                else
                {
                 window.location = '/services/1'
                }
    //            bootbox.alert(
    //            {
    //                size: "small",
    //                title: "OTP Detail",
    //                message: result.msg,
    //                buttons:
    //                {
    //                    ok:
    //                    {
    //                       label: "OK",
    //                       className: "EPassButton"
    //                    }
    //                },
    //                className: "EPassModal",
    //            })
            },
            error:function(err)
            {
                console.log(err);
            }
        });
    }else{
    $('#gmessage').html('<b>Mobile Number should be 10 digit</b>');
    return false;
    }
    }
}
function Phone_varify(){
    var form_data = $("#form-mobile").serialize();
    var contactno = $("#otp").val()
    if(contactno=='' || contactno==undefined)
    {
    $('#otpmessage').html('<b>OTP field is mandatory</b>');
    return false;
    }
    else{
    if(contactno.length == 6){
    $('#otpmessage').html('');
        $.ajax(
    {
        url: "/accounts/verify_otp/",
        type: 'POST',
        dataType:'json',
        data: form_data,
        success: function(value)
        {
            if (value.status == true)
            {
                $('#otpmessage').html(value.data);
                $("#otp").prop("readonly", true);
                $("#otp_varify").show();
                $('#register_btn').prop('disabled', false);
            }
            else
            {
                $('#otpmessage').html(value.data);
            }
        }
    });
    }else{
    $('#otpmessage').html('<b>OTP should be 6 digits</b>');
    return false;
    }
    }

}