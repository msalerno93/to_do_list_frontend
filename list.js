class List {
    
    constructor(list, listAttributes) {
        this.id = list.id
        this.title = listAttributes.title
        this.description = listAttributes.description.split(' ')
        this.category = listAttributes.category
        this.likes = 0
        List.all.push(this)
    }

    _renderUl() {
        let list = ''
        for (let i of this.description) {
            list += `<li>${i}</li>`
        }
        return list
    }

    renderList() {
        return `
        <div class='list-item' id='${this.id}'>
            <h1>${this.title}</h1>
            <ol>
                ${this._renderUl()}
            </ol>
            <h4>${this.category.name}</h4>
            <button id='del-${this.id}'>Delete</button>
            <button id='like-${this.id}'>Like</button>
            <button id='dislike-${this.id}'>Dislike</button>
            <h5 class='like-button' id='counter-${this.id}'> 0 </h5>
        </div>
        <br><br> `;
    }

    like() {
        this.likes ++
    }

    dislike() {
        if (this.likes > 0) {
        this.likes --
        }
    }
}

List.all = [];