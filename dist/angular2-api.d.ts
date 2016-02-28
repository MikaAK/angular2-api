import { Http, RequestOptionsArgs } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

export interface ApiResource {
    idAttribute?: string;
    endpoint: string;
    deserialize?(data: any): any;
    serialize?(data: any): any;
    serializeParams?(params: any): any;
}

export class ApiService {
    private _http;
    basePath: string;
    constructor(_http: Http);
    createUrl(resource: ApiResource, url: string | string[]): string;
    get(resource: any, url: any, params?: RequestOptionsArgs): Observable<any>;
    put(resource: any, url: any, data: any, params?: RequestOptionsArgs): Observable<any>;
    patch(resource: any, url: any, data: any, params?: RequestOptionsArgs): Observable<any>;
    post(resource: any, url: any, data: any, params?: RequestOptionsArgs): Observable<any>;
    delete(resource: any, url: any, params?: RequestOptionsArgs): Observable<any>;
    find(resource: any, id: number | string, params: any): Observable<any>;
    findAll(resource: any, params: any): Observable<any>;
    create(resource: any, data: any, params: any): Observable<any>;
    update(resource: any, data: any, params: any): Observable<any>;
    destroy(resource: any, id: any, params: any): Observable<any>;
    private _serialize(resource, data);
    private _deserialize(data);
    private _serializeParams(params);
}
