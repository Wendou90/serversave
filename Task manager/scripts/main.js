var regularIcon = 'fa-regular fa-star';
var solidIcon = 'fa-solid fa-star';
var isImportant = false;

function toggleImportant() {
    console.log('Icon clicked');
    if (!isImportant) {
    $('#iImportant').removeClass(regularIcon).addClass(solidIcon);
    isImportant = true;
    }
    else {
        $('#iImportant').removeClass(solidIcon).addClass(regularIcon);
        isImportant = false;
    }
}
function saveTask() {
    console.log('Saving Task');
   
   
    let title = $('#txtTitle').val();
    let description = $('#txtDescription').val();
    let dueDate = $('#selDueDate').val();
    let color = $('#selColor').val();
    let emoji = $('#selEmoji').val();
    let location = $('#selLocation').val();
    let status = $('#selStatus').val();
    let notification = $('#chkNotification').prop('checked');

    let task = new Task(isImportant, title, dueDate, description, color, emoji, location, status, notification);
    displayTask(task);
    $.ajax({
        type: "post",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res) {
            console.log("server says", res);
        },
        error: function(errorDetails) {
            console.log("Error saving tasks")
        }    
        
    });
}
function displayTask(task) {
    let syntax = 
    `<div class="task">
       <i class="fa regular fa-star"></i>
       <div class="info">
       <h5>${task.title}</h5>
       <p>${task.description}</p>
       </div>
       <label class="location">${task.location}</label>
       <label class="date">${task.dueDate}</label>
       <label class="status">${task.status}</label>
     </div>`;
    $("#pendingTasks").append(syntax);

}


    
    



function init() {
    console.log('Task manager');
    $('#iImportant').click(toggleImportant);
    $('#btnSave').click(saveTask);
        
    }



window.onload = init;
