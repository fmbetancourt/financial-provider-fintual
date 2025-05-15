import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const requestId = headers['x-request-id'] || '';

    const now = Date.now();
    this.logger.log(
      `Request: ${method} ${url} ${JSON.stringify(body)} - ${ip} - ${userAgent} - RequestID: ${requestId}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const responseTime = Date.now() - now;
          
          this.logger.log(
            `Response: ${method} ${url} ${response.statusCode} - ${responseTime}ms - RequestID: ${requestId}`,
          );
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          
          this.logger.error(
            `Error: ${method} ${url} - ${responseTime}ms - ${error.message} - RequestID: ${requestId}`,
          );
        },
      }),
    );
  }
}
