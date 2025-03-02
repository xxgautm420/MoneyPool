document.addEventListener("DOMContentLoaded", () => {
    const memberInfoButton = document.getElementById("memberInfoButton");
    const usernamePlaceholder = document.getElementById("usernamePlaceholder");
    const randomSelectButton = document.getElementById("randomSelectButton");
    const selectedMemberPlaceholder = document.getElementById("selectedMemberPlaceholder");
    const actionButtonContainer = document.getElementById("actionButtonContainer");

    let usernames = [];
    let selectedUsernames = new Set();

    // Assume this is the logged-in user's username
    const loggedInUsername = 'user5'; // Replace with dynamic username if available

    // Fetch and display top 5 users
    memberInfoButton.addEventListener("click", () => {
        fetch('/api/users/top5')
            .then(response => response.json())
            .then(data => {
                usernames = data;
                usernamePlaceholder.innerHTML = usernames
                    .map(user => `<div class="username-item">${user}</div>`)
                    .join('');
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                usernamePlaceholder.innerHTML = 'An error occurred';
            });
    });

    // Randomly select and display a member
    randomSelectButton.addEventListener("click", () => {
        if (selectedUsernames.size >= usernames.length) {
            selectedMemberPlaceholder.innerHTML = 'All members have been selected.';
            actionButtonContainer.innerHTML = ''; // Clear action buttons
            return;
        }

        let remainingUsers = usernames.filter(user => !selectedUsernames.has(user));
        let randomIndex = Math.floor(Math.random() * remainingUsers.length);
        let selectedUser = remainingUsers[randomIndex];

        selectedUsernames.add(selectedUser);

        selectedMemberPlaceholder.innerHTML = `Selected Member: ${selectedUser}`;

        // Update action buttons based on selected user
        updateActionButtons(selectedUser);

        // Continue selecting after 5 seconds
        setTimeout(() => {
            randomSelectButton.click();
        }, 5000);
    });

    // Function to update action buttons
    function updateActionButtons(selectedUser) {
        actionButtonContainer.innerHTML = ''; // Clear previous buttons

        let button = document.createElement('button');
        button.className = 'btn';

        if (selectedUser === loggedInUsername) {
            // If the selected user is the logged-in user, show "Withdraw" button
            button.textContent = 'Withdraw';
            button.classList.add('btn-warning');
            button.addEventListener('click', () => {
                // Implement withdraw functionality here
                alert('Withdraw action triggered.');
            });
        } else {
            // If the selected user is someone else, show "Pay" button
            button.textContent = 'Pay';
            button.classList.add('btn-success');
            button.addEventListener('click', () => {
                // Implement pay functionality here
                alert('Pay action triggered.');
            });
        }

        actionButtonContainer.appendChild(button);
    }
});
