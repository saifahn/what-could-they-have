export const COLOURS = ['W', 'U', 'B', 'R', 'G']

function getColours(numColours: number): string[] {
  // make a copy of the old array
  const initColours = COLOURS.slice()
  const colours: string[] = []
  for (let i = 0; i < numColours; i++) {
    // remove a random colour each time
    const length = initColours.length
    const randomNum = Math.floor(Math.random() * length)
    const toPush = initColours.splice(randomNum, 1)
    colours.push(toPush[0])
  }
  return colours
}

interface generateManaParams {
  len: number
  coloursToGenerate: number
}

function generateMana({ len, coloursToGenerate }: generateManaParams): string {
  const colours = getColours(coloursToGenerate)
  let mana = ''
  for (let i = 0; i < len; i++) {
    // add a random number of different colours from the array
    const coloursLength = colours.length
    const randomNum = Math.floor(Math.random() * coloursLength)
    mana += `{${colours[randomNum]}}`
  }
  return mana
}

export default generateMana
