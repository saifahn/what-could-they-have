import React from 'react'

interface CardLinkProps {
  onPress: Function
}

export const CardLink: React.SFC<CardLinkProps> = (props) => (
  <button
    className="text-lg mt-4 border-pink-400 border-b-2 hover:bg-pink-400 hover:text-white px-1"
    onClick={(e) => props.onPress(e.currentTarget.innerText)}
  >
    {props.children}
  </button>
)
