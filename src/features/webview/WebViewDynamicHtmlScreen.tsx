import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native-interactable';
import WebView from 'react-native-webview';
import { colors } from '../../config/config';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import Menu from '../menuBottom/Menu';

type Props = { route: { params: { url: 'string'; canNav: boolean } } };

let webViewRef: WebView | null;

export const WebViewDynamicHtmlScreen = inject('newsStore')(
  observer((props: Props) => {
    const [uri, setUri] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [canGoBack, setCanGoBack] = useState<boolean>(false);

    const navigation = useNavigation();
    // navigation.setOptions({ headerLeft: () => <></> });

    useEffect(() => {
      navigation.addListener('beforeRemove', e => {
        if (webViewRef && canGoBack) {
          webViewRef.goBack();
          setCanGoBack(false);
          e.preventDefault();
        }
      });

      async function fetchData() {
        if (!uri) setUri(props.route.params.url);
      }
      fetchData();
    });

    const runFirst = `
        document.getElementsByClassName('wrap-tools')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('site-header')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('wrap-internal-linking')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('site-footer')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('sharedaddy')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('site-branding-container')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('page-featured-img')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('page-banner')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('sharedaddy')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('site-footer')[0]?.style.setProperty("display", "none", "important")
        document.getElementsByClassName('monein-contact')[0]?.style.setProperty("display", "none", "important")
        document.getElementById('tarteaucitronRoot')?.style.setProperty("display", "none", "important")
        document.getElementById('return-to-top')?.style.setProperty("display", "none", "important")

        var functionToCall = ()=>{
          document.getElementsByClassName('wrap-tools')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('site-header')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('wrap-internal-linking')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('site-footer')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('sharedaddy')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('site-branding-container')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('page-featured-img')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('page-banner')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('sharedaddy')[0]?.style.setProperty("display", "none", "important")
          document.getElementsByClassName('site-footer')[0]?.style.setProperty("display", "none", "important")
          document.getElementById('tarteaucitronRoot')?.style.setProperty("display", "none", "important")
          document.getElementById('return-to-top')?.style.setProperty("display", "none", "important")
          document.getElementById('return-to-top')?.style.setProperty("width", "0", "important")
          document.getElementsByClassName('monein-contact')[0]?.style.setProperty("display", "none", "important")

          setTimeout(()=>{
            window.ReactNativeWebView.postMessage("done");
          }, 1000);
  
         };
       setTimeout(functionToCall, 500);

       $.ajax({
        // Your other options here
        complete: functionToCall
     });

        true; // note: this is required, or you'll sometimes get silent failures
      `;
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner loading={loading} color={colors.mainColor} />

        <View style={loading ? { height: 1 } : { flex: 1 }}>
          <WebView
            textZoom={80}
            sharedCookiesEnabled={false}
            ref={ref => {
              webViewRef = ref;
            }}
            onMessage={() => {
              setLoading(false);
            }}
            onLoadStart={() => {
              setLoading(true);
            }}
            onStartShouldSetResponderCapture={() => {
              return true;
            }}
            onShouldStartLoadWithRequest={params => {
              if (props.route.params.canNav) {
                return true;
              } else {
                navigation.navigate('WebViewStatic', { url: params.url });
                return false;
              }
            }}
            startInLoadingState
            source={{ uri }}
            injectedJavaScript={runFirst}
            style={{ backgroundColor: 'transparent' }}
            originWhitelist={['*']}
          />
        </View>
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
