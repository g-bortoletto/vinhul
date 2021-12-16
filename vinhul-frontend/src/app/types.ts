export interface User {
  email: string;
  name: string;
  password: string;
}

export interface Wine {
  _id?: string;
  name: string;
  origin: string;
  type: string;
  grapeType?: string;
  foodHarmony?: string;
  grapetype?: string;
  foodharmony?: string;
  image: string;
}