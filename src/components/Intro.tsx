import React from 'react'
import marked from 'marked'
const grnText = require('../sets/GRN-text.md')

class Intro extends React.Component {
  state = {
    markdown: { __html: '' },
  }
  componentDidMount() {
    fetch(grnText)
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        const markdown = marked(text)
        this.setState({ markdown: { __html: markdown } })
      })
  }

  render() {
    const { markdown } = this.state
    const intro = (
      <>
        <p>
          In Limited Magic, your opponent will oftentimes do something that
          doesn't make sense according to what's on the board. When your
          opponent attacks their 2/2 into your 3/3 they're up to something.
          Assuming that your opponent is not bluffing, there are limited
          possibilities to what could be going on.
        </p>
        <p>
          This website is intended to help you learn the instants in the set,
          practice that knowledge or potentially as a tool figure out what your
          opponent has during a game.
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

export default Intro
