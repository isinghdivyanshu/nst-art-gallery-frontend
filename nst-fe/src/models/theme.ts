export interface Theme {
  _id?: string;
  theme_title: string;
  theme_description: string;
  theme_images: string[];
  slug: string;
  work_title: string;
  info_link?: string;
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