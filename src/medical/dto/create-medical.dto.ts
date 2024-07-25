export class CreateMedicalDto {
  name: string;
  CRM: string; // hash
  address_id: number;
  email: string;
  roles: string[];
  password: string; // hash
}
