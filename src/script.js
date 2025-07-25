import './style.scss'

import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css"

const form = document.getElementById('todo-form')
const toDoList = document.getElementById('todo-list')
const searchInput = document.getElementById('search')

const inputName = document.getElementById('inputName')
const inputPriority = document.getElementById('inputPriority')
const inputDescription = document.getElementById('inputDescription')
const inputDate = document.getElementById('inputDate')
const btnAddNote = document.getElementById('btnAddNote')

const modal = document.getElementById('modal')
const editTitle = document.getElementById('edit-title')
const editDescription = document.getElementById('edit-description')
const editDate = document.getElementById('edit-date')
const submitEdit = document.getElementById('submitEdit')
const closeModal = document.getElementById('closeModal')

let notes = []
let currentEditId = null

function validateInputs() {
    const name = inputName.value.trim()
    const priority = inputPriority.value.trim()
    const date = inputDate.value.trim()
    btnAddNote.disabled = !name || !priority || !date
}

function openModal(note) {
    modal.classList.remove('hidden')
    modal.classList.add('visible')
    editTitle.value = note.title
    editDescription.value = note.description
    editDate.value = note.datetime
    currentEditId = note.id
}

function closeModalWindow() {
    modal.classList.add('hidden')
    modal.classList.remove('visible')
    currentEditId = null
}

function renderNotes(filter = '') {
    toDoList.innerHTML = '<h2>To-do list</h2>'
    notes
        .filter(note =>
            note.title.toLowerCase().includes(filter.toLowerCase()) ||
            note.description.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach(note => {
            const div = document.createElement('div')
            div.className = 'todo-item fade-in'
            div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.description}</p>
        <p class="meta">Priority: ${note.priority} | Date: ${note.datetime}</p>
        <div class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `

            div.querySelector('.delete-btn').addEventListener('click', () => {
                notes = notes.filter(n => n.id !== note.id)
                renderNotes(searchInput.value)
            })

            div.querySelector('.edit-btn').addEventListener('click', () => {
                openModal(note)
            })

            toDoList.appendChild(div)
        })
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const title = inputName.value.trim()
    const priority = inputPriority.value.trim()
    const description = inputDescription.value.trim()
    const datetime = inputDate.value.trim()
    if (!title || !priority || !datetime) return

    notes.push({
        id: Date.now(),
        title,
        priority,
        description,
        datetime
    })

    inputName.value = ''
    inputPriority.value = ''
    inputDescription.value = ''
    inputDate.value = ''
    btnAddNote.disabled = true
    renderNotes(searchInput.value)
})

submitEdit.addEventListener('click', () => {
    const newTitle = editTitle.value.trim()
    const newDesc = editDescription.value.trim()
    const newDate = editDate.value.trim()

    if (!newTitle || !newDate) return

    notes = notes.map(note => {
        if (note.id === currentEditId) {
            return {
                ...note,
                title: newTitle,
                description: newDesc,
                datetime: newDate
            }
        }
        return note
    })
    closeModalWindow()
    renderNotes(searchInput.value)
})

closeModal.addEventListener('click', closeModalWindow)

searchInput.addEventListener('input', () => {
    renderNotes(searchInput.value)
})

validateInputs()
inputName.addEventListener('input', validateInputs)
inputPriority.addEventListener('change', validateInputs)
inputDate.addEventListener('change', validateInputs)

// custom select

function initCustomSelect(selectElement) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('custom-select-wrapper');

    const styledSelect = document.createElement('div');
    styledSelect.classList.add('styled-select');
    styledSelect.textContent = selectElement.options[selectElement.selectedIndex].text;

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('select-options');

    [...selectElement.options].forEach(option => {
        const opt = document.createElement('div');
        opt.textContent = option.text;
        opt.dataset.value = option.value;

        opt.addEventListener('click', () => {
            selectElement.value = option.value;
            styledSelect.textContent = option.text;
            optionsContainer.classList.remove('active');
            validateInputs();
        });

        optionsContainer.appendChild(opt);
    });

    styledSelect.addEventListener('click', () => {
        optionsContainer.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            optionsContainer.classList.remove('active');
        }
    });

    wrapper.appendChild(styledSelect);
    wrapper.appendChild(optionsContainer);
    selectElement.parentNode.insertBefore(wrapper, selectElement);
    wrapper.appendChild(selectElement);
}

initCustomSelect(document.getElementById('inputPriority'));

// custom data pickers

flatpickr("#inputDate", {
    enableTime: true,
    time_24hr: true,
    dateFormat: "Y-m-d H:i",
    locale: {
        firstDayOfWeek: 1
    }
});

