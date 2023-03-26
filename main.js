window.addEventListener('load',()=>{
    
    renderAllLocals();
    
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    // const tep = document.querySelector('#new-task-submit');

    form.addEventListener('submit', (e)=>{ // tap on 'add task'
        e.preventDefault();
        controlTask(input.value) //in this function call by entered task
        // console.log(input.value)
        input.value="" //clear input from after add task
    });

});

const controlTask = (txt) => { //txt contains entered task by user
    // console.log(input.value)
    console.log(txt) 
    
    const task = txt; 

    if(!task)  // if task or txt is null and we tap on 'add task'
    { 
        alert("please fill out the task");
        return ;
    }

    const list_el = document.querySelector('#tasks'); 
    // console.log(list_el);// all list of task
    const task_el = document.createElement("div");  //
    task_el.classList.add("task");

    const  task_content_el = document.createElement("div");
    task_content_el.classList.add("content");
    // task_content_el.innerText  = task;

    task_el.appendChild(task_content_el);
    
    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_content_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly","readonly");
    task_input_el.setAttribute('id',`task-${i}-input`);

    task_content_el.appendChild(task_input_el);

    const task_action_el = document.createElement("div");
    task_action_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";
    task_edit_el.setAttribute('id',`task-${i}-edit`);

    // const afterSave_el = 

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";
    task_delete_el.setAttribute('id',`task-${i}-delete`);

    const task_done_el = document.createElement("button");
    task_done_el.classList.add("done");
    task_done_el.innerHTML = "Done";
    task_done_el.setAttribute('id',`task-${i}-done`);
    
    task_action_el.appendChild(task_edit_el);
    task_action_el.appendChild(task_delete_el);
    task_action_el.appendChild(task_done_el);

    task_el.appendChild(task_action_el);

    list_el.appendChild(task_el);

    task_edit_el.addEventListener('click',(e) => {
        if(task_edit_el.innerText.toLocaleLowerCase() == "edit"){ 
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
            task_edit_el.innerHTML = "save";
        }
        else{
            const ids = e.target.id.split('-')[1];

            const txt1 = document.getElementById(`task-${ids}-input`).value;
            window.localStorage.setItem(`task${ids}`,JSON.stringify({text: txt1}));
            // console.log("save");
            task_input_el.setAttribute("readonly","readonly");
            task_edit_el.innerHTML = "Edit";
        }
    })

    task_delete_el.addEventListener('click',(e) => {

        const ids = e.target.id.split('-')[1];
        window.localStorage.removeItem(`task${ids}`);
        task_el.remove();
        
    })
    task_done_el.addEventListener('click',(e)=>{
        task_el.style.background = "green";
        task_input_el.style.color = "black";
        task_delete_el.style.color = "black";
        task_input_el.classList.add('task-done')
        const ids = e.target.id.split('-')[1];
        window.localStorage.removeItem(`task${ids}`);
    });
    window.localStorage.setItem(`task${i}`,JSON.stringify({text: txt}));
    i++;
}

const renderAllLocals = ()=>{
    const allValues = {...window.localStorage}
    i=0;
    let sortedArray = Object.entries(allValues).sort(function(a, b) { return  parseInt(a[0].slice(4),10)>parseInt(b[0].slice(4),10); });
    console.log(sortedArray)
    sortedArray.forEach((ele)=>{
        const text = JSON.parse(ele[1]).text;
        window.localStorage.removeItem(ele[0])
        controlTask(text);
    })
}

let i=0;