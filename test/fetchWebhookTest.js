import fetchWebhooks from '../src/graphcool-fetch-webhooks.js'
import createQueryResolver from '../src/default-query-resolver.js'

const url = 'https://api.graph.cool/system/v1/' // System API URL
const project = '' // Your project ID
const token = '' // Your token

describe('webhook-invoker', () => {
  describe('fetch-webhooks', () => {
    it('should fetch the webhooks correctly', async () => {
      const queryResolver = createQueryResolver(url, {
        'authorization': 'Bearer ' + token
      })

      // const res = await fetchWebhooks(queryResolver, project)
      // TODO: Add your project and token, then uncomment. 
      // TODO: Please place your asserts here. 
    }).timeout(10000)
  })
})
