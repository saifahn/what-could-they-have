import React from 'react'
import { RootState } from '../reducers'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

interface Props extends ReturnType<typeof mapStateToProps> {}

class Intro extends React.Component<Props> {
  public render() {
    const markdown = { __html: this.props.introText }
    const intro = (
      <>
        <p>
          In Limited Magic, your opponent will oftentimes do something that
          doesn&#39;t make sense according to what&#39;s on the board. When your
          opponent attacks their 2/2 into your 3/3 they&#39;re up to something.
          Assuming that your opponent is not bluffing, there are limited
          possibilities to what could be going on.
        </p>
        <p>
          This website is intended to help you learn the instants in the set,
          practice that knowledge or potentially as a tool to figure out what
          your opponent has during a game.
        </p>
      </>
    )
    return (
      <main className="Intro mt-4">
        {intro}
        <div className="SetSpecificPart" dangerouslySetInnerHTML={markdown} />
      </main>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { introText } = state.shared
  return { introText }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  null,
)(Intro)
