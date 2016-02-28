import {provide} from 'angular2/core'
import {Http} from 'angular2/http'
import {ApiService} from './ApiService'
import {ApiResource} from './ApiResource'

export {ApiService, ApiResource}

export interface ApiConfig {
  basePath?: string
  deserialize?: ((data: any) => any)
  serialize?: ((data: any) => any)
  serializeParams?: ((params: any) => any)
}

const wrapMethod = (api, method, wrapper) => {
  let oldMethod = api[method].bind(api)

  api[method] = (...args) => wrapper(oldMethod(...args))
}

const createApiService = ({basePath, deserialize, serialize, serializeParams}: ApiConfig) => {
  return (http: Http) => {
    const api = new ApiService(http)

    if (basePath)
      api.basePath = basePath

    if (deserialize)
      wrapMethod(api, '_deserialize', deserialize)

    if (serialize)
      wrapMethod(api, '_serialize', serialize)

    if (serializeParams)
      wrapMethod(api, '_serializeParams', serializeParams)

    return api
  }
}

export const provideApiService = (config: ApiConfig) => {
  return [provide(ApiService, {useFactory: createApiService(config), deps: [Http]})]
}
