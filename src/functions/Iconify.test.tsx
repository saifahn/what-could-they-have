import React from 'react'
import { Iconify } from './Iconify'

describe('it converts mana correctly', () => {
  it('works with one colored mana', () => {
    const testMana = '{U}'
    const inconifiedMana = Iconify(testMana)
    const expected = [
      <i key="0" className="ms ms-u ms-cost ms-shadow ml-tiny" />,
    ]
    expect(inconifiedMana).toEqual(expected)
  })

  it('works with two coloured mana', () => {
    const testMana = '{W}{R}'
    const inconifiedMana = Iconify(testMana)
    const expected = [
      <i key="0" className="ms ms-w ms-cost ms-shadow ml-tiny" />,
      <i key="1" className="ms ms-r ms-cost ms-shadow ml-tiny" />,
    ]
    expect(inconifiedMana).toEqual(expected)
  })

  it('works with hybrid and phyrexian mana', () => {
    const testMana = '{2/G}{R/W}{W/P}'
    const inconifiedMana = Iconify(testMana)
    const expected = [
      <i key="0" className="ms ms-2g ms-cost ms-shadow ml-tiny" />,
      <i key="1" className="ms ms-rw ms-cost ms-shadow ml-tiny" />,
      <i key="2" className="ms ms-wp ms-cost ms-shadow ml-tiny" />,
    ]
    expect(inconifiedMana).toEqual(expected)
  })
})
