import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";

// Custom Styles
import theme from '../../../Style/theme';

const ProgressBar = props => (
  <View style={styles.ProgressBarContainer}>
    <Text>{props.stat}</Text>
    <Text>{props.value}</Text>
    <ProgressBarAnimated
      maxValue={100}
      backgroundColor={theme.PROGRESS_BAR}
      width={Dimensions.get("screen").width - 200}
      value={props.value}
      backgroundColorOnComplete="#6CC644"
    />
  </View>
);

const styles = StyleSheet.create({
  ProgressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  }
});

export default ProgressBar;
