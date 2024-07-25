import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  private appointments = [];

  createAppointment(data: any): any {
    // Implement appointment creation logic
    this.appointments.push(data);
    return { message: 'Appointment created successfully', appointment: data };
  }

  getAppointments(): any {
    // Implement get appointments logic
    return this.appointments;
  }

  updateAppointment(id: string, data: any): any {
    // Implement update appointment logic
    const appointmentIndex = this.appointments.findIndex(
      (appointment) => appointment.id === id,
    );
    if (appointmentIndex > -1) {
      this.appointments[appointmentIndex] = {
        ...this.appointments[appointmentIndex],
        ...data,
      };
      return {
        message: 'Appointment updated successfully',
        appointment: this.appointments[appointmentIndex],
      };
    }
    return { message: 'Appointment not found' };
  }
}
