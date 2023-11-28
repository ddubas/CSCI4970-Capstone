document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('userPassword').value;
    
    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
            console.log("SUCCESS!!");
            if (response.url.endsWith('/Teacher/Assignments')) {
                window.location.href = '/Teacher/Assignments';
            } else if (response.url.endsWith('/Student/Assignments')) {
                window.location.href = '/Student/Assignments';
            }
        } else {
            console.log("Response didn't go through");
        }
    } catch (error) {
        console.error('Error:', error);
    }
    });