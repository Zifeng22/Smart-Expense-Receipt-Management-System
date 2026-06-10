function login(){
    console.log("Login function called");
    const data = {
        username : document.getElementById("inputUsername").value, 
        password : document.getElementById("inputPassword").value
    };
    console.log(data);


    fetch("https://smart-expense-management-system-fldl.onrender.com/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        console.log(result);
        
        localStorage.setItem("user", JSON.stringify(result));
        console.log("Stored successfully");
        window.location.href = "dashboard.html";
    })
    .catch(() => {
        //document.getElementById("message").innerHTML = "No account found, please register first";
        alert("No account found, please register first");
    });
}
    

