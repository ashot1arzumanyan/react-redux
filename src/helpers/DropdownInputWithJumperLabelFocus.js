function DropdownInputWithJumperLabelFocus(e) {
    const listenEnterUpDown = (() => {
        let selected = -1;
        return function(e) {
            const lies = e.target.parentElement.querySelectorAll('li');
            if (!lies.length || selected > lies.length - 1) {
                selected = -1;
                return
            }
            if (e.keyCode === 40) {
                if (selected < lies.length - 1) {
                    if (lies[selected]) {
                        lies[selected].classList.remove('hovered_list_item') 
                    }
                    selected += 1;
                    if (lies[selected]) {
                        lies[selected].classList.add('hovered_list_item') 
                        lies[selected].scrollIntoView({block: 'end'})
                    }
                }
            } else if (e.keyCode === 38) {
                if (selected > 0) {
                    if (lies[selected]) {
                        lies[selected].classList.remove('hovered_list_item') 
                    }
                    selected -= 1;
                    if (lies[selected]) {
                        lies[selected].classList.add('hovered_list_item') 
                        lies[selected].scrollIntoView({block: 'end'})
                    }
                }
            } else if (e.keyCode === 13) {
                if (selected >= 0) {
                    const input = e.target.parentElement.querySelector('input')
                    input.value = lies[selected].innerText
                    const evn = new Event('input', { bubbles: true })
                    input.dispatchEvent(evn)
                }
            } else {
                if (lies[selected]) {
                    lies[selected].classList.remove('hovered_list_item') 
                }
                selected = -1
            }
        }
    })();

    const hideEl = (e) => {                                                                                                                                     
        const input = e.target.querySelector('input'); 
        this.setState({
            isListOpen: false,
            isInputHasValue: input.value.trim() ? true : false 
        })
        e.target.removeEventListener('mouseleave', hideEl);
        input.removeEventListener('keyup', listenEnterUpDown);
        input.blur();
    };
    this.setState({ 
        isListOpen: true,
        isInputHasValue: true
    });                                                                                                                                         
    e.target.parentElement.addEventListener('mouseleave', hideEl);
    e.target.removeEventListener('keyup', listenEnterUpDown);
    e.target.addEventListener('keyup', listenEnterUpDown);
}

export default DropdownInputWithJumperLabelFocus