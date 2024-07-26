export class CreateAppointmentDto {
  title: string;
  description: string;
  event: {
    start_date: Date;
    end_date: Date;
  };
  doctorId: number;
  patientId: number;
}
