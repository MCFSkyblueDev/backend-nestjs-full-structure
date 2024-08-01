import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './database.config';

const clearData = async () => {

  const options: DataSourceOptions = {
    ...dataSourceOptions,
  };

  const dataSource = new DataSource(options);
  await (await dataSource.initialize())
    .synchronize(true);
};

clearData().then(() => {
  console.log('Reset database successfully.');
}).catch((error) => {
  console.log('Reset database fail');
  console.error(error);
});