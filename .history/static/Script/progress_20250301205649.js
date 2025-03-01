document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/users/top5')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById("userList");
            userList.innerHTML = data.map(user => `<li>${user}</li>`).join('');
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});
