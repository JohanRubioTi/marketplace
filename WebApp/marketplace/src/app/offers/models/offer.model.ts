export interface Offer {
  id: number;
  categoryId: number;
  userId: number;
  title: string;
  pictureUrl: string;
  description: string;
  location: string;
  publishedOn: Date;
}
