export class CreateFileDto {
  title: string;
  description: string;
  old_file_id: string;
  metadata: any;
  userId: number;
  roles: string[];
}
