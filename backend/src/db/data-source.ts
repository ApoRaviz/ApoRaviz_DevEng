import 'dotenv/config';
import { DataSource } from 'typeorm';

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}
export const appDataSource = new DataSource({
    type: 'postgres',
    host: requiredEnv('DB_HOST'),
    port: Number(requiredEnv('DB_PORT')),
    username: requiredEnv('DB_USERNAME'),
    password: requiredEnv('DB_PASSWORD'),
    database: requiredEnv('DB_NAME'),
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'migrations',
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
});