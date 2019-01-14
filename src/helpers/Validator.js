import moment from 'moment'

function Validator(cFF) {
    this.cFF = cFF;
}

Validator.prototype.checkEmail = function(value) {
    let msg = '';
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === '') {
        msg = 'not_empty_not_correct';
    } else if (!emailRe.test(value)) {
        msg = 'not_correct';
    }
    return msg
}

Validator.prototype.checkUsername = function(value) {
    let msg = '';
    if (value === '') {
        msg = 'not_empty_min_3'
    } else if (value.length < 3) {
        msg = 'min_3'
    }
    return msg
}

Validator.prototype.checkCity = function(value) {
    let msg = '';
    if (value === '') {
        msg = 'from_list'
        return msg
    }
    const cities = Object.values(this.cFF.cities).map(value => value.toLowerCase());
    if (cities.indexOf(value) === -1) {
        msg = 'from_list'
    }
    return msg;
}

Validator.prototype.checkSubType =  function(value) {
    let msg = '';
    if (value === '') {
        msg = 'from_list'
        return msg
    }
    const subTypes = Object.values(this.cFF.subTypes).map(value => value.toLowerCase());
    if (subTypes.indexOf(value) === -1) {
        msg = 'from_list'
    }
    return msg;
  }

Validator.prototype.checkUnit = function(value) {
    let msg = '';
    if (value === '') {
        msg = 'from_list'
    }
    const units = Object.values(this.cFF.units);
    if (units.indexOf(value) === -1) {
        msg = 'from_list'
    }
    return msg;
}

Validator.prototype.checkIsNotEmpty = function(value) {
    let msg = '';
    if (value === '') {
        msg = 'not_empty'
    }
    return msg;
}

Validator.prototype.checkComment = function(value) {
    let msg = '';
    if (value.length > 999) {
        msg = 'comment_max';
    } 
    return msg
}

Validator.prototype.checkFrequencyNum = function(value, continuousType) {
    let msg = '';
    if (value === '') {
        msg = 'from_list'
        return msg
    }
    let values = []
    if (continuousType ==='day') {
        values = ['1', '2', '3', '4', '5', '6']
    } else if (continuousType === 'week') {
        values = ['1', '2', '3']
    } else {
        values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
    if (values.indexOf(value) === -1) {
        msg = 'from_list'
    }
    return msg
}

Validator.prototype.checkMonth = function(value) {
    let msg = ''
    if (value === '') {
        return msg = 'from_list'
    }
    const months = moment().localeData().months()
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    if (numbers.indexOf(value) === -1 && months.indexOf(value) === -1) {
        msg = 'from_list'
    }
    return msg 
}

Validator.prototype.checkYear = function(value) {
    let msg = ''
    if (value === '') {
        return msg = 'from_list'
    }
    const currentYear = new Date().getFullYear();
    const years = []
    for (let year = currentYear; year < currentYear + 31; year++) {
        years.push(String(year))
    }
    if (years.indexOf(value) === -1) {
        msg = 'from_list'
    }
    return msg
}

Validator.prototype.checkDescriptionOneWord = function(value) {
    let msg = ''
    if (value) {
        if (value.split(' ').length > 1) {
            msg = 'should_be_one_word'
        }
        if (value.length > 25) {
            msg = 'should_not_be_more_25'
        }
    }
    return msg
}

Validator.prototype.checkPassword = function(value, repeat_passwordMsg) {
    let msges = {
        passwordMsg: '',
        repeat_passwordMsg: repeat_passwordMsg
    };
    const repeat_password = document.querySelector('input[name = "repeat_password"]');
    if (value === '') {
        msges.passwordMsg = 'not_empty_min_7';
    } else if (value.length < 7) {
        msges.passwordMsg = 'min_7';
    } else if (value !== repeat_password.value.trim()) {
        msges.passwordMsg = 'passwords_not_match';
        msges.repeat_passwordMsg = 'passwords_not_match'; 
    } else {
        msges.repeat_passwordMsg = '';
    }
    // repeat_password.dispatchEvent(new Event('input', { bubbles: true }))
    return msges
}

Validator.prototype.checkRepeatPassword = function(value, passwordMsg) {
    let msges = {
        passwordMsg_2: passwordMsg,
        repeat_passwordMsg_2: ''
    };
    const password = document.querySelector('input[name = "password"]');
    if (value === '') {
        msges.repeat_passwordMsg_2 = 'not_empty_min_7';
    } else if (value.length < 7) {
        msges.repeat_passwordMsg_2 = 'min_7';
    } else if (value !== password.value.trim()) {
        msges.repeat_passwordMsg_2 = 'passwords_not_match';
        msges.passwordMsg_2 = 'passwords_not_match'; 
    } else {
        msges.passwordMsg_2 = '';
    }
    password.dispatchEvent(new Event('input', { bubbles: true }))
    return msges
}

const validateAll = function() {
    const isBlurred = { ...this.state.isBlurred }
    let entries = []
    let input
    const names = Object.keys(isBlurred)
    names.forEach(name => {
        isBlurred[name] = true 
        input = document.getElementById(name)
        entries.push({ name: name, value: input.value })
    })
    const isInvalidMsg = this.msgCreator(entries)
    this.setState({
        isBlurred: isBlurred,
        isInvalidMsg: isInvalidMsg
    })
    return names.some(name => !!isInvalidMsg[name])
}

const validate = function(name, value) {
    const isInvalidMsg = this.msgCreator([{ name: name, value: value.trim() }])
    this.setState({
        isInvalidMsg: isInvalidMsg
    })
}

export { Validator, validate, validateAll }