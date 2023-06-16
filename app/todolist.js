let tasks = [];
const taskList = document.getElementById('taskList');

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task !== '') {
        if (task.length <= 28) {
            tasks.push({text: task, completed: false});
            taskInput.value = '';
            renderTaskList();
        } else {
            alert('Please enter a task with a maximum of 28 characters.');
        }
    } else {
        alert('Please write something.');
    }

    saveDataToLocalStorage();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
    saveDataToLocalStorage();
}

function editTask(index) {
    const listItem = document.getElementById(`taskItem-${index}`);
    const taskText = listItem.querySelector('.task-text');
    const editButton = listItem.querySelector('.edit-button');
    const cancelButton = listItem.querySelector('.cancel-button');
    const saveButton = listItem.querySelector('.save-button');

    taskText.style.display = 'none';
    editButton.style.display = 'none';
    cancelButton.style.display = 'inline';
    saveButton.style.display = 'inline';

    const inputField = document.createElement('input');
    inputField.value = tasks[index].text;
    inputField.classList.add('task-input');
    listItem.insertBefore(inputField, taskText);

    cancelButton.onclick = () => cancelEditTask(index);
    saveButton.onclick = () => saveTask(index, inputField);
    listItem.onclick = null;

    const finishButton = document.querySelector('.finish-button');
    finishButton.style.display = 'none';
}

function cancelEditTask(index) {
    const listItem = document.getElementById(`taskItem-${index}`);
    const taskText = listItem.querySelector('.task-text');
    const editButton = listItem.querySelector('.edit-button');
    const cancelButton = listItem.querySelector('.cancel-button');
    const saveButton = listItem.querySelector('.save-button');
    const inputField = listItem.querySelector('.task-input');
    const finishButton = document.querySelector('.finish-button');
    finishButton.style.display = 'inline';

    taskText.style.display = 'inline';
    editButton.style.display = 'inline';
    cancelButton.style.display = 'none';
    saveButton.style.display = 'none';

    inputField.remove();
    saveDataToLocalStorage();
}

function saveTask(index, inputField) {
    const newTask = inputField.value.trim();

    if (newTask !== '') {
        tasks[index].text = newTask;
        renderTaskList();
    }

    saveDataToLocalStorage();
}

function toggleTaskAll(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTaskList();
    saveDataToLocalStorage();
}

function renderTaskList() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', `taskItem-${index}`);

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        listItem.appendChild(taskText);

        const finishButton = createButton(
            'finish',
            'Finish',
            'finish-button',
            () => toggleTaskAll(index));
        listItem.appendChild(finishButton);

        const editButton = createButton(
            'edit',
            'Edit',
            'edit-button',
            () => editTask(index));
        listItem.appendChild(editButton);

        const saveButton = createButton(
            'save',
            'Save',
            'save-button',
            null);
        saveButton.style.display = 'none';
        listItem.appendChild(saveButton);

        const cancelButton = createButton(
            'cancel',
            'Cancel',
            'cancel-button',
            null);
        cancelButton.style.display = 'none';
        listItem.appendChild(cancelButton);

        const deleteButton = createButton(
            'delete',
            'Delete',
            'delete-button',
            () => deleteTask(index));
        listItem.appendChild(deleteButton);

        if (task.completed) {
            listItem.classList.add('completed');
            taskList.appendChild(listItem);
        } else {
            taskList.prepend(listItem);
        }
    });

    saveDataToLocalStorage();
}

function createButton(altText, buttonText, className, onClickHandler) {
    const button = document.createElement('button');
    const buttonIcon = document.createElement('img');
    buttonIcon.src = `assets/icons/${altText}.svg`;
    buttonIcon.alt = altText;
    button.appendChild(buttonIcon);
    button.classList.add(className);
    if (onClickHandler) {
        button.onclick = onClickHandler;
    }
    return button;
}

function saveDataToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTaskFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
        tasks = savedTasks;
        renderTaskList();
    }
}

showTaskFromLocalStorage()
