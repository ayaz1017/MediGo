export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
}

export interface Address {
  id: string;
  type: "Home" | "Office" | "Other";
  name: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  flat: string;
  area: string;
  landmark?: string;
}
