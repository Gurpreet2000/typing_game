import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/constants';

const GameCard = ({text = 'Success'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    padding: 25,
    borderRadius: 10,
  },
  text: {
    color: colors.bannerText,
    fontWeight: 'bold',
    fontSize: 50,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
