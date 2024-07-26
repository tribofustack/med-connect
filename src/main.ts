import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.startAllMicroservices();

  const amqpUrl = `amqp://${env.AMQP_HOST}:${env.AMQP_PORT}`;
  const queueName = 'appointments_queue';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [amqpUrl],
      queue: queueName,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen(env.PORT);
}

bootstrap();

/**
  autenticação -POST /auth
  create users -POST /users
  get appointments by doctorId - GET /appointments/doctors/:id
  get appointments by userId - GET /appointments/users/:id
  request appoinment - POST /appointments/request
  create doctors - POST /doctors
  create appointment (business_hours) - POST appointments/register
  response appointment (approve business_hours request) - PUT /appointments/response
  list doctors - GET /doctors

  POST /auth
  POST /users
  GET /appointments/doctors/:id
  GET /appointments/users/:id
  POST /appointments/request
  POST /doctors
  POST /appointments/register
  PUT /appointments/response
  GET /doctors
*/
