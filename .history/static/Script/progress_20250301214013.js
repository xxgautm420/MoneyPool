document.addEventListener("DOMContentLoaded", () => {
    const memberInfoButton = document.getElementById("memberInfoButton");
    const usernamePlaceholder = document.getElementById("usernamePlaceholder");

    memberInfoButton.addEventListener("click", () => {
        fetch('/api/users/top5')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    usernamePlaceholder.innerHTML = data.map(user => `<div class="username-item">${user}</div>`).join('');
                } else {
                    usernamePlaceholder.innerHTML = 'No users found';
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                usernamePlaceholder.innerHTML = 'An error occurred';
            });
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
