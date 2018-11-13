import InputWithJumperLabel from './InputWithJumperLabel'

class DropdownInputWithJumperLabel extends InputWithJumperLabel {
    constructor(e) {
        super(e)
        this.e = e
    }

    // clickOnListItem() {
    //     const input = this.getInput();
    //     console.log(input.value); 
    //     input.value = this.e.target.innerText;
    //     input.dataset.en = this.e.target.dataset.en;
    // }

    focus() {
        super.focus()
        const ul = this.getUl();
        ul.classList.remove('d-none');
        const hideEl = (ev) => {                                                                                                                                     
            const target = ev.target;
            const input = target.querySelector('input'); 
            const ul = target.querySelector('ul'); 
            ul.classList.add('d-none');                                                                                                          
            target.removeEventListener('mouseleave', hideEl);
            input.addEventListener('blur', super.blur())
            input.blur(); 
        }                                                                                                                                                            
        this.e.target.parentElement.addEventListener('mouseleave', hideEl);
    }

    getUl() {
        return this.e.target.parentElement.querySelector('ul')
    }
}

export default DropdownInputWithJumperLabel