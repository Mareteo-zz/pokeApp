import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

// Components
import Loading from "../../Components/Common/Loading";
import Pokeball from "../../Components/Pokeball";

//Assets
import Logo from "../../assets/pokemon-logo.png";

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
  const [search, onChangeText] = useState("");
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
    if (!prevUrl) return;
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

  const getPokemonByName = () => {
    setLoading(true);
    if (search) {
      P.getPokemonByName(search)
        .then(res => {
          setLoading(false);
          props.navigation.navigate("Detail", { data: res })
          console.log("by name", res);
        })
        .catch(err => {
          setLoading(false);
          Alert.alert('Pokemon not found!','Be sure you type the name correctly and all letters with lowecase')
        });
    } else {
      setLoading(false);
      Alert.alert('Ooops!','You should to type the Pokemon name in search field');
    }
  };

  return (
    <View style={customStyles.safeArea}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type Pokemon by name..."
              placeholderTextColor="white"
              onChangeText={text => onChangeText(text)}
              value={search}
            />
            <Button
              buttonStyle={[customStyles.btn, customStyles.primaryBtn]}
              title="Search"
              onPress={() => getPokemonByName()}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginVertical: 15
            }}
          >
            <Image source={Logo} style={{ width: "75%", height: 100 }} />
            <Button
              buttonStyle={[
                customStyles.btn,
                customStyles.primaryBtn,
                customStyles.smallBtn
              ]}
              disabled={!prevUrl}
              title="Prev"
              onPress={() => getPrev()}
            />
            <Button
              buttonStyle={[
                customStyles.btn,
                customStyles.primaryBtn,
                customStyles.smallBtn
              ]}
              title="Next"
              onPress={() => getNext()}
            />
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
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  textInput: {
    width: "70%",
    borderWidth: 1,
    padding: 12,
    color: "white",
    borderColor: "white"
  }
});

export default HomeScreen;
