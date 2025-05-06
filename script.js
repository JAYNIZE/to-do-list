function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.textContent.replace(/ \(⏳.*minutes\)/, ""), time: li.dataset.time });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach(task => {
        addTask(task.text, task.time, false);
    });
}

function addTask(taskText, timeLeft, save = true) {
    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = `${taskText} (⏳ ${timeLeft}minutes)`;
    li.dataset.time = timeLeft;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => {
        clearInterval(countdown);
        li.remove();
        saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    let countdown = setInterval(() => {
        timeLeft--;
        li.textContent = `${taskText} (⏳ ${timeLeft}minutes)`;
        li.dataset.time = timeLeft;
        li.appendChild(removeBtn);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            li.remove();
            saveTasks();
        }
    }, 1000);

    if (save) saveTasks();
}

// Load tasks on page load
window.onload = loadTasks;