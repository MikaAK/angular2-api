import {RequestOptionsArgs} from 'angular2/http'

export interface ApiResource {
  idAttribute?: string
  endpoint: string
 
  deserialize?(data: any): any
  serialize?(data: any): any
  serializeParams?(params: any): any
 
  get?(url: string|string[], params?: RequestOptionsArgs)
  put?(url: string|string[], data?, params?: RequestOptionsArgs)
  patch?(url: string|string[], data?, params?: RequestOptionsArgs)
  post?(url: string|string[], data?, params?: RequestOptionsArgs)
  delete?(url: string|string[], params?: RequestOptionsArgs)
  find?(id: string|number, params?: RequestOptionsArgs)
  findAll?(params?: RequestOptionsArgs)
  create?(data?, params?: RequestOptionsArgs)
  update?(data, params?: RequestOptionsArgs)
  destroy?(id?: string|number|any, params?: RequestOptionsArgs)
}
