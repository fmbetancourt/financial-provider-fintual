import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: typeof errorResponse === 'object' && 'error' in errorResponse
        ? errorResponse['error']
        : exception.name,
      message: typeof errorResponse === 'object' && 'message' in errorResponse
        ? errorResponse['message']
        : exception.message,
    };

    this.logger.error(
      `HTTP Exception: ${exception.message}`,
      exception.stack,
      `${request.method} ${request.url}`,
    );

    response.status(status).json(responseBody);
  }
}
