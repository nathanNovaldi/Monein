import agendaParser from './parseAgenda';
import newsParser from './parseNews';
import { buttonList } from './homeLayout';
import LOGO_SVG from './icons/logo.svg';

export const NEWS_URL = 'https://www.monein.fr/wp-json/wp/v2/posts/';
export const parseNews = newsParser;

export const AGENDA_URL = 'https://www.monein.fr/wp-json/tribe/events/v1/events';
export const parseAgenda = agendaParser;
export const AGENDA_MAP_ENABLED = false;

export const HOME_LAYOUT = buttonList;

export * from './colors';

export const LOGO = LOGO_SVG;

export const ONE_SIGNAL_APP_ID = '';
