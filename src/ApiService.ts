import {Injectable} from 'angular2/core'
import {Http, RequestOptionsArgs, Response, Headers} from 'angular2/http'
import {ApiResource} from './ApiResource'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

const addSlash = (url: string): string => url.endsWith('/') ? url : `${url}/`

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
  public basePath: string = '/'

  constructor(private _http: Http) {}

  public createUrl(resource: ApiResource, url: string|string[]): string {
    let qUrl = Array.isArray(url) ? url.join('/') : url

    return addSlash(resource.endpoint) + addSlash(this.basePath) + url
  }

  public get(resource, url, params?: RequestOptionsArgs): Observable<any> {
    return this._http.get(this.createUrl(resource, url), this._serializeParams(params))
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public put(resource, url, data: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.put(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public patch(resource, url, data: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.patch(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public post(resource, url, data: any, params?: RequestOptionsArgs): Observable<any> {
    return this._http.post(this.createUrl(resource, url), this._serialize(resource, data), params)
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public delete(resource, url, params?: RequestOptionsArgs): Observable<any> {
    return this._http.get(this.createUrl(resource, url), this._serializeParams(params))
      .map(data => this._deserialize(data))
      .mergeMap(resourceDeserialize(resource))
  }

  public find(resource, id: number|string, params) {
    if (!id)
      throw new Error('You must provide an id')

    return this.get(resource, id, params)
  }

  public findAll(resource, params) {
    return this.get(resource, '', params)
  }

  public create(resource, data, params) {
    return this.post(resource, '', data, params)
  }

  public update(resource, data, params) {
    let id = data[resource.idAttribute],
        url = id ? id : ''

    return this.put(resource, url, data, params)
  }

  public destroy(resource, id, params) {
    return this.delete(resource, id ? id : '', params)
  }

  private _serialize(resource, data): any {
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
