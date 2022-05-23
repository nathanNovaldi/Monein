import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { View } from 'react-native-interactable';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CommerceScreen = () => {
  const [isActive, setActive] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView style={styles.page}>
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
        </View>
      </ScrollView>
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
