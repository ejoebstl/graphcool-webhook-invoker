#!/usr/bin/env node

import invoke from './index.js'

const usage = `Usage:

    graphcool-webhook-invoker PROJECT_ID NODE_ID TRIGGER JWT

Manually invokes the webhook TRIGGER on project PROJECT_ID for node NODE_ID, without mutating data. 

Params: 

    PROJECT_ID: The ID of your Project.
    NODE_ID   : The ID of the node to invoke the webhook for.
    TRIGGER   : The type of webhook to trigger. Usually CREATE, UPDATE or DELETE.
    JWT       : Your JWT authentication token. 
`

async function main() {
  const args = process.argv.slice(2)

  if(args.length != 4) {
    console.log(usage)
    process.exit()
  } else {
    const res = await invoke(args[0], args[1], args[2], args[3])
    res.map(r => console.log(`Invoked ${r.webhook.handlerWebhook.url}`))
  }
}

process.on('unhandledRejection', e => console.error(e.message, e.stack))
main().catch(e => console.error(e.message, e.stack))
