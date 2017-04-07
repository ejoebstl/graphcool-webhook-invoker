import invoke from '../src/index.js'

const project = '' // Your project ID
const token = '' // Your secret JWT access token
const id = '' // Your projectId

describe('webhook-invoker', () => {
  describe('end-to-end', () => {
    it('should resolve and invoke webhooks without an error', async () => {
      // Add your aprams and then add this again
      // const res = await invoke(project, id, 'CREATE', token)
      return Promise.resolve()
    }).timeout(10000)
  })
})
