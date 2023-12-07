document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    
    let isTeacher = document.querySelector('input[name="isTeacher"]:checked');
    let boolIsTeacher = (isTeacher.value === 'yes');

    if(password === passwordConfirm) { // If password and passwordConfirm match, then continue to do a post request
        try {
            const response = await fetch('/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, boolIsTeacher, email }),
            });
        
            if (response.ok) {
                console.log("SUCCESS!!");
                if (response.url.endsWith('/Teacher/Home')) {
                    window.location.href = '/Teacher/Home';
                } else if (response.url.endsWith('/Student/Home')) {
                    window.location.href = '/Student/Home';
                }
            } else {
                console.log("Response didn't go through");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else { window.location.href = '/'} // Return to register page if the password and passwordConfirm don't match. Only a temporary solution...
});