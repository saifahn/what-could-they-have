import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThunkDispatch } from '../store'
import { selectNewSet } from '../actions/selectNewSet'

interface Props extends ReturnType<typeof mapDispatchToProps> {}

class Header extends React.Component<Props> {
  handleSetSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.selectNewSet(event.target.value)
  }

  render() {
    return (
      <header>
        <Link to="/">Home</Link>
        <Link to="/filter" className="ml-4">
          Filter
        </Link>
        <Link to="/game" className="ml-4">
          Game
        </Link>
        <h1 className="text-2xl sm:text-3xl mt-4 font-semibold">
          What Could They Have? —
          <select
            className="appearance-none font-semibold bg-white rounded-none border-blue-700 text-xl sm:text-3xl text-center px-1 mx-2 focus:bg-gray-200 select-center SetSelector"
            onChange={this.handleSetSelect}
          >
            <option value="war">War of the Spark</option>
            <option value="grn">Guilds of Ravnica</option>
          </select>
        </h1>
      </header>
    )
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  selectNewSet: (setName: string) => dispatch(selectNewSet(setName)),
})

export default connect(
  null,
  mapDispatchToProps,
)(Header)
