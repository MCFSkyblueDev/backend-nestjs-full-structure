import { Module } from '@nestjs/common';
import { PostgresModelModule } from '@model/postgres/model.module';
import { MongoModelModule } from '@model/mongo/model.module';


@Module({
  imports: [
    PostgresModelModule,
    MongoModelModule
  ],
  exports: [
    PostgresModelModule,
    MongoModelModule
  ],
})
export class ModelModule {
}