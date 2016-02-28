export interface ApiResource {
 idAttribute?: string
 endpoint: string

 deserialize?(data: any): any
 serialize?(data: any): any
 serializeParams?(params: any): any
}
