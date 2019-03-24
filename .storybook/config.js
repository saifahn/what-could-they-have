import { configure } from '@storybook/react'

const req = require.context('../src/components', true, /.stories.tsx$/)

function loadStores() {
  req.keys().forEach(req)
}

configure(loadStores, module)
