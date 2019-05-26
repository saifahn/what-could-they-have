import React from 'react'

export function DifficultySelector(props: any) {
  return (
    <form className="text-lg mt-2">
      You are playing on{' '}
      <select
        ref={props.reference}
        className="appearance-none font-semibold bg-white border-b-2 border-dashed rounded-none border-pink-700 text-md sm:text-xl text-center py-1 focus:outline-none focus:bg-pink-300 focus:border-pink-400 mx-2 select-center"
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
