import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Vibration,
  Platform,
} from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors.js';
import { fontSizes, paddingSizes } from '../../utils/sizes.js';
import { Countdown } from '../../components/Countdown.js';
import { RoundedButton } from '../../components/RoundedButton.js';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const setOnProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  onEnd = () => {
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    vibrate();
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const addTime = (min) => {
    setMinutes(minutes + min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          onProgress={setOnProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}> Focusing on:</Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <View style={{ paddingTop: paddingSizes.sm }}>
        <ProgressBar progress={progress} color="green" style={{ height: 10 }} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} onAddTime={addTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="cancel" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    paddingTop: Platform.OS !== 'ios' ? paddingSizes.md : paddingSizes.lg,
  },
  title: {
    color: colors.contrast,
    textAlign: 'center',
  },
  task: {
    color: colors.task,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: paddingSizes.md,
    paddingLeft: paddingSizes.md,
  },
});
