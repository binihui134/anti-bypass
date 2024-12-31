const main = document.getElementById('main');

async function validateHash(hash) {
    try {
        const response = await fetch('/check-bypass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash }),
        });

        if (response.redirected) {
            // Redirect the browser if the backend sends a redirect
            window.location.href = response.url;
        } else if (response.ok) {
            const result = await response.json();
            main.innerText = result.message;
        } else {
            const error = await response.json();
            main.innerText = `Error: ${error.message}`;
        }
    } catch (error) {
        main.innerText = `Unexpected error: ${error.message}`;
    }
}
