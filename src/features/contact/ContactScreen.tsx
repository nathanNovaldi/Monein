import { padStart } from 'lodash';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Linking, Alert, TouchableOpacity, Keyboard } from 'react-native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Hyperlink from 'react-native-hyperlink';
import { SafeAreaView } from 'react-native-safe-area-context';
import INFO_ICON from './icons/info.svg';
import PHONE_ICON from './icons/phone.svg';
import PIN_ICON from './icons/pin.svg';
import Input from './component/Input';

export const ContactScreen = () => {
  const [inputs, setInputs] = useState({
    Prenom: '',
    Nom: '',
    Telephone: '',
    Email: '',
    Message: '',
  });
  const [errors, setErrors] = useState({});
  const [checked, setchecked] = useState(false);
  const errorChecked = false;
  const validate = () => {
    Keyboard.dismiss();

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(inputs.Email) === false) {
      handleError("L'addresse mail est incorrect", 'Email');
    }

    if (!inputs.Prenom) {
      handleError('Veuillez entrer votre prénom', 'Prenom');
    }

    if (!inputs.Nom) {
      handleError('Veuillez entrer votre nom', 'Nom');
    }

    if (!inputs.Telephone) {
      handleError('Veuillez entrer votre numéro de telephone', 'Telephone');
    }

    if (!inputs.Email) {
      handleError('Veuillez entrer votre adresse mail', 'Email');
    }

    if (!inputs.Message) {
      handleError('Veuillez entrer votre message', 'Message');
    }

    if (checked) {
    } else {
    }
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  console.log(inputs);

  return (
    <ScrollView style={styles.page}>
      <View style={{ marginBottom: 5 }}>
        <Text style={styles.titre}> Contact</Text>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, height: 10, marginBottom: 40 }} />
        <View style={styles.paragraphe}>
          <Text style={{ fontSize: 15, fontStyle: 'italic', marginBottom: 28 }}>
            Les champs avec un astérisque <Text style={styles.stars}>*</Text> sont obligatoires.
          </Text>

          <Input
            placeholder="Entrer votre prénom"
            label="Prenom"
            error={errors.Prenom}
            onFocus={() => {
              handleError(null, 'Prenom');
            }}
            onChangeText={text => handleOnChange(text, 'Prenom')}
          />
          <Input
            placeholder="Entrer votre nom"
            label="Nom"
            error={errors.Nom}
            onFocus={() => {
              handleError(null, 'Nom');
            }}
            onChangeText={text => handleOnChange(text, 'Nom')}
          />
          <Input
            placeholder="Entrer votre numéro de téléphone"
            label="Telephone"
            error={errors.Telephone}
            onFocus={() => {
              handleError(null, 'Telephone');
            }}
            onChangeText={text => handleOnChange(text, 'Telephone')}
            keyboardType="numeric"
          />
          <Input
            placeholder="Entrer votre e-mail"
            label="E-mail"
            autoCapitalize="none"
            error={errors.Email}
            onFocus={() => {
              handleError(null, 'Email');
            }}
            onChangeText={text => handleOnChange(text, 'Email')}
          />
          <Input
            placeholder="Entrer votre message"
            label="Votre message"
            error={errors.Message}
            onFocus={() => {
              handleError(null, 'Message');
            }}
            onChangeText={text => handleOnChange(text, 'Message')}
            multiline={true}
          />

          <Text style={styles.inputTitle}>
            RGPD (Règlement Général sur la Protection des Données) <Text style={styles.stars}>*</Text>
          </Text>
          <ScrollView style={{ height: 150, borderWidth: 1, borderColor: '#D5E1E1', padding: 2, marginBottom: 5 }}>
            <Text style={{ marginBottom: 5 }}>
              La Mairie de Monein , en qualité de responsable du traitement, traite vos données à caractère personnel
              dans le respect de la réglementation en vigueur. Vos données sont collectées et traitées pour vous
              permettre de profiter des services que la Mairie de Monein vous offre. Les destinataires de vos données
              sont les personnes autorisées au sein de la Mairie de Monein qui sont en charge des demandes web. Vous
              disposez d’un droit d’accès à vos données, de rectification et d’effacement. Vous bénéficiez également
              d’un droit de limitation du traitement et d’un droit d’opposition. Pour exercer ces droits, merci de nous
              adresser un courrier à : La Mairie de Monein – Place Henri Lacabanne – 64360 Monein
            </Text>
          </ScrollView>
          {errorChecked && (
            <Text style={{ color: 'red', fontSize: 12, marginTop: 7 }}>
              Vous n'avez pas accepté la politique de confidentialité{' '}
            </Text>
          )}
          <View style={styles.condition}>
            <CheckBox checked={checked} onPress={() => setchecked(!checked)} />
            <Text style={{ fontSize: 18, paddingTop: 4, flex: 1 }}>
              J'accepte la <Text style={styles.link}>politique de confidentialité</Text>
            </Text>
          </View>

          <TouchableOpacity
            disabled={!checked}
            style={[styles.button, { backgroundColor: checked ? '#1B7268' : '#D5E1E1' }]}
            onPress={validate}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '500', fontSize: 18 }}>Envoyer</Text>
          </TouchableOpacity>

          <View style={styles.information}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>MAIRIE DE MONEIN </Text>

            <View style={styles.detail}>
              <View style={styles.contactPin}>
                <PIN_ICON fill="#000000" style={{ width: 30, height: 30 }} />
                <Text style={{ marginLeft: 8 }}>Hôtel de Ville – Place Henri Lacabanne – 64360 Monein</Text>
              </View>

              <View style={styles.contactTel}>
                <PHONE_ICON fill="#000000" style={{ width: 30, height: 30 }} />
                <Text style={styles.link}>05 59 21 30 06</Text>
              </View>

              <View style={styles.contactInfo}>
                <INFO_ICON fill="#000000" style={{ width: 30, height: 30 }} />
                <Text style={styles.linkBold}>Voir les horaires d’ouverture</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  titre: {
    fontSize: 50,
    marginBottom: 8,
  },
  page: {
    padding: 10,
  },
  paragraphe: {
    padding: 10,
  },

  stars: {
    color: '#790000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D5E1E1',
    padding: 8,
    margin: 10,
    width: 200,
  },
  information: {
    backgroundColor: '#D5E1E1',
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },

  inputTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },

  link: {
    color: '#1B7268',
    textDecorationLine: 'underline',
    marginLeft: 6,
    marginBottom: 6,
  },

  linkBold: {
    color: '#1B7268',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  button: {
    backgroundColor: '#1B7268',
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 35,
  },

  condition: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },

  contactInfo: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
  },

  contactPin: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginBottom: 2,
  },

  contactTel: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 3,
    marginTop: 5,
  },

  detail: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 100,
    flex: 1,
  },
});
