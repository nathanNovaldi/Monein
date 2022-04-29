import moment from 'moment';
import { News } from '../../News';

export default (data: any) => {
  const jsonNews: Array<News> = [];

  data.articles.forEach(
    (item: { url: any; title: any; publishedAt: any; urlToImage: any; content: any }, index: number) => {
      jsonNews.push({
        id: String(index),
        title: item.title,
        date: moment(item.publishedAt, 'YYYY-MM-DD hh:mm:ss'),
        imageUrl: item.urlToImage,
        text: item.content,
      });
    },
  );

  return jsonNews;
};
