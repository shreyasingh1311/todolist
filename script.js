let tasks = [];

document.addEventListener('DOMContentLoaded', function() {
    const taskIn = document.getElementById('taskIn');
    const addbtn = document.getElementById('addbtn');

    addbtn.addEventListener('click', function() {
        adder(taskIn.value.trim());
        taskIn.value = '';
    });

    load();
    display();
});



function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function load() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

function adder(taskcontent) {
    if (taskcontent === '') return;

    const task = {
        id: Date.now(),
        text: taskcontent,
        completed: false,
        createdDate: new Date().toISOString()
    };

    tasks.push(task);
    save();
    display();
}

function completed(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        save();
        display();
    }
}

function remover(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    save();
    display();
}

function display() {
    const taskList = document.getElementById('taskList');
    const completedTasks = document.getElementById('completedTasks');
    taskList.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        const taskcontent = document.createElement('span');
        taskcontent.textContent = task.text;
        taskElement.appendChild(taskcontent);

        const timestamp = document.createElement('span');
        timestamp.textContent = dateandtime(new Date(task.createdDate));
        timestamp.classList.add('timestamp');
        taskElement.appendChild(timestamp);

        if (task.completed) {
            taskElement.classList.add('completed');
            completedTasks.appendChild(taskElement);
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => remover(task.id));
            taskElement.appendChild(removeButton);
        } else {
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => completed(task.id));
            taskElement.appendChild(completeButton);

           

            taskList.appendChild(taskElement);
        }
    });
}

function dateandtime(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
