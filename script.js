const form = document.querySelector('#ajout_tache');
const input = document.querySelector('#new_tache');
const list = document.querySelector('#list');

let tasks = [];

/* ===== Sauveguarde ===== */
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const data = localStorage.getItem('tasks');
    if(data){
        tasks = JSON.parse(data);
        tasks.forEach(task => createTask(task.text, task.done));
    }
}

/* ===== Création de taches ===== */
function createTask(text, done = false){

    const li = document.createElement('li');
    li.classList.add('taches');
    if(done) li.classList.add('terminee');

    const span = document.createElement('span');
    span.textContent = text;

    const divBtn = document.createElement('div');
    divBtn.classList.add('divbtn');

    const btnDone = document.createElement('button');
    btnDone.textContent = '✅';
    btnDone.classList.add('btn_termi');

    const btnEdit = document.createElement('button');
    btnEdit.textContent = '✏';
    btnEdit.classList.add('btn_edit');

    const btnDelete = document.createElement('button');
    btnDelete.textContent = '❌';
    btnDelete.classList.add('btn_retirer');

    divBtn.append(btnDone, btnEdit, btnDelete);
    li.append(span, divBtn);
    list.appendChild(li);

    /* Terminer */
    btnDone.addEventListener('click', () => {
        li.classList.toggle('terminee');
        const task = tasks.find(t => t.text === span.textContent);
        if(task) task.done = !task.done;
        saveTasks();
    });

    /* Supprimer */
    btnDelete.addEventListener('click', () => {
        tasks = tasks.filter(t => t.text !== span.textContent);
        li.remove();
        saveTasks();
    });

    /* Modifier */
    btnEdit.addEventListener('click', () => editTask(span));
}

/* ===== Modification de taches===== */
function editTask(span){
    const oldText = span.textContent;
    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = oldText;

    span.replaceWith(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener('blur', () => {
        const newText = inputEdit.value.trim();
        if(newText === "") return;

        span.textContent = newText;
        inputEdit.replaceWith(span);

        const task = tasks.find(t => t.text === oldText);
        if(task) task.text = newText;

        saveTasks();
    });
}

/* ===== Ajout de taches ===== */
form.addEventListener('submit', e => {
    e.preventDefault();

    const text = input.value.trim();
    if(text === "") return;

    tasks.push({ text, done: false });
    createTask(text);
    saveTasks();

    input.value = "";
});


loadTasks();
