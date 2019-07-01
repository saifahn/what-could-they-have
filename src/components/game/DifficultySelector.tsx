import React from 'react'

export function DifficultySelector(props: any): JSX.Element {
  return (
    <form className="text-lg mt-2">
      You are playing on{' '}
      <select
        ref={props.reference}
        className="appearance-none font-semibold bg-white rounded-none border-blue-700 text-md sm:text-xl text-center px-1 mx-2 focus:bg-gray-200 select-center DifficultySelector"
        onChange={props.setDifficulty}
      >
        <option value="basic">basic</option>
        <option value="common">common</option>
        <option value="uncommon">uncommon</option>
        <option value="rare">rare</option>
        <option value="mythic">mythic</option>
      </select>{' '}
      mode
    </form>
  )
}
