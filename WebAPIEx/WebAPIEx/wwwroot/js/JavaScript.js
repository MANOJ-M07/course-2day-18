//document.addEventListener("DOMContentLoaded", () => {
//    const taskList = document.getElementById("taskList");
//    const createTaskForm = document.getElementById("createTaskForm");
//    const updateTaskForm = document.getElementById("updateTaskForm");
//    const deleteTaskForm = document.getElementById("deleteTaskForm");

//    //Function to fetch and display tasks
//    function displayTasks() {
//        fetch("https://localhost:7111/api/tasks")
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('HTTP error! Status: ${response.status}');
//                }
//                return response.json();
//            })
//            .then(tasks => {
//                taskList.innerHTML = ""; //clear previous list
//                tasks.forEach(task => {
//                    const listItem = document.createElement("li");
//                    listItem.textContent = `ID: ${task.id},Title: ${task.title}, Description: ${task.description}, Due Date: ${task.dueDate}`;
//                    taskList.appendChild(listItem);
//                });
//            })
//            .catch(error => {
//                console.error("Fetch error:", error);
//                taskList.innerHTML = "Error fetching tasks.";
//            });
//    }




//    //event listener for create Task from submission
//    createTaskForm.addEventListener("submit", (e) => {
//        e.preventDefault();
//        const title = document.getElementById("title").value;
//        const description = document.getElementById("description").value;
//        const dueDate = document.getElementById("dueDate").value;

//        fetch("https://localhost:7111/api/tasks", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json"
//            },
//            body: JSON.stringify({ title, description, dueDate })
//        })
//            .then(response => {
//                if (response.ok) {
//                    throw new Error(`HTTP error! Status: ${response.status}`);
//                }
//                return response.json();
//            })
//            .then(() => {
//                // Clear form fields after successful creation 
//                document.getElementById("title").value = "";
//                document.getElementById("description").value = "";
//                document.getElementById("dueDate").value = "";
//                // Refresh the task list 
//                displayTasks();
//            })
//            .catch(error => {
//                console.error("Fetch error:", error);
//            });

//    });

//    //Initial display of tasks when the page loads
//    displayTasks();
//});
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const createTaskForm = document.getElementById("createTaskForm");
    const updateTaskForm = document.getElementById("updateTaskForm");
    const deleteTaskForm = document.getElementById("deleteTaskForm");

    //Function to fetch and display tasks
    function displayTasks() {
        fetch("https://localhost:7111/api/tasks")
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! Status: ${response.status}');
                }
                return response.json();
            })
            .then(tasks => {
                taskList.innerHTML = ""; //clear previous list
                tasks.forEach(task => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID ${task.id},Title: ${task.title}, Description: ${task.description}, Due Date: ${task.dueDate}`;
                    taskList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
                taskList.innerHTML = "Error fetching tasks.";
            });
    }

    //Event listener for Create Task form submission
    createTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;
        fetch("https://localhost:7111/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, dueDate })
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("dueDate").value = "";

                displayTasks();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });

    updateTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskId = document.getElementById("taskId").value;
        const newTitle = document.getElementById("newTitle").value;
        
        fetch( `https://localhost:7111/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: newTitle })
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("taskId").value = "";
                document.getElementById("newTitle").value = "";                            
                displayTasks();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });


    deleteTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const deleteTaskId = document.getElementById("deleteTaskId").value;
        fetch(`https://localhost:7111/api/tasks$/{deleteTaskId}`, {
            method: "DELETE"
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("deleteTaskId").value = "";
                displayTasks();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });


    //Initial display of tasks when the page loads
    displayTasks();
});
