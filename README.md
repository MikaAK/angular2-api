# angular2-api
Api service for angular2 to work with REST resources

## Getting Started

```bash
$ npm i --save angular2-api
```

Add this to you're bootstrap file
```
import {ApiService, provideApiService} from 'angular2-api'
import {MyApi} from './MyApi'

const API_PROVIDERS = [MyApi]

bootstrap(App, [
  ApiService,
  ...API_PROVIDERS
])

// Alternitavly to provide custom config you can use 'provideApiService'
bootstrap(App, [
  provideApiService({
    baseUrl: 'myUrlBase',

    serialize(data) {
      return myTransform(data)
    },

    deserialize(data) {
      return myTransform(data)
    },

    serializeParams(data) {
      return myTransform(data)
    }
  }),
  ...API_PROVIDERS
])
```

## Using ApiService
The most common use case for api service would be to create resources

```javascript
import {Injectable} from 'angular2/core'
import {ApiResource, ApiService} from 'angular2-api'

@Injectable()
export class MyApi implements ApiResource {
  endpoint: string = 'my-endpoint'
  idAttribute: string = 'testId' // If not provided will use 'id'

  constructor(apiService: ApiService) {
    apiService.initialize(this)
  }

  deserialize(data) {
    return data
  }

  serialize(data) {
    return data
  }

  serializeParams(params) {
    return params
  }
}
```
after doing this `get/put/post/patch/delete/create/read/update/destroy` will all be put on `MyApi` for use

## Methods
***If you use `ApiService.initialize()` and setup you will not have to pass the resource in to apiService***

*For `url` you can pass an array of strings or a string*

`ApiService.get(resource, url, [params])`
`ApiService.put(resource, url, data, [params])`
`ApiService.patch(resource, url, data, [params])`
`ApiService.post(resource, url, data, [params])`
`ApiService.delete(resource, url, [params])`
`ApiService.find(resource, id, [params])`
`ApiService.findAll(resource, [params])`
`ApiService.create(resource, data, [params])`
`ApiService.update(resource, [data, params])`
`ApiService.destroy(resource, [id, params])`


