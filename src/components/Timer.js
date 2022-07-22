import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {colors} from '../utils/constants';

const Timer = ({
  onStop = time => null,
  isRunning = false,
  setIsRunning,
  reset,
  value = 0,
  setValue = () => null,
}) => {
  const startTimeRef = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) startTimer();
    else stopTimer();
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) startTimeRef.current = new Date().getTime();
    else startTimer();
  }, [reset]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    startTimeRef.current = new Date().getTime();
    intervalRef.current = setInterval(() => {
      const milliSecDiff = new Date().getTime() - startTimeRef.current;
      setValue(milliSecDiff / 1000);
    }, 1);
    if (!isRunning) setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    onStop(value);
    if (isRunning) setIsRunning(false);
  };

  return (
    <View>
      <Text style={[styles.text, styles.time]}>Time : {value}s</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    letterSpacing: 1.5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
