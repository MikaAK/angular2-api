import {Http, RequestOptionsArgs} from 'angular2/http'
import {Observable} from 'rxjs/Observable'

export const provideApiService

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
  create?(data, params?: RequestOptionsArgs)
  update?(data, params?: RequestOptionsArgs)
  destroy?(id?: string|number|any, params?: RequestOptionsArgs)
}

export class ApiService {
  private _http
  basePath: string
  constructor(_http: Http)
  initialize(resource: ApiResource): void
  createUrl(resource: ApiResource, url: string|string[]): string
  get(resource: ApiResource, url: string|string[], params?: RequestOptionsArgs): Observable<any>
  put(resource: ApiResource, url: string|string[], data: any, params?: RequestOptionsArgs): Observable<any>
  patch(resource: ApiResource, url: string|string[], data: any, params?: RequestOptionsArgs): Observable<any>
  post(resource: ApiResource, url: string|string[], data: any, params?: RequestOptionsArgs): Observable<any>
  delete(resource: ApiResource, url: string|string[], params?: RequestOptionsArgs): Observable<any>
  find(resource: ApiResource, id: number|string, params?: any): Observable<any>
  findAll(resource: ApiResource, params?: any): Observable<any>
  create(resource: ApiResource, data: any, params?: any): Observable<any>
  update(resource: ApiResource, data: any, params?: any): Observable<any>
  destroy(resource: ApiResource, id?: number|string|any, params?: any): Observable<any>
  private _serialize(resource, data)
  private _deserialize(data)
  private _serializeParams(params)
}
