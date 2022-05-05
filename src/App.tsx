import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { TransitionPresets, createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import { SplashScreen } from './features/splash/SplashScreen';
import { HomeScreen } from './features/home/HomeScreen';
import { MenuScreen } from './features/menu/MenuScreen';
import { newsStore } from './features/news/NewsStore';
import { agendaStore } from './features/agenda/AgendaStore';
import { recyclingStore } from './features/recycling/RecyclingStore';
import { NewsListScreen } from './features/news/NewsListScreen';
import { NewsDetailScreen } from './features/news/NewsDetailScreen';
import { fonts } from './shared/theme/fonts';
import { sizes } from './shared/theme/sizes';
import { AgendaDetailScreen } from './features/agenda/AgendaDetailScreen';
import { AgendaScreen } from './features/agenda/AgendaScreen';
import { RecyclingScreen } from './features/recycling/RecyclingScreen';
import { MapScreen } from './features/map/MapScreen';
import { RucheScreen } from './features/ruche/RucheScreen';
import { MapDetailScreen } from './features/map/MapDetailScreen';
import { colors, LOGO, ONE_SIGNAL_APP_ID } from './config/config';
import { WebViewDynamicHtmlScreen } from './features/webview/WebViewDynamicHtmlScreen';
import { WebViewStaticHtmlScreen } from './features/webview/WebViewStaticHtmlScreen';
import OneSignal from 'react-native-onesignal';
import Log from './shared/Log';
import NotificationsScreen from './features/notifications/NotificationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { oneSignalSubscription, setItemAsyncStorage } from './features/notifications/utils';
import { checkboxes } from './features/notifications/components/checkbox';
import { StyleSheet } from 'react-native';

type RootStackParamList = {
  HomeScreen: undefined;
  DetailsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(ONE_SIGNAL_APP_ID);
// END OneSignal Init Code

// Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  Log.d('OneSignal', 'Prompt response:', response);
});

// Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  Log.d('OneSignal', 'OneSignal: notification will show in foreground:', notificationReceivedEvent);
  const notification = notificationReceivedEvent.getNotification();
  Log.d('OneSignal', 'notification: ', notification);
  const data = notification.additionalData;
  Log.d('OneSignal', 'additionalData: ', data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

// Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  Log.d('OneSignal', 'OneSignal: notification opened:', notification);
});

const stores = {
  newsStore,
  agendaStore,
  recyclingStore,
};

function LogoTitle() {
  return <LOGO style={styles.LOGO} />;
}

const generalNavigatorOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: colors.textLight,
    fontFamily: fonts.regular,
    fontSize: sizes.large,
  },
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: colors.navBarColor,
  },
  headerBackTitleStyle: {
    color: colors.navBarIconColor,
    left: 5,
  },
  headerTitle: () => <LogoTitle />,
  // eslint-disable-next-line react-native/no-inline-styles
  headerBackImage: () => <AntDesign name="left" size={20} color={colors.navBarIconColor} style={{ left: 5 }} />,
};

export default function App() {
  const initNotifications = async () => {
    try {
      const notifications = await AsyncStorage.getItem('@notifications');
      if (notifications === null) {
        const subscribedCheckboxes = [];
        for (let i = 0; i < checkboxes.length; ++i) {
          const ok = await oneSignalSubscription(checkboxes[i], true);
          if (ok) {
            subscribedCheckboxes.push(checkboxes[i]);
          }
        }
        setItemAsyncStorage('@notifications', subscribedCheckboxes);
      } else {
        const notifs = JSON.parse(notifications);

        for (let i = 0; i < checkboxes.length; ++i) {
          let found = false;

          for (let j = 0; j < notifs.length; ++j) {
            if (notifs[j].tagname === checkboxes[i].tagname) {
              found = true;
            }
          }
          await oneSignalSubscription(checkboxes[i], found);
        }
      }
    } catch (e) {
      Log.d('Notifications', '🚀: getNotifsFromAsyncStorage -> e', e);
    }
  };

  React.useEffect(() => {
    initNotifications();
  }, []);

  return (
    <Provider {...stores}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={generalNavigatorOptions}>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewsList" component={NewsListScreen} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
            <Stack.Screen name="Agenda" component={AgendaScreen} />
            <Stack.Screen name="AgendaDetail" component={AgendaDetailScreen} />
            <Stack.Screen name="Recycling" component={RecyclingScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Ruche" component={RucheScreen} />
            <Stack.Screen name="WebViewDynamic" component={WebViewDynamicHtmlScreen} />
            <Stack.Screen name="WebViewStatic" component={WebViewStaticHtmlScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="MapDetail" component={MapDetailScreen} />
          </Stack.Navigator>
          <Toast ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  LOGO: { width: 100, height: 50 },
});
