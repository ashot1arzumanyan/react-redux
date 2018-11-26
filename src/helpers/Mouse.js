function Mouse (e) {
    this.e = e
}

Mouse.prototype.getXY = function getXY() {
    const m_posx = this.e.pageX, 
    m_posy = this.e.pageY - window.scrollY, 
    rect = this.e.target.getBoundingClientRect(),
    e_posx = rect.left, 
    e_posy = rect.top;

    return {
        x: Math.ceil(m_posx - e_posx),
        y: Math.ceil(m_posy - e_posy)
    }
}

function openContacts (e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.state.isContactsOpen) {
        return
    }
    this.isMouseMove = false
    setTimeout(() => {
    this.setState({ isContactsOpen: true })
    }, 250);
    const { x, y } = new Mouse(e).getXY()
    if (x < this.x_1_3) {
        this.card.style.transform = 'rotateY(-180deg)'
        setTimeout(() => {
          this.card.querySelector('.Contacts').style.transform = 'rotateY(180deg)'
        }, 250);
    } else if (x > (this.x_1_3 * 2)) {
        this.card.style.transform = 'rotateY(180deg)'
        setTimeout(() => {
            this.card.querySelector('.Contacts').style.transform = 'rotateY(-180deg)'
        }, 250);
    } else {
        if (y < this.y_1_2) {
            this.card.style.transform = 'rotateX(180deg)'
            setTimeout(() => {
                this.card.querySelector('.Contacts').style.transform = 'rotateX(-180deg)'
            }, 250);
        } else {
            this.card.style.transform = 'rotateX(-180deg)'
            setTimeout(() => {
                this.card.querySelector('.Contacts').style.transform = 'rotateX(-180deg)'
            }, 250);
        }
    }
    this.card.style.boxShadow = '0px 0px 10px 2px rgb(193, 193, 193)';
}

function mouseMoveOverStatement(e) {
    e.stopPropagation()
    e.preventDefault()
    const { x, y } = new Mouse(e).getXY()
    if (x < this.x_1_3) {
      this.card.style.transform = 'rotateY(7deg)'
      this.card.style.boxShadow = '-3px 0px 10px 2px rgb(193, 193, 193)';
    } else if (x > (this.x_1_3 * 2)) {
      this.card.style.boxShadow = '3px 0px 10px 2px rgb(193, 193, 193)';
      this.card.style.transform = 'rotateY(-7deg)'
    } else {
      if (y < this.y_1_3) {
        this.card.style.transform = 'rotateX(-7deg)'
        this.card.style.boxShadow = '0px -2px 10px 2px rgb(193, 193, 193)';
      } else if (y > (this.y_1_3 * 2)) {
        this.card.style.transform = 'rotateX(7deg)'
        this.card.style.boxShadow = '0px 3px 10px 2px rgb(193, 193, 193)';
      } else {
        this.card.style.transform = 'rotateX(0deg) rotateY(0deg)'
        this.card.style.boxShadow = '0px 0px 10px 2px rgb(193, 193, 193)';
      }
    }
}

export { openContacts, mouseMoveOverStatement }