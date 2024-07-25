export class UpdateMedicalDto {
  name?: string;
  CRM?: string; // hash
  address_id?: number;
  email?: string;
  roles?: string[];
  status?: string;
  rating?: number;
}
