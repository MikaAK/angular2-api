import {Http, RequestOptionsArgs} from '@angular/http'
import {Observable} from 'rxjs/Observable'

export interface ApiConfigArgs {
  basePath?: string
  deserialize: ((data: any|any[]) => any|any[])
  serialize: ((data: any|any[]) => any|any[])
  serializeParams: ((params: RequestOptionsArgs) => RequestOptionsArgs)
}

export abstract class AbstractApiConfig {
  basePath: string
  abstract deserialize(data: any|any[]): any|any[] 
  abstract serialize(data: any|any[]): any|any[]
  abstract serializeParams(params: RequestOptionsArgs): RequestOptionsArgs
}

export class ApiConfig {
  constructor({basePath, deserialize, serialize, serializeParams}: ApiConfigArgs)
  basePath: string
  deserialize: ((data: any|any[]) => any|any[])
  serialize: ((data: any|any[]) => any|any[])
  serializeParams: ((params: RequestOptionsArgs) => RequestOptionsArgs)
}

export const provideApiService: ((config: ApiConfig) => Array<any>)

export interface ApiResource {
  idAttribute?: string
  endpoint: string
 
  deserialize?(data: any): any
  serialize?(data: any): any
  serializeParams?(params: RequestOptionsArgs): RequestOptionsArgs
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
