const error = (e) => console.log(e.target.responseText);

function completed() {
    console.log("Completo");
};

function saveTask() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:3001/api/courses");
    ajaxRequest.setRequestHeader("Content-Type", "application/json");

    const data = {
        'name': document.getElementById('name').value,
        'credits': document.getElementById('credits').value
    };
    const dataTeacher = document.getElementById('teachers').value;

    console.log(document.getElementById('name').value);
    console.log(document.getElementById('credits').value);
    console.log(document.getElementById('teachers').value);

    if (dataTeacher !== "") data[teacher] = dataTeacher;

    ajaxRequest.send(JSON.stringify(data));
}

/**
 * Generates an HTML table with tasks
 */
function renderTasks(tasks) {
    let html = "<table>";
    tasks.forEach(task => {
        html += `<tr><td>${task.title}</td><td><button onclick="get('${task._id}')"> Edit </button> </td></tr>`;
    });
    html += '</table>';

    document.getElementById('tableList').innerHTML = html;
}

/**
 * Generates an HTML table with tasks
 */
function renderTask(task) {
    let html = "<table>";
    html += `<tr><td>${task.title}</td><td><button onclick="get('${task._id}')"> Edit </button> </td></tr>`;
    html += '</table>';

    document.getElementById('tableList').innerHTML = html;
}

/**
 *  Get on or all
 */
function get(id) {
    let url = "http://localhost:3001/api/courses";
    if (id) {
        url = `${url}?id=${id}`;
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const taskResponse = JSON.parse(response.target.responseText);
        if (id) {
            renderTask(taskResponse);
        } else {
            renderTasks(taskResponse);
        }
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}


get();

document.getElementById('saveButton').addEventListener("click", saveTask);