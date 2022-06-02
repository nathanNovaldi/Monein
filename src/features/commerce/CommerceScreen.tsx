import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { decode } from 'html-entities';

export const CommerceScreen = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  useEffect(() => {
    const urls = [
      'https://www.monein.fr/wp-json/wp/v2/cpt_shop/?per_page=100',
      'https://www.monein.fr/wp-json/wp/v2/cpt_shop/?per_page=100&offset=100',
    ];

    Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(items => {
      console.log(items[0]);

      const allItems = items[0];
      allItems.push(...items[1]);

      console.log(allItems);

      setData(allItems);
      setFilteredData(allItems);
    });
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.title.rendered ? item.title.rendered.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.titre}>Commerces et entreprises à Monein</Text>
      <View style={styles.recherche}>
        <Text style={styles.titreRecherche}>RECHECHER UNE ENTREPRISE OU UN COMMERCE</Text>

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
          onChangeText={event => {
            searchFilterFunction(event);
          }}
        />
      </View>
      {filteredData.map((item, index) => {
        console.log('les items: ', item.title.rendered);
        return (
          <View key={index}>
            <View style={styles.items}>
              <Text style={{ textAlign: 'center' }}>{decode(item.title.rendered)}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
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

  items: {
    borderColor: '#1B7268',
    borderWidth: 1,
    marginTop: 5,
    height: 50,
    justifyContent: 'center',
  },

  menuCategories: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
