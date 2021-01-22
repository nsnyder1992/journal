/* *************************
 *** USER SIGNUP ***
 ************************** */
function userSignUp() {
  // console.log("userSignUp Function Called");
  let userEmail = document.getElementById("emailSignup").value;
  let userPass = document.getElementById("pwdSignup").value;
  let newUserData = { user: { email: userEmail, password: userPass } };
  console.log(
    `NEW USER DATA ==> ${newUserData.user.email} ${newUserData.user.password}`
  );

  fetch("http://localhost:3000/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.sessionToken);
      let token = res.sessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      console.log(err);
    });
}

/* *************************
 *** USER LOGIN ***
 ************************** */
function userLogin() {
  let userEmail = document.getElementById("emailLogin").value;
  let userPass = document.getElementById("pwdLogin").value;
  let userData = { user: { email: userEmail, password: userPass } };
  console.log(`USER DATA ==> ${userData.user.email} ${userData.user.password}`);

  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.sessionToken);
      let token = res.sessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      console.log(err);
    });
}

/* *************************
 *** USER LOGOUT ***
 ************************** */
function userLogout() {
  localStorage.setItem("SessionToken", undefined);
  console.log(`sessionToken ==> ${localStorage.sessionToken}`);
  tokenChecker();
}

/* *************************
 *** TOKEN CHECKER FUNCTION ***
 ************************** */
function tokenChecker() {
  const accessToken = localStorage.getItem("SessionToken");
  let display = document.getElementById("journals");
  let header = document.createElement("h5");
  let text = "Login or signup to get started";

  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }

  if (accessToken === "undefined") {
    display.appendChild(header);
    header.textContent = text;
    header.setAttribute("id", "defaultLogin");
  }
}
tokenChecker();
