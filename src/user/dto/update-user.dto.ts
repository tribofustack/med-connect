export class UpdateUserDto {
  name?: string;
  last_name?: string;
  email?: string;
  address_id?: number;
  status?: string;
  business_hours?: any;
  CRM?: string; // hash
  rating?: number;
}
