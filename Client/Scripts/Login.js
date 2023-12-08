
/**
 * When a user submits a form from the login page, this file will take in that request and log in the user if with correct credentials.
 */
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Grabs all elements from the page that needs to be inserted into the DB
    const username = document.getElementById('username').value;
    const password = document.getElementById('userPassword').value;
    
    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Sends the data from the form to req.body
        });
    
        // As long as the response was successful, the user will be either redirected to the Teacher home page or the Student home page
        // Redirection depends if they are a teacher or not.
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