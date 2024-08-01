import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => {
      if (Array.isArray(data)) {
        return data.map(item => {
          delete item?.updatedAt;
          delete item?.createdAt;
          return item;
        });
      } else if (typeof data === 'object') {
        if (data?._doc) { // Mongo data
          data = data._doc;
        }
        if (data?.data) { // Data in pagination form
          data.data?.map((item: any) => {
            delete item?.updatedAt;
            delete item?.createdAt;
            return item;
          });
          return data;
        }
        delete data?.updatedAt;
        delete data?.createdAt;
        return data;
      } else if (typeof data === 'string') { // Data in string
        return {
          message: data,
        };
      }
      return data;
    }));
  }

}