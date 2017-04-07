import { splitByBraces } from '../src/index.js'
import { assert } from 'chai'

const name = 'website: createdWebsite'

const fragment = `
    name
    id
    author {
      id
    }
`

const q = `{
  ${name} {
    ${fragment}
  }
}`

describe('webhook-invoker', () => {
  describe('splitByBraces', () => {
    it('should split on the top level', async () => {
      const t = splitByBraces(q)['']
      const r = splitByBraces(t)

      assert(Object.keys(r)[0].trim() == name.trim())
      assert(Object.values(r)[0].trim() == fragment.trim()) 
    })
  })
})
