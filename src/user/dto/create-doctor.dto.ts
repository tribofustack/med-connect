export class CreateDoctorDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  crm: string;
  cpf?: string;
  address?: string;
}
