import { splitByParantheses } from '../src/index.js'
import { assert } from 'chai'

const fragment = `
    name
    id
    author {
      id
    }
`

const q = `{
  website: createdWebsite {
    ${fragment}
  }
}`

describe('webhook-invoker', () => {
  describe('splitByParanthesis', () => {
    it('should split on the top level', async () => {
      const t = splitByParantheses(q)['']
      const r = splitByParantheses(t)

      assert(Object.keys(r)[0].trim() == 'website: createdWebsite')
      assert(Object.values(r)[0].trim() == fragment.trim()) 
    })
  })
})
