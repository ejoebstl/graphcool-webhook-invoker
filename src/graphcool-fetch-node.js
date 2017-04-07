

export default async function fetchNode(queryResolver, nodeId, fragment) {
  const typename = await fetchNodeType(queryResolver, nodeId)
  const res = await fetchNodeWithType(queryResolver, nodeId, typename, fragment)

  return res.node
}

export async function fetchNodeWithType(queryResolver, nodeId, typename, fragment) {
  const query = `
    query node {
      node(id: "${nodeId}") { 
        ...F0
      }
    }
    fragment F0 on ${typename} {
      ${fragment}
    }
  `

  const res = await queryResolver(query)
  return res
}

export async function fetchNodeType(queryResolver, nodeId) {
  const query = `
    query node {
      node(id: "${nodeId}") { 
        __typename
      }
    }
  `

  const res = await queryResolver(query)
  return res.node.__typename
}
