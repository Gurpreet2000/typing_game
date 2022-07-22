import {StyleSheet, View, TextInput, Pressable, Text} from 'react-native';
import React from 'react';
import {colors} from '../utils/constants';

const InputBar = ({value, setValue, onReset, maxLength}) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="characters"
        autoCorrect={false}
        autoFocus={true}
        blurOnSubmit={false}
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor={colors.lightText}
        value={value}
        onChangeText={setValue}
        textAlign="center"
        maxLength={maxLength}
      />
      <Pressable style={styles.reset} onPress={onReset}>
        <Text style={styles.text}>Reset</Text>
      </Pressable>
    </View>
  );
};

export default InputBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: colors.text,
    letterSpacing: 2,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: colors.secondary,
    color: colors.black,
    flex: 1,
  },
  reset: {
    backgroundColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
