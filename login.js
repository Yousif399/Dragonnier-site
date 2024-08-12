var loginForm = document.querySelector(".login");
var forgotPassword = document.querySelector(".forget-password");

if (window.location.pathname === "/post-product.html") {
  console.log("i am at the post product ");

  const checkLogIn = async () => {
    const url = "https://dragonnier-site.up.railway.app/handle-product";
    const options = {
      method: "GET",
      credentials: "include",
    };
    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        console.log("it's already 200 do nothing");
        return true;
      } else {
        console.log("Authentication Failed, back to log-in");
        window.location = "access-product.html";
        return false;
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      window.location = "access-product.html";
      return false;
    }
  };
  checkLogIn();
}

// document.addEventListener("DOMContentLoaded", () => {
//   if (window.location.pathname === "/post-product.html") {
//     console.log("I am at the post product ");

//     const checkLogIn = async () => {
//       const url = "http://127.0.0.1:5000/handle-product";
//       const options = {
//         method: "GET",
//         credentials: "include", // Include cookies for session
//       };
//       try {
//         const response = await fetch(url, options);
//         if (response.status === 200) {
//           console.log("User authenticated, proceed to post product.");
//         } else {
//           console.log("Authentication Failed, redirecting to login.");
//           window.location = "access-product.html";
//         }
//       } catch (error) {
//         console.error(`Error: ${error}`);
//       }
//     };

//     checkLogIn();
//   }

//   if (loginForm) {
//     loginForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const formData = new FormData(loginForm);
//       const url = "http://127.0.0.1:5000/login";
//       const options = {
//         method: "POST",
//         body: formData,
//         credentials: "include", // Include cookies for session
//       };

//       try {
//         const response = await fetch(url, options);
//         const data = await response.json();
//         console.log(data);

//         if (response.status === 200) {
//           window.location.href = "post-product.html";
//         } else {
//           console.log("Validation went wrong.", data.Message);
//           alert(`Error: ${data.Message}`);
//         }
//       } catch (error) {
//         console.error("Error happened. Check server.");
//         alert(`Error: ${error}`);
//       }
//     });
//   }
// });

function stopFakeBtnsClick(event) {
  event.preventDefault();
}

if (forgotPassword) {
  forgotPassword.onclick = (e) => {
    e.preventDefault();
  };
}

// if (
//   (authenticated === false &&
//     window.location.pathname === "/post-product.html") ||
//   window.location === "/post-product"
// ) {
//   console.log(authenticated);
//   console.log("this is the page ");
//   // window.location = "access-product.html";
// }

const validateUser = async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const url = `https://dragonnier-site.up.railway.app/login`;

  const options = {
    method: "POST",
   
    body: formData,
    credentials: "include",
  };

  try {
    // console.log(options);

    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
    if (response.status === 200 || response.status === 201) {
      console.log("Navigating to the pos-product page");
      window.location.href = "post-product.html";
    } else {
      console.log("Validation went wrong .", data.Message);
      alert(`Error :${data.Message}`);
    }
  } catch (error) {
    console.error("Error happened check server");
    alert(`Error: ${error}`);
  }
};

const logOutBtn = document.getElementById("Log-out");

const logOutUser = async () => {
  const url = "https://dragonnier-site.up.railway.app/logout";
  const options = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
      console.log("User has been logged out");
      window.location = "index.html";
    } else {
      console.log("Error happened could't log-out");
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    console.log("logging-out");
    logOutUser();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", validateUser);
  loginForm.addEventListener("keydown", logKey);
}

function logKey(e) {
  keyEntered = e.code;
  if (keyEntered === "Enter") console.log(keyEntered);
  loginForm.addEventListener("", validateUser);
}
