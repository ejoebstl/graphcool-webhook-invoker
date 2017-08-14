# Deprecated!

This project is deprecated, since graph.cool moved away from webhooks forever. 

---

![Build Status](https://travis-ci.org/ejoebstl/graphcool-webhook-invoker.svg?branch=master)

# graphcool-webhook-invoker

Test driven development, what could go wrong? :rocket: :see_no_evil:

Manually invokes [graphcool](http://graph.cool) webhooks with existing data.

Useful for testing, but please use with care.  

## Usage

#### As command line tool

```sh
npm install -g graphcool-webhook-invoker
```

```sh
graphcool-webhook-invoker \
    cj17fjzs741pu0113oub8rndw \ # The ID of your project 
    cj17fk4k8b1750141v5mpai88 \ # The node ID to call the hook for
    CREATE \ # The type of trigger to call the hook for
    eyJhbGciOiJub25lIiwidHlwIj... # Your JWT access token
```


#### As module

```sh
npm install --save graphcool-webhook-invoker
```

```javascript
import invoke from 'graphql-webhook-invoker'

const projectId = 'cj17fjzs741pu0113oub8rndw' // The ID of your project
const nodeId = 'cj17fk4k8b1750141v5mpai88' // The node ID to call the hook for
const trigger = 'CREATE' // The type of trigger to call the hook for
const token = 'eyJhbGciOiJub25lIiwidHlwIj...' // Your JWT access token

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

## Why should I use this? 

Architectures that tie many services together are easy to build with graphcool. These services are usually connected via webhooks. Webhooks which are coming from graphcool might be painful to debug, since fireing a webhook requires mutation of the corresponding data. This tool allows you to fire a webhook for a node without touching the corresponding data. 

While you should never use `graphcool-webhook-invoker` in production, it can be incredibly helpful when debugging webhooks. 


