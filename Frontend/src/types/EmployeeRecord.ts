export type EmployeeRecord = {
  id: string;
  gender: string;
  name: { title: string; first: string; last: string };
  dob: { age: number; date: string };
  location: { city: string; country: string };
  email: string;
  phone: string;
  picture: { medium: string; large: string };
};
