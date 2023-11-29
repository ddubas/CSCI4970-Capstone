 async function displayCourseName(event){
    let course1Name = document.getElementById("courseName");
    let dataStore
    try {
        const response = await fetch('/user/assignmentsCourse', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {return res.json()})
            .then(data => dataStore = data)

            course1Name.innerHTML = "Course: " + dataStore[0].course;
            return
    } catch (error) {
        console.error('Error:', error);
    }
    };

async function displayAssignments(event){
    let temp = [document.getElementById("assignment1"), document.getElementById("assignment2"), document.getElementById("assignment3")]
    try {
        const response = await fetch('/user/assignments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {return res.json()})
            .then(data => dataStore = data)

            for(let i = 0; dataStore[0].assignmentid.length > i; i++){
                // document.getElementById("assignment" + i).innerHTML = "Assignment: " + i
                temp[i].innerHTML = "Assignment: " + dataStore[0].assignmentid[i]
            }
            // console.log(dataStore)
            return
    } catch (error) {
        console.error('Error:', error);
    }
    };

    async function displayDescription(event){
        let temp = [document.getElementById("desc1"), document.getElementById("desc2"), document.getElementById("desc3")]
        let dataStore
        try {
            const response = await fetch('/user/assignmentsDesc', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {return res.json()})
                .then(data => dataStore = data)
    

                for(let h = 0; dataStore.length > h; h++){
                    // document.getElementById("assignment" + i).innerHTML = "Assignment: " + i
                    temp[0].innerHTML = dataStore[0].description
                }
                return
        } catch (error) {
            console.error('Error:', error);
        }
        };