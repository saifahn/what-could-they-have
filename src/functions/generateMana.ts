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
  const shortenMana = Math.floor(Math.random() * 2)
  const colours = getColours(coloursToGenerate)
  let mana: string[] = []
  for (let i = 0; i < len - shortenMana; i++) {
    const coloursLength = colours.length
    const randomNum = Math.floor(Math.random() * coloursLength)
    mana.push(`{${colours[randomNum]}}`)
  }
  mana.sort()
  return mana.join('')
}

export default generateMana
