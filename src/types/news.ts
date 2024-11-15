export interface Data {
  count: number;
  eof: boolean;
  news: NewsType[];
  next: number;
}
export interface NewsType {
  abstract: string;
  article_uri: string;
  author: string;
  body: string;
  headline: string;
  id: number;
  section: string;
  date: string;
  pfd_uri: string;
}
export enum Topics {
  worldNews = "world news",
  sport = "sport",
  finance = "finance",
  technology = "technology",
  entertainment = "entertainment",
}
export interface NewsState {
  news: NewsType[];
  isLoading: boolean;
  nextPage: number;
  eof: boolean;
  topic: Topics;
}