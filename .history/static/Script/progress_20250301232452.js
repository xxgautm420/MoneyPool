document.addEventListener("DOMContentLoaded", () => {
    const memberInfoButton = document.getElementById("memberInfoButton");
    const usernamePlaceholder = document.getElementById("usernamePlaceholder");
    const randomSelectButton = document.getElementById("randomSelectButton");
    const selectedMemberPlaceholder = document.getElementById("selectedMemberPlaceholder");

    let usernames = [];
    let selectedUsernames = new Set();

    // Fetch and display top 5 users
    memberInfoButton.addEventListener("click", () => {
        fetch('/api/users/top5')
            .then(response => response.json())
            .then(data => {
                usernames = data;
                usernamePlaceholder.innerHTML = usernames.map(user => `<div class="username-item">${user}</div>`).join('');
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
            return;
        }

        let remainingUsers = usernames.filter(user => !selectedUsernames.has(user));
        let randomIndex = Math.floor(Math.random() * remainingUsers.length);
        let selectedUser = remainingUsers[randomIndex];

        selectedUsernames.add(selectedUser);

        selectedMemberPlaceholder.innerHTML = `Selected Member: ${selectedUser}`;

        setTimeout(() => {
            randomSelectButton.click();
        }, 5000);
    });
});
