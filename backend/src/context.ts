import { Injectable, NestMiddleware } from '@nestjs/common';
import { createNamespace, getNamespace, Namespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable */
export class Context {
  private request: Request;
  private response: Response;
  private readonly requestId: string;

  private environmentId: string;
  private lChainId: string;
  private accountId: string;

  constructor(request: Request, response: Response, requestId: string) {
    this.request = request;
    this.response = response;
    this.requestId = requestId;

    this.environmentId = this.request.get('x-environment-id')
    this.lChainId = this.request.get('x-lChain-id') || this.request.get('x-lchain-id')
    this.accountId = this.request.get('x-account-id')
  }

  public getRequestId(): string {
    return this.requestId;
  }

  public getRequest(): Request {
    return this.request;
  }

  public getResponse(): Response {
    return this.response;
  }
}


export class RequestContext {
  public static readonly NAMESPACE = 'lunvs.namespace';
  public static readonly CONTEXT_ID = 'CONTEXT_ID';

  public static set(name: string, value: any) {
    const namespace: Namespace = RequestContext.currentRequestNamespace();
    namespace.set(name, value);
  }

  public static get(name: string): any {
    const namespace: Namespace = RequestContext.currentRequestNamespace();
    return namespace.get(name);
  }

  public static currentContext(): Context {
    const namespace: Namespace = RequestContext.currentRequestNamespace();
    return namespace.get(RequestContext.CONTEXT_ID);
  }

  public static getCurrentRequestId(): string {
    const namespace: Namespace = RequestContext.currentRequestNamespace();
    if(!namespace) return '';
    const context = namespace.get(RequestContext.CONTEXT_ID) as Context;
    if(!context) return '';
    return context.getRequestId()
  }

  public static currentRequestNamespace(): Namespace {
    return getNamespace(RequestContext.NAMESPACE) || createNamespace(RequestContext.NAMESPACE) as Namespace;
  }
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    let requestId = req.get('x-request-id')
    if(!requestId) {
      requestId = uuidv4();
    }
    let reqContext = new Context(req, res, requestId);

    const namespace: Namespace = RequestContext.currentRequestNamespace();
    namespace.run(() => {
      namespace.set(RequestContext.CONTEXT_ID, reqContext);
      // namespace.set(requestId, reqContext);
      next();
    });
  }
}
