import { HeaderHeightContext } from '@react-navigation/stack';
import { transform } from 'lodash';
import { suppressDeprecationWarnings } from 'moment';
import React, { useState, useEffect } from 'react';
import { RecyclerViewBackedScrollViewBase, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements/dist/card/Card';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { View } from 'react-native-interactable';
import MapView, { Animated } from 'react-native-maps';
import { FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Marker } from 'react-native-svg';

export const CommerceScreen = () => {
  const [isActive, setActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = () => {
    const apiURL = '';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setFilteredData(responseJson);
        setmasterData(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setsearch(text);
    } else {
      setFilteredData(masterData);
      setsearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text>
        {item.id}
        {'. '}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titre}>Commerces et entreprises à Monein</Text>
        <View style={styles.recherche}>
          <Text style={styles.titreRecherche}>RECHECHER UNE ENTREPRISE OU UN COMMERCE</Text>

          <Text>Catégories :</Text>
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              height: 50,
              fontSize: 18,
              paddingLeft: 4,
            }}
            selectionColor="black"
            placeholder="Choisissez une catégorie"
          />

          <Text>Recherche par nom :</Text>
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              height: 50,
              fontSize: 18,
              paddingLeft: 4,
            }}
            selectionColor="black"
            placeholder="Nom du Commerce"
          />
          <View style={styles.centreBouton}>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: '#FFFFFF', fontWeight: '500', fontSize: 18 }}>Rechercher</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>Nous avons trouvé 169 établissement</Text>
        <FlatList data={filteredData} keyExtractor={(item, index) => index.toString()} renderItem={ItemView} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titre: {
    fontSize: 50,
    marginBottom: 40,
  },
  page: {
    padding: 10,
  },
  recherche: {
    backgroundColor: '#D5E1E1',
    flex: 1,
    padding: 30,
    flexDirection: 'column',
  },
  titreRecherche: {
    fontSize: 30,
  },
  centreBouton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#1B7268',
    height: 50,
    width: 150,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
