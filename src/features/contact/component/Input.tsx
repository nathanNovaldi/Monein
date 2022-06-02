import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Input = ({ label, error, password, onFocus = () => {}, ...props }) => {
  const [isActive, setActive] = useState(false);

  const renderElement = label => {
    if (label !== 'Telephone') {
      return <Text style={{ color: '#790000' }}>*</Text>;
    } else {
      return null;
    }
  };
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.labelStyle}>
        {label}
        <View>{renderElement(label)}</View>
      </Text>

      <TextInput
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderColor: error ? 'red' : isActive ? '#1B7268' : '#D5E1E1',
          borderWidth: 1,
          height: props.multiline ? 150 : 50,
          fontSize: 18,
          paddingLeft: 4,
        }}
        onFocus={() => {
          onFocus();
          setActive(true);
        }}
        onBlur={() => setActive(false)}
        selectionColor="black"
        {...props}
      />
      {error && <Text style={{ color: 'red', fontSize: 12, marginTop: 7 }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
  },

  labelStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Input;
