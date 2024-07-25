export class UpdateAppointmentDto {
  title?: string;
  description?: string;
  status?: string;
  event?: {
    start_date: Date;
    end_date: Date;
    attachments: { file_url: string; file_id: string }[];
    creator: { id: number; email: string; displayName: string };
    organizer: { id: number; email: string; displayName: string };
  };
}
