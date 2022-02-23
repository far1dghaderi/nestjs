import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //everything to do before request reaches to the route handler
    console.log("Hey, I didn't reach to route handler yet " + context);

    return next.handle().pipe(
      map((data: any) => {
        //everything to do before we send back the response
        console.log(
          "Hey, I'm going to send the response to the client " + data,
        );
      }),
    );
  }
}
