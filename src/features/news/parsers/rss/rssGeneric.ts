import moment from 'moment';
import * as RSSReader from 'react-native-rss-parser';
import { News } from '../../News';

// Map rss struct to our news model
export default (input: string) => {
  return RSSReader.parse(input).then(rss => {
    const rssNews: Array<News> = [];
    rss.items.forEach(item => {
      rssNews.push({
        id: item.id,
        title: item.title,
        date: moment(item.published),
        imageUrl: item.enclosures[0].url,
        text: item.content,
      });
    });
    return rssNews;
  });
};
