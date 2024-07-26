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
