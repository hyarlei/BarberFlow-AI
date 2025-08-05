import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
  error?: string;
  details?: any;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string | string[];
    let error: string;
    let details: any;

    if (exception instanceof HttpException) {
      // Handle NestJS HTTP exceptions
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.name;
      } else {
        message = (exceptionResponse as any).message || exception.message;
        error = (exceptionResponse as any).error || exception.name;
        details = (exceptionResponse as any).details;
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma database errors
      statusCode = HttpStatus.BAD_REQUEST;
      error = 'Database Error';
      
      switch (exception.code) {
        case 'P2002':
          message = 'Recurso já existe. Verifique os dados únicos.';
          details = {
            field: exception.meta?.target,
            constraint: 'unique_violation',
          };
          break;
        case 'P2025':
          message = 'Recurso não encontrado.';
          statusCode = HttpStatus.NOT_FOUND;
          break;
        case 'P2003':
          message = 'Violação de chave estrangeira.';
          details = {
            field: exception.meta?.field_name,
            constraint: 'foreign_key_violation',
          };
          break;
        default:
          message = 'Erro interno do banco de dados.';
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Erro interno do banco de dados.';
      error = 'Database Error';
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Dados inválidos fornecidos.';
      error = 'Validation Error';
    } else {
      // Handle unknown errors
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Erro interno do servidor.';
      error = 'Internal Server Error';
      
      // Log the full error for debugging
      this.logger.error('Unhandled exception:', exception);
    }

    const errorResponse: ErrorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
      ...(details && { details }),
    };

    // Log the error
    this.logger.error(
      `${request.method} ${request.url} - ${statusCode} - ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(statusCode).json(errorResponse);
  }
}
