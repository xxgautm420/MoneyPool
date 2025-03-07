document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");
    const loginFormContainer = document.getElementById("loginFormContainer");
    const closeLogin = document.getElementById("closeLogin");
    const loginSubmit = document.getElementById("loginSubmit");
    const slots = document.querySelectorAll(".slot");
    const joinPoolForm = document.getElementById("joinPoolForm");
    const closeJoinPool = document.getElementById("closeJoinPool");
    
    let isSignedIn = false;

    signInButton.addEventListener("click", () => {
        if (!isSignedIn) {
            loginFormContainer.style.display = "flex";
        } else {
            alert("You have signed out.");
            signInButton.textContent = "Sign In";
            signInButton.classList.replace("btn-danger", "btn-primary");
            isSignedIn = false;
        }
    });

    closeLogin.addEventListener("click", () => {
        loginFormContainer.style.display = "none";
    });

    loginSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (username && password) {
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
                    isSignedIn = true;
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

   .Sign-button {
    background-color: #007bff; /* Primary color */
    color: white; /* Text color */
    border: none; /* No border */
    padding: 10px 20px; /* Padding inside button */
    border-radius: 5px; /* Rounded corners */
    font-size: 16px; /* Font size */
    cursor: pointer; /* Pointer cursor on hover */
    margin-right: 10px; /* Space between buttons */
}

/* Additional hover effects for the buttons */
.Sign-button:hover {
    background-color: #0056b3; /* Darker shade on hover */
    transition: background-color 0.3s; /* Smooth transition */
}


    // Show Join Pool Form on Slot Click
    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            if (isSignedIn) {
                joinPoolForm.style.display = "flex";
            } else {
                alert("Please sign in to select a money pool.");
            }
        });
    });

    // Close Join Pool Form
    closeJoinPool.addEventListener("click", () => {
        joinPoolForm.style.display = "none";
    });
});




//about form 
document.addEventListener("DOMContentLoaded", function() {
    const aboutLink = document.getElementById("aboutLink");
    const aboutFormContainer = document.getElementById("aboutFormContainer");
    const closeAboutForm = document.getElementById("closeAbout");


    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();
        aboutFormContainer.style.display = "block";
    });

    closeAboutForm.addEventListener("click", () => {
        aboutFormContainer.style.display = "none";
    });


});

//contact form
document.addEventListener("DOMContentLoaded", function() {
    const contactLink = document.getElementById("contactLink");
    const contactFormContainer = document.getElementById("contactFormContainer");
    const closeContactForm = document.getElementById("closeContact");


    contactLink.addEventListener("click", function(event) {
        event.preventDefault();
        contactFormContainer.style.display = "block";
    });

    closeContactForm.addEventListener("click", () => {
        contactFormContainer.style.display = "none";
    });


});
