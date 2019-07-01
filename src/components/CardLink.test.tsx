import React from 'react'
import { CardLink } from './CardLink'
import { shallow } from 'enzyme'

describe('makeCardLink makes correct card links', () => {
  it('makes strings into clickable elements that call functions', () => {
    const mock = jest.fn()
    const testText = 'test'
    const mockedEvent = { currentTarget: { innerText: testText } }
    const wrapper = shallow(<CardLink onPress={mock}>{testText}</CardLink>)
    wrapper.simulate('click', mockedEvent)
    expect(mock).toHaveBeenCalledWith(testText)
  })
})
