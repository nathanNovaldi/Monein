/* @flow */

// TODO WHat to do ?
import 'moment/locale/fr';
import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import fr from './fr';
import en from './en';

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}
I18n.defaultLocale = 'fr';
I18n.fallbacks = true;
I18n.translations = {
  en,
  fr,
};

export default I18n;
