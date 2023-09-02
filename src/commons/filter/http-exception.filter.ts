// http-exception.filter.ts

import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException) {
        const status = exception.getStatus();
        const message = exception.message;

        console.log('===========================');
        console.log('error!!');
        console.log('error content:', message);
        console.log('error code:', status);
        console.log('===========================');
    }
}
