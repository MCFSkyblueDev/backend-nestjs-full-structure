import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => {
      if (!Array.isArray(data)) return data;
      const request = context.switchToHttp().getRequest();
      const page = Number(request.query?.page) && Number(request.query.page) > 0 ? Number(request.query.page) : 1;
      const limit = Number(request.query?.limit) && Number(request.query.limit) > 0 ? Number(request.query.limit) : 10;
      const takenData = data.slice((page - 1) * limit, limit);
      const totalPages = Math.ceil(data.length / limit);
      return {
        data: takenData,
        currentPage: page,
        totalPages,
        totalItems: data.length,
        pageSize: limit,
      };
    }));
  }

}