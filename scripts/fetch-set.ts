/**
 * Script to fetch Magic card data from Scryfall API
 *
 * Usage: ts-node scripts/fetch-set.ts <SET_CODE>
 * Example: ts-node scripts/fetch-set.ts ECL
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

interface ScryfallCard {
  name: string
  set: string
  type_line: string
  oracle_id: string
  [key: string]: any
}

interface ScryfallResponse {
  object: string
  total_cards: number
  has_more: boolean
  next_page?: string
  data: ScryfallCard[]
}

const SCRYFALL_API_DELAY = 100 // ms between requests (Scryfall rate limit)

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'WhatCouldTheyHave/1.0',
        'Accept': 'application/json'
      }
    }

    https.get(url, options, (res: any) => {
      let data = ''

      res.on('data', (chunk: any) => {
        data += chunk
      })

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e}`))
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`))
        }
      })
    }).on('error', (err: any) => {
      reject(err)
    })
  })
}

function shouldIncludeCard(card: ScryfallCard): boolean {
  const typeLine = card.type_line.toLowerCase()
  const oracleText = (card.oracle_text || '').toLowerCase()
  const keywords = card.keywords || []

  // Always include instants
  if (typeLine.includes('instant')) {
    return true
  }

  // Include cards with Flash keyword
  if (keywords.includes('Flash')) {
    return true
  }

  // Include cards with conditional flash ("as though it had flash")
  if (oracleText.includes('as though it had flash')) {
    return true
  }

  // Exclude cards that only mention "flashback"
  if (keywords.includes('Flashback') || oracleText.includes('flashback')) {
    return false
  }

  // Exclude other false positives
  return false
}

async function fetchCards(setCode: string): Promise<ScryfallCard[]> {
  const allCards: ScryfallCard[] = []

  // Query for instants OR cards mentioning flash, removing duplicates
  const query = encodeURIComponent(
    `set:${setCode} (t:instant OR o:flash) unique:cards`
  )

  let url = `https://api.scryfall.com/cards/search?q=${query}`

  console.log(`Fetching cards from set: ${setCode.toUpperCase()}`)
  console.log(`Query: set:${setCode} (t:instant OR o:flash) unique:cards`)

  while (url) {
    console.log(`Fetching: ${url}`)

    const data: ScryfallResponse = await fetchJson(url)
    allCards.push(...data.data)

    console.log(`  Retrieved ${data.data.length} cards (total: ${allCards.length})`)

    if (data.has_more && data.next_page) {
      url = data.next_page
      await sleep(SCRYFALL_API_DELAY) // Respect rate limits
    } else {
      url = ''
    }
  }

  // Filter cards to remove flashback-only cards
  const filtered = allCards.filter(shouldIncludeCard)
  console.log(`Filtered to ${filtered.length} instant-speed cards (removed ${allCards.length - filtered.length})`)

  return filtered
}

function analyzeCards(cards: ScryfallCard[]): void {
  console.log('\n=== Card Analysis ===')
  console.log(`Total cards: ${cards.length}`)

  const instants = cards.filter(c => c.type_line.toLowerCase().includes('instant'))
  const flashKeyword = cards.filter(c => c.keywords?.includes('Flash'))
  const conditionalFlash = cards.filter(c =>
    c.oracle_text?.toLowerCase().includes('as though it had flash') &&
    !c.keywords?.includes('Flash')
  )

  console.log(`  Instants: ${instants.length}`)
  console.log(`  Flash keyword: ${flashKeyword.length}`)
  console.log(`  Conditional Flash: ${conditionalFlash.length}`)

  if (conditionalFlash.length > 0) {
    console.log(`\n  Conditional Flash cards:`)
    conditionalFlash.forEach(c => console.log(`    - ${c.name}`))
  }

  // Check for any sorceries (shouldn't be any)
  const sorceries = cards.filter(c =>
    c.type_line.toLowerCase().includes('sorcery') &&
    !c.type_line.toLowerCase().includes('instant')
  )
  if (sorceries.length > 0) {
    console.warn(`\n  ⚠️  WARNING: Found ${sorceries.length} sorceries:`)
    sorceries.forEach(s => console.warn(`    - ${s.name}: ${s.type_line}`))
  }
}

async function saveSetData(setCode: string, cards: ScryfallCard[]): Promise<void> {
  const setsDir = path.join(__dirname, '../src/sets')
  const setCodeUpper = setCode.toUpperCase()

  // Save JSON file
  const jsonPath = path.join(setsDir, `${setCodeUpper}-card-base.json`)
  fs.writeFileSync(jsonPath, JSON.stringify(cards, null, 2))
  console.log(`\n✓ Saved ${cards.length} cards to: ${jsonPath}`)

  // Create or update markdown file
  const mdPath = path.join(setsDir, `${setCode.toLowerCase()}-text.md`)

  // Get set info from first card
  const setName = cards[0]?.set_name || setCodeUpper
  const releaseDate = cards[0]?.released_at || 'Unknown'

  const mdContent = `## ${setName} (${setCodeUpper})

Released: ${releaseDate}

**Total instant-speed cards**: ${cards.length} unique cards

Includes:
- Instants (including those with Flashback)
- Cards with Flash keyword
- Cards with conditional Flash (e.g., "cast as though it had flash if...")
- Excludes: Sorceries with Flashback

This set data was generated using the Scryfall API query:
\`set:${setCode} (t:instant OR o:flash) unique:cards\`

Then filtered to remove non-instant Flashback cards.
`

  fs.writeFileSync(mdPath, mdContent)
  console.log(`✓ Created description file: ${mdPath}`)
}

async function main() {
  const setCode = process.argv[2]

  if (!setCode) {
    console.error('Usage: ts-node scripts/fetch-set.ts <SET_CODE>')
    console.error('Example: ts-node scripts/fetch-set.ts ECL')
    process.exit(1)
  }

  try {
    const cards = await fetchCards(setCode)

    if (cards.length === 0) {
      console.error(`No cards found for set: ${setCode}`)
      process.exit(1)
    }

    analyzeCards(cards)
    await saveSetData(setCode, cards)

    console.log('\n✓ Done!')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()

// Export to make this a proper module for TypeScript
export {}
