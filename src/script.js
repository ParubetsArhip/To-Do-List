import './style.scss'

const form = document.getElementById('todo-form')
const toDoList = document.getElementById('todo-list')

const inputName = document.getElementById('inputName')
const inputPriority = document.getElementById('inputPriority')
const inputDescription = document.getElementById('inputDescription')
const inputDate = document.getElementById('inputDate')
const btnAddNote = document.getElementById('btnAddNote')

let counterNote = 0
let currentEditId = null

function validateInputs() {
    const name = inputName.value.trim()
    const priority = inputPriority.value.trim()
    const data = inputDate.value.trim()

    btnAddNote.disabled = !name || !priority || !data
}

inputName.addEventListener('input', validateInputs)
inputPriority.addEventListener('change', validateInputs)
inputDescription.addEventListener('input', validateInputs)
inputDate.addEventListener('change', validateInputs)

function createNoteElement(id, title, priority, description, datetime) {
    const newNote = document.createElement('div')
    newNote.classList.add('new-note')
    newNote.dataset.id = id
    newNote.innerHTML = `
        <p class="to-do">№${id}:</p>
        <p><span class="to-do">Name: </span>${title}</p>
        <p><span class="to-do">Priority:</span> ${priority}</p>
        <p><span class="to-do">Description: </span>${description}</p>
        <p><span class="to-do">Date: </span>${datetime}</p>
        <div class="note-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `

    newNote.querySelector('.delete-btn').addEventListener('click', () => {
        toDoList.removeChild(newNote)
    })

    newNote.querySelector('.edit-btn').addEventListener('click', () => {
        currentEditId = id

        inputName.value = title
        inputPriority.value = priority
        inputDescription.value = description
        inputDate.value = datetime

        btnAddNote.textContent = 'Update'
        validateInputs()
    })

    return newNote
}

form.addEventListener('submit', e => {
    e.preventDefault()

    const getInputName = inputName.value.trim()
    const getInputPriority = inputPriority.value.trim()
    const getInputDescription = inputDescription.value.trim()
    const getInputDate = inputDate.value.trim()

    if (!getInputName || !getInputPriority || !getInputDate) return

    if (currentEditId) {
        const noteToEdit = toDoList.querySelector(`[data-id="${currentEditId}"]`)
        if (noteToEdit) {
            noteToEdit.querySelector('p:nth-child(2)').innerHTML = `<span class="to-do">Назва: </span>${getInputName}`
            noteToEdit.querySelector('p:nth-child(3)').innerHTML = `<span class="to-do">Пріоритет:</span> ${getInputPriority}`
            noteToEdit.querySelector('p:nth-child(4)').innerHTML = `<span class="to-do">Опис: </span>${getInputDescription}`
            noteToEdit.querySelector('p:nth-child(5)').innerHTML = `<span class="to-do">Дата: </span>${getInputDate}`

            currentEditId = null
            btnAddNote.textContent = 'Add'
        }
    } else {
        const newNote = createNoteElement(++counterNote, getInputName, getInputPriority, getInputDescription, getInputDate)
        toDoList.appendChild(newNote)
    }

    inputName.value = ''
    inputPriority.value = ''
    inputDescription.value = ''
    inputDate.value = ''

    validateInputs()
})

validateInputs()
