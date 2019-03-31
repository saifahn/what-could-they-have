import { storiesOf } from '@storybook/react'
import React, { FormEvent } from 'react'
import TextInputForm from './TextInputForm'

const submit = (event: FormEvent) => {
  console.log('submitted')
}

const change = (event: FormEvent) => {
  console.log('changed')
}

storiesOf('TextInputForm', module)
  .add('without children', () => (
    <TextInputForm onSubmit={submit} onChange={change} value="" />
  ))
  .add('with child', () => (
    <TextInputForm onSubmit={submit} onChange={change} value="">
      <button>This one has a button</button>
    </TextInputForm>
  ))
