import {Injectable} from 'angular2/core'
import {Http, RequestOptionsArgs, Response, Headers} from 'angular2/http'
import {ApiResource} from './ApiResource'
import {ApiConfig} from './ApiConfig'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'

const removeSlashes = (url: string): string => {
  if (url.startsWith('/'))
    url = url.slice(1, url.length)

  if (url.endsWith('/'))
    url = url.slice(0, url.length - 1)

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
  let contentType = resp && resp.headers && (resp.headers.get('content-type') || resp.headers.get('Content-Type'))

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
  return (data) => {
    return typeof resource.deserialize === 'function' ? resource.deserialize(data) : data
  }
}

@Injectable()
export class ApiService {
  constructor(private _http: Http, private _config: ApiConfig) {}

  public createUrl(resource: ApiResource, url: string|string[]): string {
    let qUrl = String(Array.isArray(url) ? url.join('/') : url)

    return `${removeSlashes(this._config.basePath)}/${removeSlashes(resource.endpoint)}/${removeSlashes(qUrl)}`
  }

  public get(resource: ApiResource, url: string|string[], params?: RequestOptionsArgs): Observable<any> {
    return this._http.get(this.createUrl(resource, url), this._serializeParams(params))
      .map(data => this._deserialize(data))
      .map(resourceDeserialize(resource))
  }

  public put(resource: ApiResource, url: string|string[], data?: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.put(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .map(resourceDeserialize(resource))
  }

  public patch(resource: ApiResource, url: string|string[], data?: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.patch(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .map(resourceDeserialize(resource))
  }

  public post(resource: ApiResource, url: string|string[], data?: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.post(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .map(resourceDeserialize(resource))
  }

  public delete(resource: ApiResource, url: string|string[], params?: RequestOptionsArgs): Observable<any> {
    return this._http.get(this.createUrl(resource, url), this._serializeParams(params))
      .map(data => this._deserialize(data))
      .map(resourceDeserialize(resource))
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
    var nData = resource.serialize ? resource.serialize(nData) : nData

    return toJSON(this._config.serialize(nData))
  }

  private _deserialize(data: any): any|any[] {
    return this._config.deserialize(deserializeResponse(data))
  }

  private _serializeParams(params): RequestOptionsArgs {
    return this._config.serializeParams(serializeParams(params))
  }
}
