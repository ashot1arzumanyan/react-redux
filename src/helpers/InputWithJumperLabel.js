class InputWithJumperLabel {
    constructor(e) {
        this.target = e.target
    }
    
    focus() {
        const parent = this.target.parentElement
        parent.classList.add('jump')
        parent.classList.remove('jumpCancel')
    }

    blur() {
        const parent = this.target.parentElement
        if(!this.target.value) {
            parent.classList.remove('jump')
            parent.classList.add('jumpCancel')
        }
    }

    checkListIsClosed() {
        const ul = this.target.parentElement.querySelector('ul')
        return ul.classList.contains('d-none')
    }

    getName() {
        return this.target.name
    }

    getValue() {
        return this.target.value
    }

    getNameValue() {
        return {
            name: this.getName(),
            value: this.getValue()
        }
    }

    getNameValueLowerCased() {
        return {
            name: this.getName(),
            value: this.getValue().toLowerCase()
        }
    }

    getDatasetEn() {
        const en = this.target.dataset.en 
        if (!this.target.hasAttribute('data-en') || en === 'undefined') {
            return null
        }
        return en
    }
}

export default InputWithJumperLabel