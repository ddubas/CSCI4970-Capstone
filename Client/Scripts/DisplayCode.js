document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('userPassword').value;
    
    try {
        const response = await fetch('/user/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
    
        if (response.ok) {
            console.log("SUCCESS!!");
        } else {
            console.log("Response didn't go through");
        }
    } catch (error) {
        console.error('Error:', error);
    }
    });