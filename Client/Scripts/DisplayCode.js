    
//Assignment Page 
    //Collects and chages the name of the course according to the course the user is assigned to in the database
    async function displayCourseName(event){
        let course1Name = document.getElementById("courseName");
        let dataStore
        try {
            //Fetch statement to recieve the info from the database
            const response = await fetch('/user/assignmentsCourse', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {return res.json()})
                .then(data => dataStore = data)
                //Chages the html title element
                course1Name.innerHTML = "Course: " + dataStore[0].course;
                return
        } catch (error) {
            console.error('Error:', error);
        }
        };


    //Collects all the Assignments from the given course in the database
    async function displayAssignments(event){
        try {
            //A fetch statement that collects the name of the assignments in the database
            let response = await fetch('/user/assignments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {return res.json()})
                .then(data => assignmentTitle = data)

                //A fetch statement that collects the description of each of the assignments
                response = await fetch('/user/assignmentsDesc', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                })
                    .then(res => {return res.json()})
                    .then(data => dataStore = data)

                //Populates the list with the amount of assignments found in the database
                for(let i = 0; assignmentTitle[0].assignmentid.length > i; i++){
                    if(i >= dataStore.length)  
                        addAssignmentBox(i + 1, assignmentTitle[0].assignmentid[i], 'Assignment ' +(i+1))
                    else
                        addAssignmentBox(i + 1, assignmentTitle[0].assignmentid[i], dataStore[i].description)
                    }
                
                return
        } catch (error) {
            console.error('Error:', error);
        }
        };


        async function displayAnnouncements(event){
            try {
                //A fetch statement that collects the name of the announcement in the database
                let response = await fetch('/user/announcement', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => {return res.json()})
                    .then(data => announcementInfo = data)
    
                    //Populates the list with the amount of announcements found in the database
                    for(let i = 0; announcementInfo[1].announcements.length > i; i++){
                        let annName = ''
                        for(let j = 0;  (announcementInfo[1].announcements[i].length < j) || (j<=10); j++){
                            annName = annName + announcementInfo[1].announcements[i][j]
                            if(j == 10)
                                annName = annName + "..." 
                        }
                        //Calls the function to make a container for the announcements
                        addAnnouncementBox(i,annName,announcementInfo[1].announcements[i])
                    }
                    
                    return
            } catch (error) {
                console.error('Error:', error);
            }
            };



        //Function that creates an HTML Element to hold the assignment information
        function addAssignmentBox(i, assignmentName, assignmentDesc){
            document.getElementById("accordion")
                        .innerHTML +=
                        "<div class='card'> <div class='card-header' id='heading" + i + "'> <h5 class='mb-0'> <button class='btn btn-link' data-toggle='collapse' data-target='#collapse"+i+"' aria-expanded='false' aria-controls='collapse"+i+"'> <p id='assignment" + i +"' class='textCenter'>"+ assignmentName+"</p> </button> </h5></div> <div id='collapse"+i+"' class='collapse show' aria-labelledby='heading"+i+"' data-parent='#accordion'> <div class='card-body'> <p id='desc"+i+"'>"+assignmentDesc+"</p> <a href='' class='btn btn-primary'>Start Assignment</a> </div> </div></div>";
        }


        //Function that creates an HTML Element to hold the announcement information
        function addAnnouncementBox(i, annName, announcement){
            document.getElementById("accordion").
                        innerHTML +=                         
                        "<div class='card'> <div class='card-header' id='heading" + i + "'> <h5 class='mb-0'> <button class='btn btn-link' data-toggle='collapse' data-target='#collapse"+i+"' aria-expanded='false' aria-controls='collapse"+i+"'> <p id='assignment" + i +"' class='textCenter'>"+ annName+"</p> </button> </h5></div> <div id='collapse"+i+"' class='collapse show' aria-labelledby='heading"+i+"' data-parent='#accordion'> <div class='card-body'> <p id='desc"+i+"'>"+announcement+"</p> <a href='' type='button' class='btn btn-danger'>Delete</a> </div> </div></div>";
        }