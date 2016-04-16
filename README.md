# angular2-api
Api service for angular2 to work with REST resources

## Getting Started

```bash
$ npm i --save angular2-api
```

Add this to you're bootstrap file
```
import {ApiService, provideApiService} from 'angular2-api'

bootstrap(App, [
  ApiService
])

// To provide custom global deserialize/serialize/serializeParams
bootstrap(App, [
  provide(ApiConfig, {useValue: new ApiConfig({
    basePath: '/test',

    deserialize(data) {
      return data
    },

    serialize(data) {
      return data
    },

    serializeParams(data) {
      return data
    }
  })}),
  ApiService
])
```

## Using ApiService
The most common use case for api service would be to create resources

```javascript
import {Injectable} from 'angular2/core'
import {ApiResource, ApiService} from 'angular2-api'

@Injectable()
export class MyResource implements ApiResource {
  endpoint: string = 'my-endpoint'
  idAttribute: string = 'testId' // If not provided will use 'id'

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

export class MyComponent {
  constructor(apiService: ApiService, myResource: MyResource) {
    apiService.find(myResource, 1, ...args)
  }
}
```

## Methods
*For `url` you can pass an array of strings or a string*

- `ApiService.get(resource, url, [params])`
- `ApiService.put(resource, url, data, [params])`
- `ApiService.patch(resource, url, data, [params])`
- `ApiService.post(resource, url, data, [params])`
- `ApiService.delete(resource, url, [params])`
- `ApiService.find(resource, id, [params])`
- `ApiService.findAll(resource, [params])`
- `ApiService.create(resource, data, [params])`
- `ApiService.update(resource, [data, params])`
- `ApiService.destroy(resource, [id, params])`


