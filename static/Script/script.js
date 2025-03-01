document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");
    const loginFormContainer = document.getElementById("loginFormContainer");
    const closeLogin = document.getElementById("closeLogin");
    const loginSubmit = document.getElementById("loginSubmit");
    const slots = document.querySelectorAll(".slot");

    let isSignedIn = false;

    // Show Login Form on Sign In Button Click
    signInButton.addEventListener("click", () => {
        if (!isSignedIn) {
            loginFormContainer.style.display = "flex";
        } else {
            // Sign Out Logic
            alert("You have signed out.");
            signInButton.textContent = "Sign In";
            signInButton.classList.replace("btn-danger", "btn-primary");
            isSignedIn = false;
        }
    });

    // Close Login Form
    closeLogin.addEventListener("click", () => {
        loginFormContainer.style.display = "none";
    });

    // Handle Login Submit
    loginSubmit.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (username && password) {
            // Send the data to the backend using Fetch API
            fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Welcome, ${username}!`);
                    loginFormContainer.style.display = "none";
                    signInButton.textContent = "Sign Out";
                    signInButton.classList.replace("btn-primary", "btn-danger");
                    isSignedIn = true; // Update sign-in status
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while logging in. Please try again.');
            });
        } else {
            alert("Please enter username and password.");
        }
    });

    // Make slots clickable
    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            if (isSignedIn) {
                alert(`You selected: ${slot.textContent}`);
            } else {
                alert("Please sign in to select a money pool.");
            }
        });
    });
});


  document.getElementById('loginSubmit').addEventListener('click', function() {
    // Placeholder for getting slot info
    // You can replace this with your actual slot info retrieval logic
    //let slotInfo = 'Slot info goes here';
    console.log(slotInfo);
  });


  slots
  .addEventListener("click", () => {
    if (!isSignedIn) {
        loginFormContainer.style.display = "flex";
    } else {
        // Sign Out Logic
        alert("You have signed out.");
        signInButton.textContent = "Sign In";
        signInButton.classList.replace("btn-danger", "btn-primary");
        isSignedIn = false;
    }
});