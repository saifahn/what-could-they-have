import React, { ReactElement, FormEvent } from 'react'

interface Props {
  value: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onChange: (event: FormEvent<HTMLInputElement>) => void
  children?: ReactElement
}

const TextInputForm = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" onChange={props.onChange} value={props.value} />
      {props.children}
    </form>
  )
}

export default TextInputForm
