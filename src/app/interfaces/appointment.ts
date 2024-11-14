// appointment.model.ts
export interface Appointment {
  id: number;
  pet?: {
    id: number;
    name: string;
  };
  professional?: {
    id: number;
    firstname: string;
    lastname: string;
  };
  facility?: {
    id: number;
    name: string;
  };
  dateTime: Date
}