const endPoint = "http://127.0.0.1:3000/api/v1/lists"

document.addEventListener('DOMContentLoaded', () => {
    getLists()
});

    function getLists() {
        fetch(endPoint)
        .then(res => res.json())
        .then(lists => {
            lists.data.forEach(list => {
                const listMarkup = `
                    <div data-id=${list.id}>
                        <h3>${list.attributes.title}</h3>
                        <p>${list.attributes.category.name}</p>
                        <button data-id=${list.id}>edit</button>
                    </div>
                    <br><br> `;

                    document.querySelector('#list-container').innerHTML += listMarkup
                })
            })
    }