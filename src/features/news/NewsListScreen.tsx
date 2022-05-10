import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, RefreshControl, FlatList } from 'react-native';
import { colors } from '../../config/config';
import { NewsItem } from './component/NewsItem';
import { newsStore, NewsStore } from './NewsStore';
import Menu from '../menuBottom/Menu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';

type Props = {
  newsStore: NewsStore;
};

export const NewsListScreen = inject('newsStore')(
  observer((props: Props) => {
    const { news } = props.newsStore;
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
      newsStore.fetchIfNeeded();
    });

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={news}
          renderItem={({ item }) => {
            return <NewsItem news={item} onPress={() => navigation.navigate('NewsDetail', { itemID: item.id })} />;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.line} />;
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                newsStore.fetchAll().then(() => setRefreshing(false));
              }}
            />
          }
        />
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
