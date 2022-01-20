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
            const listMarkup = `
                <div data-id=${list.id}>
                    <h1>${list.attributes.title}</h1>
                    <p>${list.attributes.description}</p>
                    <h4>${list.attributes.category.name}</h4>
                    <button data-id=${list.id}>edit</button>
                </div>
                <br><br> `;

                document.querySelector('#list-container').innerHTML += listMarkup
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
        const listData = list
        const listMarkup = `
        <div data-id=${list.id}>
            <h1>${listData.title}</h1>
            <p>${listData.description}</p>
            <h4>${listData.category.name}</h4>
            <button data-id=${listData.id}>edit</button>
        </div>
        <br><br> ` ;
    
        document.querySelector('#list-container').innerHTML +=
        listMarkup;
    })
}