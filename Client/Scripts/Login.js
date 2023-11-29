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
            } else if (response.url.endsWith('/login')){
                alert('User not found or invalid password')
                window.location.href = '/login';
            }
        } else {
            console.log("Response didn't go through");
        }
    } catch (error) {
        console.log('NO')
        console.error('Error:', error);
    }
    });