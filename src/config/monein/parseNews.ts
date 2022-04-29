import moment from 'moment';
import { decode } from 'html-entities';
import { News } from '../../features/news/News';

export default (data: any) => {
  const jsonNews: Array<News> = [];

  data.forEach((item: any) => {
    jsonNews.push({
      id: String(item.id),
      title: decode(item.title.rendered),
      date: moment(item.date, 'YYYY-MM-DDThh:mm:ss'),
      imageUrl: item.jetpack_featured_media_url,
      text: item.content.rendered || item.excerpt.rendered,
    });
  });

  return jsonNews;
};
