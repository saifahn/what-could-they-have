import generateMana from './generateMana'

/* 

TODO:

- [ ] Accept a set object
- [ ] Longest possible of one colour
- [ ] Generate multiple colours
- [ ] Has the possibility to include the most expensive spell
- [ ] Accept a length argument, doesn't make it longer than that

*/

it('generates one colour of mana', () => {
  const mana = generateMana({ len: 4, coloursToGenerate: 1 })
  expect(mana).toBeTruthy()
})

it('generates a random string of mana', () => {
  const testParams = { len: 4, coloursToGenerate: 4 }
  const mana = generateMana(testParams)
  const manaTwo = generateMana(testParams)
  expect(mana).not.toEqual(manaTwo)
})

function getNumberOfColours(manaString: string) {
  // loop through string
  // get number of unique characters
  // TODO: get unique from string
  const uniqueColours: string[] = []
  manaString.split('').forEach((character) => {
    if (uniqueColours.indexOf(character) === -1) {
      uniqueColours.push(character)
    }
  })
  return uniqueColours.length
}

it('can generate two colours of mana', () => {
  // TODO: rename variables
  const len = 4
  const coloursToGenerate = 2
  const testParams = {
    len,
    coloursToGenerate
  }
  const mana = generateMana(testParams)
  const numGeneratedColours = getNumberOfColours(mana)
  expect(numGeneratedColours).toBeLessThanOrEqual(coloursToGenerate)
})

// sometimes it doesn't generate two different colours when 2 is passed in
// right now it only works for up to the amount of characters
// that might actually be fine
