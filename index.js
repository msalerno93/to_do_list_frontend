const endPoint = "http://127.0.0.1:3000/api/v1/lists"

document.addEventListener('DOMContentLoaded', () => {
    getLists()

    const createListForm = document.querySelector("#create-list-form")

    createListForm.addEventListener("submit", (e) => createFormHandler(e));

})

function getLists() {
    fetch(endPoint)
    .then(res => res.json())
    .then(lists => {
        lists.data.forEach(list => {

            let newList = new List(list, list.attributes)
            document.querySelector('#list-container').innerHTML += newList.renderList()
        })
    })
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const descriptionInput = document.querySelector('#input-description').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(titleInput, descriptionInput, categoryId)
}

function postFetch(title, description, category_id) {
    const bodyData = {title, description, category_id}
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(list => {
        const listData = list.data
        let newList = new List(listData, listData.attributes)
            document.querySelector('#list-container').innerHTML += newList.renderList()
    })
}