window.onload = function() {
    printTasks();
}
function addNewTask(form){
    try{
        let formdata = new FormData(form);

        let array_task =  getArrayTask();
        if(array_task === undefined || array_task === null) {
            array_task = [];
        }

        let task_obj = {};
        task_obj.status = 0;
        task_obj.name = formdata.get("task");
        array_task.push(task_obj); 

        saveAndPrint(array_task);
        document.getElementById("task").value = "";
    }catch(e){
        alert("Un error happens.");
        console.error(e);
    }
    return false;
}
function printTasks(){
    let array_task =  getArrayTask();
    
    if(array_task !== undefined && array_task !== null) {
        let html = "";
        array_task.forEach(function (task_obj,index){
            let li_task = "";
            if(task_obj.status === 0) {
                li_task = task_obj.name;
                li_task+= '<button type="button" class="btn btn-sm btn-success m-1 p-1" onclick="completeTask('+index+')">Complete</button>';
            }else{
                li_task = "<span class='text-decoration-line-through'>"+task_obj.name+"</span>";  
            }
            html+="<li>"+li_task+"</li>";
        });
        document.getElementById('ul_list_task').innerHTML = html;
    }
}
function getArrayTask(){
    return JSON.parse(localStorage.getItem("array_task"));
}
function completeTask(index){
    var array_task = getArrayTask();
    array_task[index].status = 1;
    saveAndPrint(array_task);
}   
function saveAndPrint(array_task){
    localStorage.setItem("array_task", JSON.stringify(array_task));
    printTasks();
}
function deleteCompleteTask(){
    if(confirm("Are you sure to delete all?")){
        var array_task = getArrayTask();
        var new_array = [];
        array_task.forEach(function( task_obj){
            if(task_obj.status === 0){
                new_array.push(task_obj);
            }
        });
        saveAndPrint(new_array);
    }
}