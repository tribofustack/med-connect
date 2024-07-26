export class CreateUserDto {
  type: string;
  name: string;
  last_name: string;
  email: string;
  password: string; // hash
  cpf?: string; // hash
  CRM?: string; // hash
  address?: string;
  rating?: number;
}
