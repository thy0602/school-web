
// function register() {
//     let name = document.getElementById("name").value;
// }

// function onInput(event, id) {
//     console.log(event.target.value);
//     document.getElementById(id).value = event.target.value;
//     $("#noti-name").css("visibility", "hidden");
// }

$("input").on('input', function(event) {
    console.log(event.target.value);
    $(this).val(event.target.value);
    let id = $(this).attr("id");
    $(`#noti-${id}`).css("visibility", "hidden");
});

function isValid(s) {
    let day = parseInt(s.slice(0, 2));
    let month = parseInt(s.slice(3, 5));
    let year = parseInt(s.slice(6, 10));

    if (year < 1966 || year > 2006)
        return false;
  
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        if (day < 1 || day > 31)
            return false;
    }
    else if (month === 4 || month === 6 || month === 9 || month === 11) {
        if (day < 1 || day > 30)
            return false;
    }
    else if (month == 2) {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
            if (day < 1 || day > 29)
                return false;
        }
        else {
            if (day < 1 || day > 28)
                return false;
        }
    }
    else {
        return false;
    }
    
    return true;
}

$("#btn").click(function() {
    let flag = true;

    let name = $("#name").val();
    let regex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
    
    if (!name.match(regex)) {
        $("#noti-name").css("visibility", "inherit");
        flag = false;
    }
    else
        $("#noti-name").css("visibility", "hidden");

    let username = $("#username").val();
    regex = /^[a-zA-Z_]{1}\w*$/;
    console.log(username.match(regex));
    if (!username.match(regex)) {
        $("#noti-username").css("visibility", "inherit");
        flag = false;
    }
    else
        $("#noti-username").css("visibility", "hidden");

    let email = $("#email").val();
    regex = /^[a-zA-Z][\w\.]{5,32}@[a-zA-Z0-9]{2,}(\.\w{2,4}){1,3}$/;
    if (!email.match(regex)) {
        $("#noti-email").css("visibility", "inherit");
        flag = false;
    }
    else
        $("#noti-email").css("visibility", "hidden");

    let phone = $("#phone").val();
    regex = /^[0][0-9]{9}$/;
    if (!phone.match(regex)) {
        $("#noti-phone").css("visibility", "inherit");
        flag = false;
    } 
    else
        $("#noti-phone").css("visibility", "hidden");
    
    let birth = $("#birth").val();
    regex = /([0-9]{2}[/]){2}[0-9]{4}/;
    if (!birth.match(regex)) {
        $("#noti-birth").css("visibility", "inherit");
        flag = false;
    }
    else {
        if (isValid(birth))
            $("#noti-birth").css("visibility", "hidden");
        else {
            $("#noti-birth").css("visibility", "inherit");
            flag = false;
        }
    }

    if (!flag)
        return;

    $("#icon").css("visibility", "inherit");
    $("#container").css("filter", "blur(5px)")
    setTimeout(
        function() 
        {
            $("#icon").css("visibility", "hidden");
            $("#container").delay(10000).css("filter", "")
            $("input[type=text]").val("");

        }, 2000);
    
});

