import {provide} from 'angular2/core'
import {it, inject, beforeEachProviders} from 'angular2/testing'
import {MockBackend} from 'angular2/http/testing'
import {Http, BaseRequestOptions, Response, Headers, ResponseOptions} from 'angular2/http'
import {ApiService} from '../src/ApiService.ts'
import {ApiResource} from '../src/ApiResource'
import {Observable} from 'rxjs/Observable'

const mockResponse = (backend, config) => backend.connections.subscribe(c => c.mockRespond(new Response(new ResponseOptions(config))))
const TEST_DATA = {
  test: 'data'
}

const testHttpMethod = (mType, cb: ((api: ApiService, resource: ApiResource) => Observable<any>)) => {
  it(`takes url and params and creates ${mType.toUpperCase()} request`, inject([ApiService, MockBackend, ExampleApi], (api: ApiService, backend: MockBackend, example: ExampleApi) => {
    mockResponse(backend, {body: JSON.stringify(TEST_DATA)})

    cb(api, example)
      .map(data => data.json())
      .subscribe(posts => expect(posts).toEqual(TEST_DATA))
  }))
}

class ExampleApi implements ApiResource {
  endpoint = 'example'
}

describe('ApiService', () => {
  beforeEachProviders(() => [
    MockBackend,
    ApiService,
    BaseRequestOptions,
    ExampleApi,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ])

  describe('#get', () => testHttpMethod('get', (api, resource) => api.get(resource, 'test')))
  describe('#post', () => testHttpMethod('post', (api, resource) => api.post(resource, 'test', TEST_DATA)))
  describe('#patch', () => testHttpMethod('patch', (api, resource) => api.patch(resource, 'test', TEST_DATA)))
  describe('#put', () => testHttpMethod('put', (api, resource) => api.put(resource, 'test', TEST_DATA)))
  describe('#delete', () => testHttpMethod('delete', (api, resource) => api.delete(resource, 'test')))

  describe('#find', () => {

  })

  describe('#findAll', () => {

  })

  describe('#create', () => {

  })

  describe('#update', () => {

  })

  describe('#destroy', () => {

  })
})
