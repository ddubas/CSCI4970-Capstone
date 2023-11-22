 async function populateTable(event){
    // event.preventDefault();
    console.log("Running")
    // const username = document.getElementById('username').value;
    const course1Name = document.getElementById("courseID").innerHTML;
    
    try {
        const response = await fetch('/user/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course1Name }),
        });
    
        if (response.ok) {
            console.log("SUCCESS!!");
            course1Name = response.body
        } else {
            console.log("Response didn't go through");
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };