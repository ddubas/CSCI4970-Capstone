 async function populateTable(event){
    // event.preventDefault();
    console.log("Running")
    // const username = document.getElementById('username').value;
    let course1Name = document.getElementById("courseID");
    let dataStore
    try {
        console.log("Running")
        const response = await fetch('/user/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {return res.json()})
            .then(data => dataStore = data)

            console.log(dataStore)
            course1Name.innerHTML = dataStore[0].sections;
            return
    } catch (error) {
        console.error('Error:', error);
    }
    };