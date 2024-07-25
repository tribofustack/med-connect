import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async login(credentials: any): Promise<any> {
    return this.client.send({ cmd: 'login' }, credentials).toPromise();
  }

  async register(data: any): Promise<any> {
    return this.client.send({ cmd: 'register' }, data).toPromise();
  }
}
