export class CreateUserDto {
  name: string;
  last_name: string;
  email: string;
  cpf?: string; // hash
  password: string; // hash
  address_id?: number;
  business_hours?: any;
  CRM?: string; // hash
  rating?: number;
}
