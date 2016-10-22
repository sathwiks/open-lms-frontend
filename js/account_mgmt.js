var user = read_cookie("user");

var path = window.location.pathname;
if (user == null && !path.includes("login.html")) {
    window.location = "../login.html";
}

function login(email, password , callback) {
    const login_url = "http://52.34.207.176/api/login";
    if (email === "" || password === "" ) {
         callback({message: "These fields cannot be empty"});
    } else if (email && password) {
        const data = {
            email: email,
            password: password
        };
        $.ajax({
            type: "POST",
            url: login_url,
            data: data,
            dataType: "json",
            success: function (response) {
                var user = response;
                bake_cookie("user", user);
                callback({
                    message: "success",
                    user: user
                });
            },
            error: function (xhr, errmsg, err) {
                console.log(xhr.status + ": " + xhr.responseText);
                var res = JSON.parse(xhr.responseText);
                if (res['error'] === "invalid_credentials") {
                    callback({message: "Invalid Credentials"});
                } else {
                    callback({message: "An error occurred. Try again"});
                }

            }
        });
    }
}

function logout() {
    delete_cookie("user");
    window.location = "../login.html";
}

function getLoginName(){
    var nameTagStr = read_cookie("user")["lname"]+" "+ read_cookie("user")["fname"];
    return nameTagStr;
}

$( document ).ready(function() {
    $('#logout-btn').click(logout);

    $('#login-name').html(getLoginName());
});
