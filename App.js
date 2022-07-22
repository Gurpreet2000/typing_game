import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colors} from './src/utils/constants';
import GameCard from './src/components/GameCard';
import Timer from './src/components/Timer';
import InputBar from './src/components/InputBar';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GUESS_LENGTH = 20;

const App = () => {
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [bestTime, setBestTime] = useState(0);
  const [gameCardText, setGameCardText] = useState('');

  useEffect(() => {
    startGame();
    return () => stopGame();
  }, []);

  useEffect(() => {
    if (text.length === GUESS_LENGTH) {
      stopGame();
    } else {
      shuffleCharacter();
    }
  }, [text]);

  const shuffleCharacter = () => {
    setGameCardText(CHARACTERS[Math.floor(Math.random() * 26)]);
  };

  const startGame = () => {
    setTimerIsRunning(true);
    shuffleCharacter();
  };

  const stopGame = () => {
    setTimerIsRunning(false);
  };

  const resetGame = () => {
    setText('');
    setResetTimer(!resetTimer);
    shuffleCharacter();
  };

  const onTimerStop = time => {
    if (time < bestTime || bestTime === 0) {
      setBestTime(time);
      setGameCardText('Success');
    } else setGameCardText('Failure');
  };

  const onTextInput = e => {
    const str = (e.length > 1 ? e[e.length - 1] : e).toUpperCase();
    if (e.length < text.length) return;
    if (str !== gameCardText) {
      setTime(time + 0.5);
    } else setText(e.toUpperCase());
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
        <GameCard text={gameCardText} />

        {/* Footer Time */}
        <View>
          <Timer
            onStop={onTimerStop}
            reset={resetTimer}
            isRunning={timerIsRunning}
            setIsRunning={setTimerIsRunning}
            value={time}
            setValue={setTime}
          />
          <Text style={[styles.text, styles.bestTime]}>
            my best time : {bestTime}s
          </Text>
        </View>
      </View>
      <InputBar
        value={text}
        setValue={onTextInput}
        onReset={resetGame}
        maxLength={GUESS_LENGTH}
      />
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
  bestTime: {
    opacity: 0.75,
  },
});
