export type Subscriber = {
  email: string;
};

export type ContactEntry = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: string;
};
