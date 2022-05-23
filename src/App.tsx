import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import { markersStore } from './features/map/MarkersStore';
import { agendaStore } from './features/agenda/AgendaStore';
import { ContactScreen } from './features/contact/ContactScreen';
import { recyclingStore } from './features/recycling/RecyclingStore';
import { ActuScreen } from './features/news/ActuScreen';
import { NewsDetailScreen } from './features/news/NewsDetailScreen';
import { fonts } from './shared/theme/fonts';
import { sizes } from './shared/theme/sizes';
import { AgendaDetailScreen } from './features/agenda/AgendaDetailScreen';
import { AgendaScreen } from './features/agenda/AgendaScreen';
import { RecyclingScreen } from './features/recycling/RecyclingScreen';
import { DrawerScreen } from './features/drawerNavigator/drawerScreen';
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
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { createNavigationContainerRef, useNavigationContainerRef } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommerceScreen } from './features/commerce/CommerceScreen';

// Navigation

export type RootStackParams = {
  HomeStack: HomeStackParams;
  ActuStack: ActuStackParams;
  AgendaStack: AgendaStackParams;
  MapStack: MapStackParams;
};

const Stack = createBottomTabNavigator<RootStackParams>();

export type ActuStackParams = {
  Actu;
  NewsDetail: {
    itemID: any;
  };
};

const ActuStack = createNativeStackNavigator<ActuStackParams>();

const ActuScreenStack = () => {
  return (
    <ActuStack.Navigator
      initialRouteName="Actu"
      screenOptions={{
        headerBackTitleVisible: true,
        headerTintColor: '#000000',
        headerTitle: () => <LogoTitle />,
      }}
    >
      <ActuStack.Screen name="Actu" component={ActuScreen} />
      <ActuStack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </ActuStack.Navigator>
  );
};

export type AgendaStackParams = {
  Agenda;
  AgendaDetail: {
    itemID: any;
  };
};

const AgendaStack = createNativeStackNavigator<AgendaStackParams>();

const AgendaScreenStack = () => {
  return (
    <AgendaStack.Navigator
      initialRouteName="Agenda"
      screenOptions={{
        headerBackTitleVisible: true,
        headerTintColor: '#000000',
        headerTitle: () => <LogoTitle />,
      }}
    >
      <AgendaStack.Screen name="Agenda" component={AgendaScreen} />
      <AgendaStack.Screen name="AgendaDetail" component={AgendaDetailScreen} />
    </AgendaStack.Navigator>
  );
};

export type MapStackParams = {
  Map;
  MapDetail: {
    itemID: any;
  };
};

const MapStack = createNativeStackNavigator<MapStackParams>();

const MapScreenStack = () => {
  return (
    <MapStack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerBackTitleVisible: true,
        headerTintColor: '#000000',
        headerTitle: () => <LogoTitle />,
      }}
    >
      <MapStack.Screen name="Map" component={MapScreen} />
      <MapStack.Screen
        name="MapDetail"
        component={MapDetailScreen}
        options={() => ({
          headerShadowVisible: false, // applied here
        })}
      />
    </MapStack.Navigator>
  );
};

export type HomeStackParams = {
  Home;
  WebViewDynamic;
  WebViewStatic;
  notification;
  NewsDetail: {
    itemID: any;
  };
  Contact;
  Commerce;
};

const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackTitleVisible: true,
        headerTintColor: '#000000',
        headerTitle: () => <LogoTitle />,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="WebViewDynamic" component={WebViewDynamicHtmlScreen} />
      <HomeStack.Screen name="WebViewStatic" component={WebViewStaticHtmlScreen} />
      <HomeStack.Screen name="notification" component={NotificationsScreen} />
      <HomeStack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <HomeStack.Screen name="Contact" component={ContactScreen} />
      <HomeStack.Screen name="Commerce" component={CommerceScreen} />
    </HomeStack.Navigator>
  );
};

// fin Navigation

// notif OneSignal

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

// fin notif OneSignal

const stores = {
  newsStore,
  agendaStore,
  recyclingStore,
  markersStore,
};

function LogoTitle() {
  return <LOGO style={styles.LOGO} />;
}

const generalNavigatorOptions: BottomTabNavigationOptions = {
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
    backgroundColor: '#ffffff',
    height: 50,
  },
  tabBarActiveTintColor: '#ffffff',
  tabBarInactiveTintColor: '#30AC9B',
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: '#1C7069',
  },

  // headerShown: false,
  /* headerBackTitleStyle: {
    color: '#000000',
    left: 5,
    bottom: 10,
  }, */
  headerTitle: () => <LogoTitle />,
  // eslint-disable-next-line react-native/no-inline-styles
  /* headerBackImage: () => <AntDesign name="left" size={20} color="#000000" style={{ left: 5, bottom: 10 }} />, */
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
        <View>
          <View style={styles.whiteBar} />
          <View style={styles.topBar} />
        </View>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={generalNavigatorOptions}>
            <Stack.Screen
              name="HomeStack"
              component={HomeScreenStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="home" size={size} color={color} style={styles.home} />
                ),
                tabBarLabel: 'Home',
              }}
            />
            <Stack.Screen
              name="ActuStack"
              component={ActuScreenStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <SimpleLineIcons name="book-open" size={size} color={color} style={styles.book} />
                ),
                tabBarLabel: 'News',
              }}
            />
            <Stack.Screen
              name="AgendaStack"
              component={AgendaScreenStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="calendar" size={size} color={color} style={styles.calendar} />
                ),
                tabBarLabel: 'Agenda',
              }}
            />
            <Stack.Screen
              name="MapStack"
              component={MapScreenStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5Icon name="map-marker-alt" size={size} color={color} style={styles.marker} />
                ),
                tabBarLabel: 'Map',
              }}
            />
          </Stack.Navigator>
          <Toast ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  LOGO: { width: 100, height: 50, bottom: 3 },

  topBar: {
    backgroundColor: '#2C2C2C',
    height: 40,
  },

  bottomBar: {
    backgroundColor: '#1C7069',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 9,
    paddingRight: 15,
  },
  whiteBar: {
    height: 20,
  },

  googleMaps: {
    alignItems: 'center',
  },

  home: {
    alignItems: 'center',
    paddingRight: 6,
  },

  calendar: {
    alignItems: 'center',
  },

  marker: {
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },

  book: {
    alignItems: 'center',
  },

  notification: {},
});
