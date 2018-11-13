class DropdownListItemWithJumperLabel {
    constructor(e) {
        this.target = e.target
    }

    click() {
        const input = this.getInput()
        input.dataset.en = this.target.dataset.en
        input.value = this.target.innerText
        const evn = new Event('input', { bubbles: true })
        input.dispatchEvent(evn)
    }

    getInput() {
        return this.target.parentElement.parentElement.querySelector('input')
    }
}

export default DropdownListItemWithJumperLabel