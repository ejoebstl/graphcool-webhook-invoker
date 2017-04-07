![Build Status](https://travis-ci.org/ejoebstl/graphcool-webhook-invoker.svg?branch=master)

# graphcool-webhook-invoker

Test driven development in production, what do you want more? :rocket: :see_no_evil:

Invokes [graphcool](http://graph.cool) webhooks with existing data, without modifying your precious data.

Useful for testing, but please use with care.  

## Usage

```sh
npm install --save graphcool-webhook-invoker
```

```javascript
import invoke from 'graphql-webhook-invoker'

const projectId = 'cj17fjzs741pu0113oub8rndw' // The ID of your project
const nodeId = 'cj17fk4k8b1750141v5mpai88' // The node ID to call the hook for
const trigger = 'CREATE' // The type of trigger to call the hook for
const token = '00COFFEE' // Your JWT access token

invoke(projectId, nodeId, trigger, token)
    .catch(error => console.log('Oh no: ', error)) 
    .then(res => 
        res.map(r => 
            console.log('Invoked: ', r.webhook, r.data, r.response)))

```

This will example would call the `CREATE` webhook for the node with id `cj17fk4k8b1750141v5mpai88` of project `cj17fjzs741pu0113oub8rndw`, as if it was called by graphcool .


## Limitations

`graphcool-webhook-invoker` is built upon undocumented APIs of graphcool. It might break without notice. 

Also, this project uses a very hacky way of resolving fragments for the webhook payload. It will, besides other things, break as soon as there are unmatching curly braces (`{`, `}`) inside strings.

## Why is this not a command line tool? 

There is currently no standardized way of locally storing graphcool JWTs. This migth change in the future, so I don't want to create a pseudo-standard for it. 

## Why should I use this? 

Micro-service architectures that tie many services together are easy to build with graphcool. These services are usually connected via webhooks. Webhooks that are coming from graphcool might be hard to debug, since fireing a webhook requires mutation of the corresponding data. This tool allows you to fire a webhook for a node without touching the corresponding data. 

While you should never use `graphcool-webhook-invoker` in production, it can be incredibly helpful when debugging webhooks. 


