class InputWithJumperLabel {
    constructor(e) {
        this.target = e.target
        this.label = this.target.previousElementSibling
        setTimeout(() => {
            this.label.style.color = window.getComputedStyle(this.target).borderColor;
        }, 200);
    }
    
    focus() {
        this.label.classList.add('jump')
        this.label.classList.remove('jumpCancel')
        // setTimeout(() => {
        //     this.label.style.color = '#495057';
        // }, 200);
    }

    blur() {
        if(!this.target.value) {
            this.label.classList.remove('jump')
            this.label.classList.add('jumpCancel')
            // setTimeout(() => {
            //     this.label.style.color = window.getComputedStyle(this.target).borderColor;
            // }, 200);
        }
    }

    getName() {
        return this.target.name
    }

    getValue() {
        return this.target.value
    }

    setValue(value) {
        this.target.value = value
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