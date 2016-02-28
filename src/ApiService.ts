import {Injectable} from 'angular2/core'
import {Http, RequestOptionsArgs, Response, Headers} from 'angular2/http'
import {ApiResource} from './ApiResource'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

const removeSlashes = (url: string): string => {
  if (url.startsWith('/'))
    url = url.slice(1, url.length - 1)

  if (url.endsWith('/'))
    url = url.slice(0, url.length - 2)

  return url
}

const toJSON = (data: any): string => {
  try {
    return JSON.stringify(data)
  } catch(e) {
    return data
  }
}

const serializeParams = (params: any = {}) => {
  if (!params.headers)
    params.headers = new Headers({'Content-Type': 'applications/json'})

  return params
}

const deserializeResponse = (resp: Response) => {
  let contentType = resp && resp.headers && resp.headers.get('Content-Type')

  if (!contentType)
    return resp

  if (/json/.test(contentType))
    return resp.json()
  else if (/text/.test(contentType))
    return resp.text()
  else if (/blob/.test(contentType))
    return resp.blob()
  else
    return resp
}

const resourceDeserialize = (resource) => {
  return (data) => typeof resource.deserialize === 'function' ? resource.deserialize(data) : data
}

@Injectable()
export class ApiService {
  public basePath: string = '/api'

  constructor(private _http: Http) {}

  public initialize(resource: ApiResource) {
    resource.get = this.get.bind(this, resource)
    resource.post = this.post.bind(this, resource)
    resource.patch = this.patch.bind(this, resource)
    resource.put = this.put.bind(this, resource)
    resource.delete = this.delete.bind(this, resource)
    resource.find = this.find.bind(this, resource)
    resource.findAll = this.findAll.bind(this, resource)
    resource.create = this.create.bind(this, resource)
    resource.update = this.update.bind(this, resource)
    resource.destroy = this.destroy.bind(this, resource)
  }

  public createUrl(resource: ApiResource, url: string|string[]): string {
    let qUrl = Array.isArray(url) ? url.join('/') : url

    return `${removeSlashes(resource.endpoint)}/${removeSlashes(this.basePath)}/${removeSlashes(qUrl)}`
  }

  public get(resource: ApiResource, url: string|string[], params?: RequestOptionsArgs): Observable<any> {
    return this._http.get(this.createUrl(resource, url), this._serializeParams(params))
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public put(resource: ApiResource, url: string|string[], data?: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.put(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public patch(resource: ApiResource, url: string|string[], data?: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.patch(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public post(resource: ApiResource, url: string|string[], data?: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.post(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public delete(resource: ApiResource, url: string|string[], params?: RequestOptionsArgs): Observable<any> {
    return this._http.get(this.createUrl(resource, url), this._serializeParams(params))
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public find(resource: ApiResource, id: number|string|any, params?) {
    if (!id)
      throw new Error('You must provide an id')

    return this.get(resource, <string>id, params)
  }

  public findAll(resource: ApiResource, params?) {
    return this.get(resource, '', params)
  }

  public create(resource: ApiResource, data?, params?) {
    return this.post(resource, '', data, params)
  }

  public update(resource: ApiResource, data, params?) {
    let id = data[resource.idAttribute],
        url = id ? id : ''

    return this.put(resource, url, data, params)
  }

  public destroy(resource: ApiResource, id?: number|string, params?) {
    if (typeof id === 'object') {
      params = id
      id = null
    }

    return this.delete(resource, id ? <string>id : '', params)
  }

  private _serialize(resource: ApiResource, data): any {
    var nData = toJSON(data)

    return resource.serialize ? resource.serialize(nData) : nData
  }

  private _deserialize(data): any|any[] {
    return deserializeResponse(data)
  }

  private _serializeParams(params): RequestOptionsArgs {
    return serializeParams(params)
  }
}
