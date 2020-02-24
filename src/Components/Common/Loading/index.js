import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native';

// Custom styles
import theme from '../../../Style/theme';

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.PROGRESS_BAR} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
