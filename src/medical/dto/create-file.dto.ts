export class CreateFileDto {
  title: string;
  description: string;
  old_file_id: string;
  metadata: any;
  patientId: number;
  roles: string[];
}
