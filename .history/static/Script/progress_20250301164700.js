function fetchUsername(userId) {
    fetch(`/api/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('usernamePlaceholder').innerText = data.username;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}