declare module 'sendgrid-rest' {
  export interface Request {
    host: string,
    method: string,
    path: string,
    headers: {[key: string]: any},
    body: object | string,
    queryParams: {[key: string]: any},
    test: boolean,
    port: string,
  }

  export interface Response {
    statusCode: string,
    body: object | string,
    headers: {[key: string]: any},
  }
    
  export class Client {
    constructor(globalRequest: Request)
    public emptyRequest(): Request
    public API(endpointRequest: Request, callback: (response: Response) => void): void
  }

  export var emptyRequest: Request
  export var request: Request
}