import React from 'react'

interface CardLinkProps {
  onPress: Function
}

export const CardLink: React.SFC<CardLinkProps> = (props) => (
  <button onClick={(e) => props.onPress(e.currentTarget.innerText)}>
    {props.children}
  </button>
)
