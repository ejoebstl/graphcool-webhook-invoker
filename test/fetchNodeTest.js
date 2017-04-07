import fetchNode from '../src/graphcool-fetch-node.js'
import createQueryResolver from '../src/default-query-resolver.js'
import { assert } from 'chai'

// TODO - replace with call to graphcool-up
const url = 'https://api.graph.cool/relay/v1/carnationleg-cloud-268'

describe('webhook-invoker', () => {
  describe('fetch-node', () => {
    it('should fetch the node according to the fragment', async () => {
      const queryResolver = createQueryResolver(url)

      const node = await fetchNode(queryResolver, 'cj0qxqthm8zlw0139xsnv6f0y', 'author { name } text createdAt')
      assert(node.author.name == 'Hugo')
      assert(node.text == 'New Text for Tweet')
    }).timeout(10000)
  })
})
