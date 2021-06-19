import React from 'react';
import { View, FlatList, StyleSheet, Text, SafeAreaView } from 'react-native';

import { fontSizes, paddingSizes } from '../../utils/sizes.js';
import { RoundedButton } from '../../components/RoundedButton.js';
import { colors } from '../../utils/colors.js';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item, index }) => {
    return <Text style={styles.hello(item.status)}>{item.subject}</Text>;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={{ color: colors.contrast }}>Things we've focussed on</Text>
        {!!focusHistory.length && (
          <>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.container}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  hello: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: 24,
  }),
  container: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: colors.main,
  },
});
