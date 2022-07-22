import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colors} from './src/utils/constants';
import GameCard from './src/components/GameCard';
import InputBar from './src/components/InputBar';

const App = () => {
  const [text, setText] = useState('');
  const [timer, setTimer] = useState(0);

  const startTime = useRef();

  useEffect(() => {
    startTime.current = new Date().getTime();

    const interval = setInterval(() => {
      const milliSecDiff = new Date().getTime() - startTime.current;
      setTimer(milliSecDiff / 1000);
    }, 1);

    return () => clearInterval(interval);
  }, []);

  const reset = () => {
    startTime.current = new Date().getTime();
    setText('');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={[styles.text, styles.title]}>Type the Alphabet</Text>
          <Text style={styles.text}>
            Typing game to see how fast you type. Timer starts when you do :)
          </Text>
        </View>

        {/* Game Card */}
        <GameCard />

        {/* Footer Time */}
        <View>
          <Text style={[styles.text, styles.time]}>Time : {timer}s</Text>
        </View>
      </View>
      <InputBar value={text} setValue={setText} onReset={reset} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    margin: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: colors.text,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 27,
  },
  time: {
    fontWeight: 'bold',
  },
});
