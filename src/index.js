import fetchWebhooks from './graphcool-fetch-webhooks.js'
import createQueryResolver from './default-query-resolver.js'
import { fetchNodeWithType, fetchNodeType } from './graphcool-fetch-node.js'
const popsicle = require('popsicle');

export function splitByParantheses(s) {
  let r = [] // Result
  let d = 0 // Depth
  let f = '' // Field
  let v = '' // Value
  for(let i = 0; i < s.length; i++) {
    const c = s[i]

    // Paranthesis and input
    if(c == '{') {
      if(d > 0) {
        v = v + c
      }
      d++
    } else if(c == '}') {
      d--
      if(d > 0) {
        v = v + c
      }
      if(d == 0) {
        r[f.trim()] = v.trim()
        f = ''
        v = ''
      }
    } 
    else if(d == 0) {
      f = f + c
    } else {
      v = v + c
    }
  }
  if(d != 0 || v.trim() != '' || f.trim() != '') {
    throw new Error('Syntax Error. Please keep in mind that parantheses inside strings will mess up this poor parser.')
  }
  return r
}

async function resolveFragment(projectQueryResolver, nodeId, typename, fragment) {
  const t = splitByParantheses(fragment)['']
  const queries = splitByParantheses(t)

  let res = {}

  for(const key of Object.keys(queries)) {
    const s = key.split(':')
    if(s.length != 2) {
      throw new Error('Unsupported fragment query.')
    }
    
    const name = s[0].trim()
    const field = s[1].trim()

    const fragment = queries[key]
    const nodeData = await fetchNodeWithType(projectQueryResolver, nodeId, typename, fragment)

    res[name] = nodeData.node
  }
  return res
}

export default async function invoke(projectId, nodeId, mutationType, token) {
  const authParams = {
    'authorization': 'Bearer ' + token
  }

  const sysUrl = 'https://api.graph.cool/system/v1/'
  const systemQueryResolver = createQueryResolver(sysUrl, authParams)

  const projUrl = 'https://api.graph.cool/relay/v1/' + projectId
  const projectQueryResolver = createQueryResolver(projUrl, authParams)

  const typename = await fetchNodeType(projectQueryResolver, nodeId)

  let webhooks = await fetchWebhooks(systemQueryResolver, projectId)
  webhooks = webhooks.filter(x => x.triggerMutationModel.mutationType == mutationType && x.triggerMutationModel.model.name == typename)

  if(webhooks.length == 0) {
    throw new Error(`Webhook for ${mutationType} not found on type ${typename}`)
  }

  let res = []

  for(const webhook of webhooks) {
    const resolved = await resolveFragment(projectQueryResolver, nodeId, typename, webhook.triggerMutationModel.fragment)
    const response = await popsicle.request({
      method: 'POST',
      url: webhook.handlerWebhook.url,
      body: resolved
    }) 

    res.push({
      webhook: webhook,
      data: resolved,
      response: response
    })
  }

  return res
}
