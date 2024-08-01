import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const maxSize : number = 1024;
    return value.size < maxSize;
  }
}