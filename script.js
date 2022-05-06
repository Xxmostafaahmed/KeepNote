const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));
// const addBtn = document.getElementById("add");

// const notes = JSON.parse(localStorage.getItem("notes")); for refarance

if(notes){
  notes.forEach((note) =>{
    addNewNote(note);
  });
}
// addBtn.addEventListener("click", () =>{
//     addNewNote(); for html referance
addBtn.addEventListener("click", () =>{
  addNewNote();
});

function addNewNote(text = ""){
  const note = document.createElement("div");
//   text for terget html code 
//   div and note class for inner html 
  note.classList.add("note");
//   inner html
  note.innerHTML = `

    <div class="notes">
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
  
  `;
//   ${text ? ternari operation  

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  


//   const editBtn = note.querySelector(".edit");
//   const deleteBtn = note.querySelector(".delete");

//   const main = note.querySelector(".main");
//   const textArea = note.querySelector("textarea"); for class referance

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", () =>{
    main.classList.toggle("hidden");
    // toggle for rremove and edit 
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () =>{
    note.remove();
    // deleteBtn.addEventListener("click", () =>{
    //     note.remove(); for active delet btn

    updateLocalStorage();
  });

  textArea.addEventListener("input", (e) =>{
    const { value } = e.target;
    main.innerHTML = marked(value);

    updateLocalStorage();
  });

  document.body.appendChild(note);
}

function updateLocalStorage(){
  const notesTxt = document.querySelectorAll("textarea");
  const notes = [];

  notesTxt.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}