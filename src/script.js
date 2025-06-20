import './style.scss'

const btnAddNewToDo = document.querySelector('.btn__add__new__todo')
const containerContent = document.querySelector('.container__content')

btnAddNewToDo.addEventListener('click', (e) => {
    e.preventDefault()
    containerContent.innerHTML = `
    <div class="container__note">
        <h1 class="container__note__title">Add a new to-do:</h1>
        <div class="container__note__left">
            <div class="container__note__left-inp">
                <p>Name:</p>
                <input type="text" placeholder="name for the task you’re going to do">
            </div>
            
            <div class="container__note__left-inp">
                <p>Description:</p>
                <input type="text" placeholder="name for the task you’re going to do">
            </div>
            
            <div class="container__note__left-inp">
                <p>Category:</p>
                <input type="text" placeholder="name for the task you’re going to do">
            </div>
            
            <div class="container__note__left-inp">
                <p>Date:</p>
                <input type="text" placeholder="name for the task you’re going to do">
            </div>
            
            <div class="container__note__left-inp">
                <p>Time:</p>
                <input type="text" placeholder="name for the task you’re going to do">
            </div>
        </div>
        
        <div class="container__note__right">
            <div class="priority">
                <p>Priority:</p>
                <div>select from dropdown</div>
            </div>
            
            <div class="fulfillment">
                Fulfillment:
            </div>
            
            <div class="buttons">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
            </div>
        </div>
    </div>
    `
})



