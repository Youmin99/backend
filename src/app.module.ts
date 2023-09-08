// app.module.ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './apis/boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { BoardsCommentModule } from './apis/boardsComment/boardsComment.module';
import { FilesModule } from './apis/file/files.module';
import { JwtAccessStrategy } from './apis/auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './apis/auth/strategies/jwt-refresh.strategy';

@Module({
    imports: [
        AuthModule, //
        BoardsModule,
        UsersModule,
        BoardsCommentModule,
        FilesModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],

    providers: [
        JwtAccessStrategy, //
        JwtRefreshStrategy,
    ],
})
export class AppModule {}
