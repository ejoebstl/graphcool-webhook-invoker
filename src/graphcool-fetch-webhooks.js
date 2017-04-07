
export default async function fetchWebhooks(queryResolver, project) {
  const query = `
    query fetchWebhooks {
      viewer {
        project(id: "${project}") {
          actions {
            edges {
              node {
                handlerType
                triggerMutationModel {
                  fragment
                  model {
                    name
                    id
                  }
                  mutationType
                }
                handlerWebhook {
                  url
                  isAsync
                }
              }
            }
          }
        }
      }
    }
  `

  const res = await queryResolver(query)
  return res.viewer.project.actions.edges.map(x => x.node).filter(x => x.handlerType == "WEBHOOK")
}
