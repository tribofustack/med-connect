export class CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
  address?: string;
}
