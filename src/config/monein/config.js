import { buttonList } from './homeLayout';
import agendaParser from './parseAgenda';
import newsParser from './parseNews';
import markersParser from './parseMarkers';
import LOGO_SVG from './icons/logo.svg';

export const NEWS_URL = 'https://www.monein.fr/wp-json/wp/v2/posts/';
export const parseNews = newsParser;

export const AGENDA_URL = 'https://www.monein.fr/wp-json/tribe/events/v1/events/';
export const parseAgenda = agendaParser;
export const AGENDA_MAP_ENABLED = false;

export const MARKERS_URL =
  'https://www.monein.fr/wp-admin/admin-ajax.php?action=mapp_query&list=true&query%5bpost_type%5d=cpt_map&query%5bposts_per_page%5d=-1';
export const parseMarkers = markersParser;

export const HOME_LAYOUT = buttonList;

export const LOGO = LOGO_SVG;

export * from './colors';

export const ONE_SIGNAL_APP_ID = '8c7dc9e0-43a8-4ec4-b340-6bea17b7d118';
