import generateMana from './generateMana'

it('generates one colour of mana', () => {
  // function generates one colour of mana
  const mana: string = generateMana()
  expect(mana).toBeTruthy()
})
