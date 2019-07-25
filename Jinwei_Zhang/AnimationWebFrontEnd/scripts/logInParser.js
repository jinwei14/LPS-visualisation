(function (window) {
    /*
    *Event handling on reading the user name and password typed by user.
    */
    document.addEventListener("DOMContentLoaded", function () {

        function signIn(event) {
            //open up the content of the  visualiser
            username = document.getElementById("inputEmail").value;
            password = document.getElementById("inputPassword").value;
            console.log(event.type);
            console.log(username,password);


            if (username === 'jinwei@gmail.com' && password === '123'){

// Simulate an HTTP redirect:
                window.location.replace("../index.html");
            }else{
                window.alert("password incorrect");
            }

        }


        // change the button text after click
        // instead of using another selector API.
        document.querySelector("#signinButton").addEventListener("click", signIn);

    });

})(window);
