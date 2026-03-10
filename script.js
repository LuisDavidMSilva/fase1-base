document.getElementById("addTaskButton").addEventListener("click", function () {
    let taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        let taskList = document.getElementById("taskList");
        let listItem = document.createElement("li");
        let excludeItem = document.createElement("button");
        excludeItem.textContent = "Excluir";
        excludeItem.addEventListener("click", function () {
            taskList.removeChild(listItem);
        });
        listItem.textContent = taskText;
        taskList.appendChild(listItem);
        excludeItem.style.marginLeft = "10px";
        listItem.appendChild(excludeItem);
        taskInput.value = "";
    }
});