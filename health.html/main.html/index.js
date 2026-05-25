 function openLogin() {
  document.getElementById("loginModel").classList.add("active");
}

function closeLogin() {
  document.getElementById("loginModel").classList.remove("active");
}
function toggleMenu(menuId){

  var menu = document.getElementById(menuId);

  if(menu.style.display === "block"){
    menu.style.display = "none";
  }
  else{
    menu.style.display = "block";
  }


}
function escapeRegex(text) {
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
const searchInput = document.querySelector('.header input');

searchInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    let searchValue = searchInput.value.trim();
    let content = document.getElementById("content");

    if (searchValue !== "") {
      let innerHTML = content.innerHTML;
      let regex = new RegExp(searchValue, "gi");
      content.innerHTML = innerHTML.replace(regex, `<span style="background-color: yellow;">${searchValue}</span>`);
    }
  }
});
document.addEventListener("DOMContentLoaded", function() {
  


document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let email = document.getElementById("email2").value;
  let password = document.getElementById("password2").value;
  let errorMsg = document.getElementById("errorMsg");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let foundUser = users.find(user => user.email === email && user.password === password);

  if(foundUser){
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    showProfile();
    closeLogin();
  } else {
    errorMsg.textContent = "Incorrect credentials ❌";
  }
});

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if(loggedInUser){
    showProfile();
  }
});
document.getElementById("createAccountForm").addEventListener("submit", function(event){
  event.preventDefault();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let errorMsg2 = document.getElementById("errorMsg2");

  if(password.length < 6){
    errorMsg2.textContent = "Password must be at least 6 characters long";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let emailExists = users.find(user => user.email === email);

  if(emailExists){
    errorMsg2.textContent = "This email is already registered";
    return;
  }

  let newUser = {
    firstName,
    lastName,
    phone,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

 localStorage.setItem("loggedInUser", JSON.stringify(newUser));
 showProfile();

  errorMsg2.style.color = "green";
  errorMsg2.textContent = "Account created successfully ✔";

  closeCreateAccount();
});

function openSignup(){
  document.getElementById("createAccountModel").classList.add("active");
}

function closeCreateAccount(){
  document.getElementById("createAccountModel").classList.remove("active");
}
function showProfile(){
  document.getElementById("authButtons").style.display = "none";
  document.getElementById("profileSection").style.display = "flex";
}
function logout(){
  localStorage.removeItem("loggedInUser");
  location.reload();
}
function goToProfile(){
  window.location.href = "profile.html";
}
function goToArticle(page){
  window.location.href = page;
}