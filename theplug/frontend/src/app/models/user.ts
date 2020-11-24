export interface User {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  age?: number;
  location?: string;
  phoneNumber?: string;
  skills?: Array<{ _id: string, name: string }>;
}
