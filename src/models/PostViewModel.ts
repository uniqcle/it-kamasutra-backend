export type ViewModel = {
  _id?: string;
  id: string | number;
  userId: number;
  title: string;
  body: string;
};

export type NoTitleResponse = {
  message: string;
};