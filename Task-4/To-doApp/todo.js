const KEY = 'my_todo_items_v1';
let items = JSON.parse(localStorage.getItem(KEY) || '[]');

const listEl = document.getElementById('list');
const addForm = document.getElementById('addForm');
const titleInput = document.getElementById('title');
const detailsInput = document.getElementById('details');
const prioritySelect = document.getElementById('priority');
const searchInput = document.getElementById('search');
const showDone = document.getElementById('showDone');
const clearAll = document.getElementById('clearAll');

function save(){
  localStorage.setItem(KEY, JSON.stringify(items));
}

function render(){
  listEl.innerHTML = '';
  const q = (searchInput.value||'').toLowerCase();
  items.forEach((it, idx) => {
    if(!showDone.checked && it.done) return;
    if(q && !(`${it.title} ${it.details}`).toLowerCase().includes(q)) return;
    const li = document.createElement('li');
    li.className = 'todo-item';
    const left = document.createElement('div');
    left.className = 'todo-left';
    const title = document.createElement('div');
    title.innerHTML = `<strong class="${it.done ? 'done' : ''}">${escape(it.title)}</strong><div class="meta">${it.priority} • ${new Date(it.created).toLocaleString()}</div><div>${escape(it.details)}</div>`;
    left.appendChild(title);
    const actions = document.createElement('div');
    actions.className = 'todo-actions';
    const doneBtn = document.createElement('button');
    doneBtn.className = 'small-btn';
    doneBtn.textContent = it.done ? 'Undo' : 'Done';
    doneBtn.onclick = () => { items[idx].done = !items[idx].done; save(); render(); };

    const editBtn = document.createElement('button');
    editBtn.className = 'small-btn';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      titleInput.value = it.title;
      detailsInput.value = it.details;
      prioritySelect.value = it.priority || 'normal';
      items.splice(idx,1);
      save();
      render();
    };

    const delBtn = document.createElement('button');
    delBtn.className = 'small-btn';
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => { if(confirm('Delete this item?')){ items.splice(idx,1); save(); render(); }};

    actions.appendChild(doneBtn);
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    li.appendChild(left);
    li.appendChild(actions);
    listEl.appendChild(li);
  });
}

function escape(s) { return s ? s.replaceAll('<','&lt;').replaceAll('>','&gt;') : ''; }

addForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const title = titleInput.value.trim();
  if(!title) return alert('Please add a title');
  items.unshift({title, details: detailsInput.value.trim(), priority: prioritySelect.value, done:false, created: Date.now()});
  titleInput.value=''; detailsInput.value=''; prioritySelect.value='normal';
  save(); render();
});

searchInput?.addEventListener('input', render);
showDone?.addEventListener('change', render);
clearAll?.addEventListener('click', ()=>{
  if(confirm('Clear all tasks?')){ items=[]; save(); render(); }
});

render();
