import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { colors } from '../../config/config';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import Menu from '../menuBottom/Menu';

type Props = {
  route: { params: { url: 'string'; html: string; cacheKey: string } };
};

export const WebViewStaticHtmlScreen = inject('newsStore')(
  observer((props: Props) => {
    const [source, setSource] = useState<{ html: string; fromCache: boolean }>({ html: '', fromCache: false });
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      async function fetchData() {
        const value = await AsyncStorage.getItem(props.route.params.url);

        if (value) {
          setSource({ html: value, fromCache: true });
        }

        const resp = await axios.get(props.route.params.url);

        if (resp.status === 200) {
          let { data } = resp;
          if (data) {
            data = data.replace(/<div [^>]*\bid="return-to-top"[^>]*>(.|\n)*?<\/div>/g, '');

            data = data.replace(/<header[^>]*\bid="masthead"[^>]*>(.|\n)*?<\/header>/g, '');
            data = data.replace(/<footer[^>]*>(.|\n)*?<\/footer>/g, '');
            data = data.replace('tarteaucitron', '');
            data = data.replace('<div class="wrap-tools">', '<div class="wrap-tools" style="display:none!important;">');
            data = data.replace(
              '<div class="site-branding-container">',
              '<div class="site-branding-container" style="display:none!important;">',
            );
            data = data.replace(
              '<div class="page-featured-img">',
              '<div class="page-featssured-img" style="display:none!important;">',
            );
            data = data.replace(
              '<div class="sharedaddy sd-sharing-enabled">',
              '<div class="sharedaddy sd-sharing-enabled" style="display:none!important;">',
            );
            data = data.replace(
              '<div class="wrap-internal-linking has-dotted-background">',
              '<div class="wrap-internal-linking has-dotted-background" style="display:none!important;">',
            );

            AsyncStorage.setItem(props.route.params.url, data);
            // if (!value) {
            setSource({ html: data, fromCache: false });
            // }
          }
        }
      }

      if (source.html === '') {
        fetchData();
      }
    });

    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner loading={loading} color={colors.mainColor} />

        <WebView
          sharedCookiesEnabled={false}
          cacheEnabled
          onLoadEnd={() => {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
          textZoom={80}
          cacheMode={source.fromCache ? 'LOAD_CACHE_ELSE_NETWORK' : 'LOAD_DEFAULT'}
          source={{ html: source.html }}
          androidLayerType="hardware"
          style={{ backgroundColor: 'transparent', height: 8000 }}
          originWhitelist={['*']}
        />
        <Menu />
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
  },
  list: {
    height: '100%',
    flex: 1,
  },
  line: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: colors.darkGrey,
    height: 1,
    marginVertical: 3,
  },
});
