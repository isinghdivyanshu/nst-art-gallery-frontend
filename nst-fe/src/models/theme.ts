export interface Theme {
  _id?: string;
  name: string;
  description: string;
  theme_images: string[];
  slug: string;
  work_title: string;
  work_description: string;
  work_images: string[];
  history: history[];
}
interface history{
  src: string,
  artist: {
    name: string,
    period: string
  },
  art: {
    title: string,
    year: string
  }
}