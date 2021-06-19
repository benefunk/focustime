import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, paddingSizes } from '../utils/sizes.js';
import { colors } from '../utils/colors.js';

const minutesToMillis = (min) => min * 60 * 1000;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }
      const timeLeft = time - 1000;

      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millis/ minutesToMillis(millis));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {' '}
        {formatTime(minute)}: {formatTime(seconds)}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.contrast,
    fontSize: fontSizes.xxxl,
    padding: paddingSizes.lg,
    backgroundColor: 'rgba(94,132,226,.3)',
  },
});
