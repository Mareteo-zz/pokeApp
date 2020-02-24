import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "react-native-elements";

// Components
import Loading from "../../Components/Common/Loading";
import Pokeball from "../../Components/Pokeball";

//Assets
import Logo from '../../assets/pokemon-logo.png'

// API
import { getAllPokemon, getPokemon } from "../../Api/pokemon";

// Custom Styles
import customStyles from "../../Style";
import theme from "../../Style/theme";

const HomeScreen = props => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [isLoading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    fetchData = async () => {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getNext = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const getPrev = async () => {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  return (
    <View style={customStyles.safeArea}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginVertical: 15}}>
            <Image source={Logo} style={{width: '75%', height: 100}} />
            <Button buttonStyle={[customStyles.btn, customStyles.primaryBtn, customStyles.smallBtn]} disabled={!prevUrl} title="Prev" onPress={() => getPrev()} />
            <Button buttonStyle={[customStyles.btn, customStyles.primaryBtn, customStyles.smallBtn]} title="Next" onPress={() => getNext()} />
          </View>
          <ScrollView>
            {pokemonData.map(pokemon => (
              <TouchableOpacity
                key={pokemon.id}
                onPress={() =>
                  props.navigation.navigate("Detail", { data: pokemon })
                }
              >
                <Pokeball
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeTitle: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.POKEMON_NAME,
    textAlign: "center"
  }
});

export default HomeScreen;
