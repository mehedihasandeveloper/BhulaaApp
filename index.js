import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js'

const appSettings = {
    databaseURL: "https://bhulaa-9ef27-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const toDoListInDB = ref(database, "toDoList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(toDoListInDB, inputValue)
    clearInputFieldEl()


})

onValue(toDoListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let index = 0; index < itemsArray.length; index++) {
            let currentItem = itemsArray[index];
            appendItemToShoppingListEl(currentItem)
        }
    }else{
        shoppingListEl.innerHTML = "Nothing to remember here... yet"
    }




})


function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `toDoList/${itemID}`)
        remove(exactLocationOfItemInDB)
        console.log(exactLocationOfItemInDB);
    })
    shoppingListEl.append(newEl)
}