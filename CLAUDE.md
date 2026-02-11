# What Could They Have - Project Guide

## Project Overview

"What Could They Have" is a Magic: The Gathering learning/training game built with React and TypeScript. The core gameplay is a memory/knowledge challenge: given a specific mana pool, players try to guess which cards from a chosen set can be cast at instant speed.

## Purpose

This app helps Magic: The Gathering players:

- Learn which cards can be played at instant speed
- Practice recognizing castable cards given specific mana availability
- Build familiarity with different card sets and their instant-speed options

## Tech Stack

- **Frontend**: React 16 + TypeScript
- **State Management**: Redux with Thunk middleware
- **Routing**: React Router v5
- **Styling**: Tailwind CSS + PostCSS
- **Testing**: Jest + Enzyme
- **Dev Tools**: Storybook
- **Card Data**: Scryfall API format (JSON files stored locally)

## Project Structure

```
src/
├── components/          # React components
│   ├── game/           # Game-specific components (Game, Guesser, DifficultySelector)
│   ├── shared/         # Reusable components (CardModal)
│   ├── Card.tsx        # Individual card display
│   ├── Filter.tsx      # Set selection and filtering
│   ├── Header.tsx      # App header
│   └── Intro.tsx       # Landing page
├── actions/            # Redux action creators
├── reducers/           # Redux reducers
├── functions/          # Utility functions
│   └── iconify.ts     # Converts mana symbols to icons
├── sets/              # Card data for different Magic sets
│   ├── *-card-base.json   # Raw card data from Scryfall
│   └── *-text.md          # Set descriptions/notes
├── common/            # Shared types and interfaces
├── constants/         # App constants
└── store.ts          # Redux store configuration
```

## Available Card Sets

Currently includes:

- **GRN** - Guilds of Ravnica (2018)
- **WAR** - War of the Spark (2019)
- **ELD** - Throne of Eldraine (2019)
- **M21** - Core Set 2021 (2020)
- **MID** - Innistrad: Midnight Hunt (2021)

## Key Concepts

### Game Flow

1. User selects a card set and difficulty
2. App generates a random mana pool
3. User guesses cards that can be cast at instant speed with that mana
4. Feedback shows correct/incorrect guesses
5. User can view all cards or start a new game

### Card Filtering

Cards are filtered to only include those castable at instant speed:

- Instant spells
- Creatures with Flash
- Cards with activated abilities usable at instant speed

### Data Format

Card data follows the Scryfall API format. Each set has a `*-card-base.json` file containing card objects with properties like:

- `name`, `mana_cost`, `type_line`, `oracle_text`
- `colors`, `cmc` (converted mana cost)
- `image_uris` for card images

## Development Notes

### Legacy Code Markers

- `RNA-flash-cards.json` - Old file, possibly from early development
- Class components - Predates hooks era (2019)
- Redux with connect() HOC - Predates Redux Toolkit

### State Management

Redux store structure:

- `game`: Current game state (mana pool, guessed cards, difficulty)
- `shared`: Global data (all loaded cards)
- `cardModal`: Modal state for viewing card details

### Styling

- Uses Tailwind CSS utility classes
- Custom CSS in component-specific files
- Mana symbols rendered as icons via `iconify()` function

## Common Tasks

### Adding a New Card Set

1. Get card data from Scryfall API for the set
2. Add `[SET]-card-base.json` to `src/sets/`
3. Add set code to set selection logic
4. Update filter options

### Updating Dependencies

Be cautious with major version bumps:

- React 16→18 requires migration (ReactDOM.render → createRoot)
- React Router 5→6 has breaking API changes
- Redux patterns may need updates for Redux Toolkit

### Testing

- Unit tests use Jest + Enzyme
- Run tests: `npm test`
- Storybook for component development: `npm run storybook`

## Known Issues / Tech Debt

- Dependencies are 5+ years old (last updated ~2021)
- Using class components instead of hooks
- No TypeScript strict mode
- Limited test coverage
- Hard-coded set selection logic

## Future Enhancement Ideas

- Add more recent Magic sets (2022-2025)
- Migrate to React hooks
- Update to modern React Router
- Add user accounts and statistics tracking
- Multiplayer/competitive modes
- Mobile-responsive improvements
- Progressive Web App features
