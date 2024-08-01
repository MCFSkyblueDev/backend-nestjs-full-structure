import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { dataSourceOptions, seederOptions } from './database.config';

const seedData = async () => {

  const options: DataSourceOptions & SeederOptions = {
    ...dataSourceOptions,
    ...seederOptions,
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();
  await runSeeders(dataSource);
};

seedData().then(() => {
  console.log('Seeding successfully.');
}).catch((error) => {
  console.log('Seeding fail');
  console.error(error);
});

