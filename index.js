const endPoint = "http://127.0.0.1:3000/api/v1/lists"
const endPointCategories = "http://127.0.0.1:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {
    getLists()
    getCategories()

    const createListForm = document.querySelector("#create-list-form")

    createListForm.addEventListener("submit", (e) => {
        e.preventDefault()
        createFormHandler(e)
        createListForm.reset()
    });
})

document.addEventListener("click", function(e) {
    let id = e.target.id.slice(4)
    let likeID = e.target.id.slice(5)
    let dislikeID = e.target.id.slice(8)
    const createdList = document.getElementById(`${e.target.id}`)
    if(e.target.matches(`#del-${id}`)) {
      e.preventDefault()
      deleteList(id)
      createdList.parentElement.remove(createdList)
    }
    if (e.target.matches(`#like-${likeID}`)) {
        const list = List.all.find(i => i.id === likeID)
        list.like()
        const counter = document.getElementById(`counter-${likeID}`)
        counter.innerHTML = list.likes
    }
    if (e.target.matches(`#dislike-${dislikeID}`)) {
        const list = List.all.find(i => i.id === dislikeID)
        list.dislike()
        const counter = document.getElementById(`counter-${dislikeID}`)
        counter.innerHTML = list.likes
    }
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

function getCategories() {
    fetch(endPointCategories)
    .then(res => res.json())
    .then(cats => {
        cats.data.forEach( cat => {
            let newCat = new Category(cat)
            document.getElementById('categories').innerHTML += newCat.renderList()
        })
    })
}


function createFormHandler(e) {
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
    // .then is handler of primses //
    .then(response => response.json())
    .then(list => {
        const listData = list.data
        let newList = new List(listData, listData.attributes)
            document.querySelector('#list-container').innerHTML += newList.renderList()
    })
}

function deleteList(id) {

    fetch(`${endPoint}/${id}`, {
       method: "DELETE" 
   })
     .then(response => response.json())
     .then(response => console.log(response))
 
 }