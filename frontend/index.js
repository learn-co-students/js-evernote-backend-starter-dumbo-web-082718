document.addEventListener("DOMContentLoaded",() => {
  const noteList = document.querySelector('#note-list')
  const noteMainPage = document.querySelector('#main')
  getUser()
  createNote()
  function getUser(){
    fetch("http://localhost:3000/api/v1/users")
    .then(res => res.json())
    .then(users => users.forEach(showUser))
  }

  function showUser(user){
    const user_id = document.querySelector("#user-id")
    user_id.innerText=`${user.name}`
    user.notes.forEach(listNote)
    }

    function listNote(note){
      const li = document.createElement('li')
      li.id = `note-${note.id}`
      const button = document.createElement('button')
      button.dataset.id = note.id
      button.innerText = note.title
      button.addEventListener('click', (e) => showNote(e, note))
      li.append(button)
      noteList.append(li)
    }

    function editNote(e, noteId) {
      e.preventDefault()
      const title = e.target.title.value
      const body = e.target.body.value
      const options = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: title,
        body: body,
        user_id: 1
      })
      }

      fetch(`http://localhost:3000/api/v1/notes/${noteId}`, options)
        // try and render the note that was created
      }

    function deleteNote(e, noteId) {
      const options = {
        method: "DELETE"
      }
      fetch(`http://localhost:3000/api/v1/notes/${noteId}`, options)
      noteMainPage.innerHTML = ''
      document.querySelector(`#note-${noteId}`).remove()
    }


    function showNote(e, note) {

      noteMainPage.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button id='edit-note'>Edit</button>
      <br>
      <button id='delete-note'>Delete</button>
      `
      const editButton = document.querySelector('#edit-note')
      editButton.addEventListener('click', (e) => showForm(e, note.title, note.body, note))
      const deleteButton = document.querySelector('#delete-note')
      deleteButton.addEventListener('click', (e) => deleteNote(e, note.id))
    }
    function createNote(){
      const newNote = document.querySelector("#new-note")
      console.log(newNote)
      newNote.addEventListener("click", (event) => showForm(event, "", "", ""))

    }

    function postNote(event){
      event.preventDefault()
    const title = event.target.title.value
    const body = event.target.body.value
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: title,
        body: body,
        user_id: 1
      })
      }
    fetch("http://localhost:3000/api/v1/notes", options)
      .then(res => res.json())
      .then(listNote)
        // try and render the note that was created
    }

    function showForm(event, title, body, note){

      const form = document.createElement("FORM")

      form.innerHTML = `
      <h3>Create a Note</h3>
       <label name = "title"> Title:</label>
       <input name = "title" value='${title}'></input>
       <br>
       <label name = "body">Body:</label>
       <input name = "body" value='${body}'></input>
        <br>
       <button type ="submit">Submit Post </button>

       `
       noteMainPage.innerHTML = ""
       //condition for if new or edit
     if (body === ''){
       form.addEventListener("submit", postNote)
     }else {
       form.addEventListener("submit", (e) => editNote(e, note.id))
      }
      noteMainPage.append(form)
    }


})
