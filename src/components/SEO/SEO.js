import React from 'react'
import { connect } from 'react-redux'

import { LastProposalsContent, LastDemandsContent } from '../../helpers/LastStatements'

class SEO extends React.PureComponent {

  constructor() {
    super()

    this.state = {
      isOpen: true,
      lastProposals: [],
      lastDemands: []
    }

    this.last = 10

    this.handleResize = this.handleResize.bind(this)
    this.generateLastProposals = this.generateLastProposals.bind(this)
    this.generateLastDemands = this.generateLastDemands.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => {
      this.handleResize()
      this.generateLastProposals()
      this.generateLastDemands()
    }, 2000);
  }

  handleResize() {
    let devToolsIsopen = false;
    let devtools = /./;
    devtools.toString = function() {
      devToolsIsopen = true;
    }
    console.log('%c', devtools);
    setTimeout(() => {
      this.setState({ isOpen: !devToolsIsopen })
    }, 100);
  }

  generateLastProposals() {
    if (!this.props.proposals.descriptions.skip) {
      return setTimeout(() => {
        this.generateLastProposals()
      }, 2000);
    } else {
      const lastProposalsContent = new LastProposalsContent(
        this.props.proposals.proposals.slice(0, this.last),
        this.props.content.Filter
      );
      this.setState({ lastProposals: lastProposalsContent.getContent(this.props.content.lang) })
    }
  }

  generateLastDemands() {
    if (!this.props.demands.descriptions.skip) {
      return setTimeout(() => {
        this.generateLastDemands()
      }, 2000);
    } else {
      const lastDemandsContent = new LastDemandsContent(
        this.props.demands.demands.slice(0, this.last),
        this.props.content.Filter
      );
      this.setState({ lastDemands: lastDemandsContent.getContent(this.props.content.lang) })
    }
  }

  render() {

    const StatementsContent = (props) => {
      return props.contents.map((content, i) => {
        return <p key={i}>{content}</p>
      })
    }

    return (
      <main className='left_top'>
        <h1>Կայքը նախատեսված է այն օգտատերերի համար, ովքեր ցանկանում են՝ իրացնել իրենց գյուղատնտեսական արտադրանքը, նույնիսկ եթե ընդամենը պլանավորում են ունենալ, փնտրում են թարմ և անարատ գյուղմթերք, նույնիսկ եթե նախատեսում են ձեռք բերել այն հետագայում կամ պարզապես հետաքրքրված են գյուղատնտեսությամբ։</h1>

        {this.state.isOpen ? (
          <div>
            <h2>Կարող եք տեղադրել գյուղատնտեսական մթերքի առք ու վաճառքի հայտարարություններ</h2>
            <p>gyuxmterqi arq u vajarq gyuxatntesakan apranqner mterqner hayastanum texadrel haytararutyun kanach karmir kanach-karmir kanach-karmir.info </p>
            <h2>Գյուղմթերքի առք ու վաճառքի հայտարարություններ, գնել վաճառել, փնտրել գտնել գյուղատնտեսական ապրանքներ կանաչ կարմիր, kanach karmir, kanch-karmir կանաչ֊կարմիր, kanch-karmir.info կայքում</h2>
            <p>gnel pntrel vajarel gjuxmterq gjuxatntesakan mterq apranq hajastanum</p>
            <h2>Գյուղատնտեսական ապրանքների առք ու վաճառքի հայտարարություններ</h2>
            <p>gyuxmterqi gyuxatntesakan apranqneri mterqi gner gnery hayastanum</p>
            <h2>Եթե փնտրում եք կամ ցանկանում եք վաճառել գյուղատնտեսական մթերք, գյուղմթերք, գյուղատնտեսական ապրանք ապա այցելեք kanach-karmir.info կայք հետևյալ հղմամբ <a href='https://www.kanach-karmir.info/'>kanach-karmir.info</a></h2>
            <h2>Find agro products, agricultural products, organic food in armenia</h2>
            <h2>Найти агропродукты, натуральные продукты, сельскохозяйственные продукты в Армении</h2>
          </div>
        ) : (null)}

        <StatementsContent contents={this.state.lastProposals} />
        <StatementsContent contents={this.state.lastDemands} />        

      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    proposals: state.proposals,
    demands: state.demands,
    content: state.content
  }
}

export default connect(mapStateToProps)(SEO)