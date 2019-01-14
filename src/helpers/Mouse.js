// function Mouse (e) {
//     this.e = e
// }

const getXY = (e) => {
    const rect = e.target.getBoundingClientRect();
    return {
        x: e.pageX - rect.left,
        y: e.pageY - window.scrollY - rect.top
    }
}

// function copyEmailToClipBoard() {
//     const email = 'proposal' in this.props ? this.props.proposal.email : this.props.demand.email
//     if (!!email) {
//         const el = document.createElement('textarea');
//         el.value = email
//         document.body.appendChild(el)
//         el.select()
//         document.execCommand('copy', true)
//         document.body.removeChild(el)
//     }
// }

function openContacts (e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.state.isContactsOpen) {
        // copyEmailToClipBoard.call(this)
        return
    }
    this.isMouseMove = false
    const { x, y } = getXY(e)
    if (this.state.isReadMore && y > 155 && x < 300) {
        this.setState({ modal: true })
        this.node.current.style.boxShadow = '0px 0px 10px 2px rgb(193, 193, 193)';
        this.node.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
        return;
    }
    setTimeout(() => {
        this.setState({ isContactsOpen: true })
    }, 250);
    if (x < this.x_1_3) {
        this.node.current.style.transform = 'rotateY(-180deg)'
        setTimeout(() => {
            this.node.current.querySelector('.Contacts').style.transform = 'rotateY(180deg)'
        }, 250);
    } else if (x > (this.x_1_3 * 2)) {
        this.node.current.style.transform = 'rotateY(180deg)'
        setTimeout(() => {
            this.node.current.querySelector('.Contacts').style.transform = 'rotateY(-180deg)'
        }, 250);
    } else {
        if (y < this.y_1_2) {
            this.node.current.style.transform = 'rotateX(180deg)'
            setTimeout(() => {
                this.node.current.querySelector('.Contacts').style.transform = 'rotateX(-180deg)'
            }, 250);
        } else {
            this.node.current.style.transform = 'rotateX(-180deg)'
            setTimeout(() => {
                this.node.current.querySelector('.Contacts').style.transform = 'rotateX(-180deg)'
            }, 250);
        }
    }
    this.node.current.style.boxShadow = '0px 0px 10px 2px rgb(193, 193, 193)'; 
}

function mouseMoveOverStatement(e) {
    e.stopPropagation()
    e.preventDefault()
    const { x, y } = getXY(e)
    // console.log('x:  ' + x);
    // console.log('y:  ' + y);
    if (x < this.x_1_3) {
      this.node.current.style.transform = 'rotateY(7deg)'
      this.node.current.style.boxShadow = '-3px 0px 10px 2px rgb(193, 193, 193)';
    } else if (x > (this.x_1_3 * 2)) {
      this.node.current.style.boxShadow = '3px 0px 10px 2px rgb(193, 193, 193)';
      this.node.current.style.transform = 'rotateY(-7deg)'
    } else {
      if (y < this.y_1_3) {
        this.node.current.style.transform = 'rotateX(-7deg)'
        this.node.current.style.boxShadow = '0px -2px 10px 2px rgb(193, 193, 193)';
      } else if (y > (this.y_1_3 * 2)) {
        this.node.current.style.transform = 'rotateX(7deg)'
        this.node.current.style.boxShadow = '0px 3px 10px 2px rgb(193, 193, 193)';
      } else {
        this.node.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
        this.node.current.style.boxShadow = '0px 0px 10px 2px rgb(193, 193, 193)';
      }
    }
    if (y > 166 && x > 30 && x < 250) {
        const btn = this.node.current.querySelector('button.read_more')
        if(btn) {
            btn.style.left = x - (btn.offsetWidth / 2) + 'px'
        }
    }
}

export { openContacts, mouseMoveOverStatement }