import {RequestOptionsArgs} from 'angular2/http'

export interface ApiResource {
  idAttribute?: string
  endpoint: string
 
  deserialize?(data: any): any
  serialize?(data: any): any
}
