import InputWithJumperLabel from './InputWithJumperLabel'

export function handleFocus(e) {
    new InputWithJumperLabel(e).focus()
};

export function handleBlur(e) {
    const input = new InputWithJumperLabel(e)
    input.blur()
    const { name, value } = input.getNameValue()
    this.setIsBlurredTrue(name)
    this.validate(name, value)
}

export function handleInput(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    const datasetEn = input.getDatasetEn()
    if (this.state.isBlurred[name]) {
      this.validate(name, value)
    }
    this.setState({ [name]: datasetEn || value })
}

export function handleInputLowerCasedValue(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValueLowerCased()
    const datasetEn = input.getDatasetEn()
    if (this.state.isBlurred[name]) {
      this.validate(name, value)
    }
    this.setState({ [name]: datasetEn || value })
}

export function setIsBlurredTrue(name) {
    const isBlurred = { ...this.state.isBlurred }
    isBlurred[name] = true
    this.setState({ isBlurred: isBlurred })
}