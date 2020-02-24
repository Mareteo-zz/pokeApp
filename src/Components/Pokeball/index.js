import React from "react";
import { Text, View, ImageBackground, Image, StyleSheet } from "react-native";

//Assets
import pokeball from "../../assets/pokeball.png";

// Custom Styles
import theme from '../../Style/theme';

const Pokeball = props => (
  <View
    style={{
      width: "100%",
      height: 220,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 12
    }}
  >
    <ImageBackground
      source={pokeball}
      style={{
        width: 200,
        height: 220,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        style={{ width: 120, height: 120 }}
        source={{
          uri: props.image
        }}
      />
      <Text style={styles.pokemonName}>{props.name.toUpperCase()}</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  pokemonName: {
    fontSize: theme.FONT_SIZE_MEDIUM__REGULAR,
    color: theme.POKEMON_NAME,
  }
});

export default Pokeball;
