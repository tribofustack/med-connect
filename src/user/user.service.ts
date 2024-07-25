import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  createUser(data: any): any {
    // Implement user creation logic
    this.users.push(data);
    return { message: 'User created successfully', user: data };
  }

  getUser(id: string): any {
    // Implement get user logic
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: string, data: any): any {
    // Implement update user logic
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...data };
      return {
        message: 'User updated successfully',
        user: this.users[userIndex],
      };
    }
    return { message: 'User not found' };
  }
}
