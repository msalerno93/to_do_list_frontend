class Category {
  constructor(cat) {
    this.id = cat.id
    this.name = cat.attributes.name
  }

  renderList() {
    return `<option value="${this.id}">${this.name}</option>`
  }
}