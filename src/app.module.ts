import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Emprestimo } from './Models/emprestimo.model';
import { EmprestimosController } from './Controllers/emprestimos.controller';
import { EmprestimosService } from './Services/emprestimos.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USUARIO_BANCO_DADOS,
      password: process.env.SENHA_BANCO_DADOS,
      database: 'livraria',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Emprestimo]),
  ],
  controllers: [EmprestimosController],
  providers: [
    EmprestimosService,
    {
      provide: 'IEmprestimosService',
      useClass: EmprestimosService,
    },
  ],
})
export class AppModule {}
