# Scripts

## fetch-set.ts

Fetches Magic card data from the Scryfall API for a specific set.

### Usage

```bash
yarn fetch-set <SET_CODE>
```

### Examples

```bash
# Fetch Lorwyn Eclipsed
yarn fetch-set ECL

# Fetch Duskmourn
yarn fetch-set DSK

# Fetch Bloomburrow
yarn fetch-set BLB
```

### What it does

1. **Queries Scryfall API** with: `set:<CODE> (t:instant OR o:flash) unique:cards`
   - Fetches all instants from the set
   - Fetches all cards mentioning "flash" in oracle text
   - Uses `unique:cards` to automatically remove duplicate printings

2. **Filters the results**:
   - ✅ Keeps instants (including those with Flashback)
   - ✅ Keeps cards with Flash keyword
   - ✅ Keeps cards with conditional Flash ("as though it had flash if...")
   - ❌ Removes Sorceries with Flashback
   - ❌ Removes other false positives

3. **Saves two files**:
   - `src/sets/<SET>-card-base.json` - Card data array
   - `src/sets/<set>-text.md` - Set description

4. **Analyzes the results**:
   - Shows count of instants, Flash keyword cards, and conditional Flash cards
   - Lists all conditional Flash cards found
   - Warns if any sorceries were accidentally included

### Query Details

The script correctly handles all edge cases:
- ✅ **Instants** (with or without Flashback) - included
- ✅ **Cards with Flash keyword** - included
- ✅ **Cards with conditional Flash** (e.g., "Illusion Spinners") - included
- ❌ **Sorceries with Flashback** - excluded by filter

### Rate Limiting

The script respects Scryfall's rate limits by adding a 100ms delay between paginated requests.

### First Run

Before first use, install dependencies:

```bash
yarn install
```

This will install `ts-node` which is required to run TypeScript scripts directly.
