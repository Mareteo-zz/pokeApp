import React, { Component } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import ProgressBar from '../../Components/Common/ProgressBar';

// Custom styles
import customStyles from "../../Style";
import theme from "../../Style/theme";

class PokemonDetailScreen extends Component {
  // I used fullState component here to you, in order to see I can use both ways to manage state in RN
  state = {
    data: this.props.route.params.data
  };

  render() {
    const { data } = this.state;

    return (
      <View style={customStyles.safeArea}>
        <View style={styles.imageContainer}>
          <Image source={{uri: data.sprites.front_default}} style={styles.Image}/>
        </View>
        <ScrollView style={styles.infoContainer}>
          <Text style={styles.name}>{this.state.data.name.toUpperCase()}</Text>
          <View style={styles.info}>
            <Text>Height: {data.height}</Text>
            <Text>Weight: {data.weight}</Text>
          </View>
          {data.stats.map(stat => (
            <ProgressBar key={stat.stat.name} stat={stat.stat.name} value={stat.base_stat}/>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "white",
    height: 280,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  Image: {
    width: "80%",
    height: "80%"
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  name: {
    textAlign: "center",
    fontSize: theme.FONT_SIZE_LARGE,
    color: "#4a4447"
  },
  infoContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 30,
    height: "100%"
  }
});

export default PokemonDetailScreen;
