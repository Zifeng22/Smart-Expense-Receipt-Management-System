function register() {

    const password = document.getElementById("inputPassword").value;
    const confirm = document.getElementById("inputConfirm").value;

    if (password !== confirm) {
        document.getElementById("message").innerText = "Password does not match";
        return;
    }

    const data = {
        username: document.getElementById("inputUsername").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("inputPhone").value,
        password: document.getElementById("inputPassword").value,
    };

    fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        console.log(msg);
        window.location.href = "login.html";
    })
    .catch(err => console.log(err));
    
}