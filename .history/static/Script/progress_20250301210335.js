document.addEventListener("DOMContentLoaded", () => {
    const memberInfoButton = document.getElementById("memberInfoButton");
    const usernamePlaceholder = document.getElementById("usernamePlaceholder");

    memberInfoButton.addEventListener("click", () => {
        fetch('/api/users/top5')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    usernamePlaceholder.innerHTML = data.map(user => `<li>${user}</li>`).join('');
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
