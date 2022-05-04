import React from 'react';

import MARKET_ICON from './icons/market.svg';
import NEWS_ICON from './icons/news.svg';
import AGENDA_ICON from './icons/agenda.svg';
import PAY_ICON from './icons/pay.svg';
import PASSEPORT_ICON from './icons/passport.svg';
import ANNUAIRE_ICON from './icons/annuaire.svg';
import CONTACT_ICON from './icons/contact.svg';
import MENU_ICON from './icons/menu.svg';
import CARTE_ICON from './icons/carte.svg';
import RUCHE_ICON from './icons/ruche.svg';
import { colors } from './colors';

const iconStyle = {
  width: 100,
  height: 100,
};

export const buttonList = [
  {
    width: 15,
    height: 15,
    x: 0,
    y: 0,
    title: 'home.show_news',
    redirection: 'NewsList',
    getIcon: on => <NEWS_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 0,
    title: 'home.show_agenda',
    redirection: 'Agenda',
    getIcon: on => <AGENDA_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
  },
  {
    width: 15,
    height: 15,
    x: 0,
    y: 16,
    title: 'home.market',
    redirection: 'WebViewStatic',
    getIcon: on => <MARKET_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
    params: {
      url: 'https://www.monein.fr/vivre-a-monein/economie/les-marches/',
      cacheKey: 'marches',
    },
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 16,
    title: 'home.paiement',
    redirection: 'WebViewStatic',
    getIcon: on => <PAY_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
    params: {
      url: 'https://www.monein.fr/demarches-administratives/paiement-pay-fip/',
      cacheKey: 'paiement',
    },
  },
  {
    width: 15,
    height: 15,
    x: 0,
    y: 32,
    title: 'home.rdv',
    redirection: 'WebViewStatic',
    getIcon: on => <PASSEPORT_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
    params: {
      url: 'https://www.monein.fr/demarches-administratives/etat-civil-et-citoyennete/carte-didentite-passeports/',
      cacheKey: 'rdv',
    },
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 32,
    title: 'home.commerce',
    redirection: 'WebViewDynamic',
    getIcon: on => <ANNUAIRE_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
    params: {
      url: 'https://www.monein.fr/?shop_category=&s=&form_shop=1',
      cacheKey: 'commerces',
    },
  },
  {
    width: 15,
    height: 15,
    x: 0,
    y: 48,
    title: 'home.contact',
    redirection: 'WebViewDynamic',
    getIcon: on => <CONTACT_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
    params: {
      url: 'https://www.monein.fr/la-mairie/contact-et-services/contact/',
      canNav: true,
    },
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 48,
    title: 'home.menu',
    redirection: 'WebViewStatic',
    getIcon: on => <MENU_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
    params: {
      url: 'https://www.monein.fr/vivre-a-monein/scolarite/le-restaurant-scolaire/menus-et-informations/',
      cacheKey: 'menu',
    },
  },
  {
    width: 15,
    height: 15,
    x: 0,
    y: 64,
    title: 'home.carte',
    redirection: 'Map',
    getIcon: on => <CARTE_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 64,
    title: 'home.ruche',
    redirection: 'WebViewDynamic',
    getIcon: on => <RUCHE_ICON style={iconStyle} fill={on ? colors.textLight : colors.mainColor} />,
    params: {
      url: 'https://www.monein.fr/vivre-a-monein/infos-pratiques-et-permanences/frelons-asiatiques-moustiques-tigre/',
      canNav: true,
    },
  },
];
