document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('shortenForm');
    const urlInput = document.getElementById('urlInput');
    const resultDisplay = document.getElementById('resultDisplay');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const longUrl = urlInput.value;
        fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')  // Assuming the user is authenticated and the token is stored
            },
            body: JSON.stringify({ longUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.shortUrl) {
                resultDisplay.textContent = `Short URL: ${data.shortUrl}`;
                resultDisplay.style.color = 'green';
            } else {
                resultDisplay.textContent = 'Error: ' + data.message;
                resultDisplay.style.color = 'red';
            }
        })
        .catch(error => {
            resultDisplay.textContent = 'Error: ' + error.message;
            resultDisplay.style.color = 'red';
        });
    });
});
