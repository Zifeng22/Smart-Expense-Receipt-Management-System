console.log("SETTING.JS LOADED");
function displayUserInfo(user) {

    if (!user) return;

    document.getElementById("usernameLabel").innerText = user.username;
    //document.getElementById("passwordLabel").innerText = user.password;
    document.getElementById("emailLabel").innerText = user.email;
    document.getElementById("phoneLabel").innerText = user.phone;
}

function loadUsers() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        console.log("No logged in user");
        return;
    }

    fetch(`http://localhost:8080/setting/${user.userid}`)
        .then(res => res.json())
        .then(data => displayUserInfo(data))
        .catch(err => console.log(err));
}

function saveUsername(){
    let user = JSON.parse(localStorage.getItem("user"));

    const data = {
        id: user.userid,
        username : document.getElementById("newUsername").value,
        password : user.password,
        email : user.email,
        phone : user.phone
    };

    fetch(`http://localhost:8080/updateUser/${user.userid}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(updateUser =>{
        console.log("UPDATED USER:", updateUser);

        localStorage.setItem("user", JSON.stringify(updateUser));
        document.getElementById("passwordLabel").innerText = updateUser.password;
        document.getElementById("usernameLabel").innerText = updateUser.username;
        document.getElementById("emailLabel").innerText = updateUser.email;
        document.getElementById("phoneLabel").innerText = updateUser.phone;

        localStorage.setItem("user", JSON.stringify(updateUser));
        displayUserInfo(updateUser);

        let modal = bootstrap.Modal.getInstance(
            document.getElementById("editUsernameModal")
        );
        modal.hide();

        alert("Username updated");
    })
    .catch(err => 
        console.log(err)
    );

}

function savePassword(){

    let originalPW = document.getElementById("originalPassword").value;
    let newPW = document.getElementById("newPassword").value;
    let user = JSON.parse(localStorage.getItem("user"));

    if(originalPW !== user.password){
        alert("Incorrect password, please try again");
        return;

    }
    if(newPW == user.password){
        alert("The new password must be different from your previous password.");
        return;
    }

    const data = {
        id: user.userid,
        username : user.username,   
        password : newPW,
        email : user.email,
        phone : user.phone
    };

    fetch(`http://localhost:8080/updateUser/${user.userid}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(updateUser =>{
        console.log("UPDATED USER:", updateUser);

        localStorage.setItem("user", JSON.stringify(updateUser));
        
        document.getElementById("usernameLabel").innerText = updateUser.username;
        document.getElementById("emailLabel").innerText = updateUser.email;
        document.getElementById("phoneLabel").innerText = updateUser.phone;

        localStorage.setItem("user", JSON.stringify(updateUser));
        displayUserInfo(updateUser);

        let modal = bootstrap.Modal.getInstance(
            document.getElementById("editPasswordModal")
        );
        modal.hide();

        alert("Password updated");
    })
    .catch(err => 
        console.log(err)
    );
}

function saveEmail(){
    let user = JSON.parse(localStorage.getItem("user"));

    const data = {
        id: user.userid,
        username : user.username,
        password : user.password,
        email : document.getElementById("newEmail").value,
        phone : user.phone
    };

    fetch(`http://localhost:8080/updateUser/${user.userid}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(updateUser =>{
        console.log("UPDATED USER:", updateUser);

        localStorage.setItem("user", JSON.stringify(updateUser));
        document.getElementById("passwordLabel").innerText = updateUser.password;
        document.getElementById("usernameLabel").innerText = updateUser.username;
        document.getElementById("emailLabel").innerText = updateUser.email;
        document.getElementById("phoneLabel").innerText = updateUser.phone;

        localStorage.setItem("user", JSON.stringify(updateUser));
        displayUserInfo(updateUser);

        let modal = bootstrap.Modal.getInstance(
            document.getElementById("editEmailModal")
        );
        modal.hide();

        alert("Email updated");
    })
    .catch(err => 
        console.log(err)
    );
}

function savePhone(){
    let user = JSON.parse(localStorage.getItem("user"));

    const data = {
        id: user.userid,
        username : user.username,
        password : user.password,
        email : user.email,
        phone : document.getElementById("newPhone").value
    };

    fetch(`http://localhost:8080/updateUser/${user.userid}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(updateUser =>{
        console.log("UPDATED USER:", updateUser);

        localStorage.setItem("user", JSON.stringify(updateUser));
        document.getElementById("passwordLabel").innerText = updateUser.password;
        document.getElementById("usernameLabel").innerText = updateUser.username;
        document.getElementById("emailLabel").innerText = updateUser.email;
        document.getElementById("phoneLabel").innerText = updateUser.phone;

        localStorage.setItem("user", JSON.stringify(updateUser));
        displayUserInfo(updateUser);

        let modal = bootstrap.Modal.getInstance(
            document.getElementById("editPhoneModal")
        );
        modal.hide();

        alert("Phone number updated");
    })
    .catch(err => 
        console.log(err)
    );
}

window.addEventListener("load", function () {
    console.log("setting.js loaded");
    loadUsers();

    let select = document.getElementById("appearanceSelect");

    if (select) {
        let savedTheme = localStorage.getItem("theme") || "light";

        applyTheme(savedTheme);

        select.addEventListener("change", function () {
            let theme = this.value.toLowerCase();
            localStorage.setItem("theme", theme);
            applyTheme(theme);
        });
    }

    let currencySelect = document.getElementById("currencySelect");

    if (currencySelect) {
        currencySelect.value = localStorage.getItem("currency") || "MYR";

        currencySelect.addEventListener("change", function () {
            localStorage.setItem("currency", this.value);
            loadExpenses();
            console.log(localStorage.getItem("currency"));
            console.log(convert(100));
        });
    }
});

function applyTheme(theme) {
    console.log("theme applied:", theme);

    let select = document.getElementById("appearanceSelect");
    if (!select) return;

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        select.value = "dark";
    } else {
        document.body.classList.remove("dark-mode");
        select.value = "light";
    }
}
