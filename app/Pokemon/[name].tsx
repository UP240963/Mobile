// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// export default function PokemonDetailsScreen() {
//   const [pokemonData, setPokemonData] = useState<any>(null);
//   const params = useLocalSearchParams();

//   useEffect(() => {
//     console.log("Entre en pantalla");
//     getPokemonData();
//   }, []);

//   const getPokemonData = async () => {
//     try {
//       const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
//       const response = await fetch(URL, { method: "GET" });
//       const data = await response.json();
//       setPokemonData(data); // guardamos la respuesta en el estado
//     } catch (error) {
//       console.error("Error al obtener datos:", error);
//     }
//   };

//   return (
//     <View>
//       <Text>Nombre: {params.name}</Text>
//       {pokemonData ? (
//         <Text>{JSON.stringify(pokemonData, null, 2)}</Text>
//       ) : (
//         <Text>Cargando...</Text>
//       )}
//     </View>
//   );
// }
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function PokemonDetailsScreen() {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [dittoData, setDittoData] = useState<any>(null); // nuevo estado para Ditto
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("Entre en pantalla");
    getPokemonData();
    getDittoData(); // también llamamos a Ditto
  }, []);

  const getPokemonData = async () => {
    try {
      const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
      const response = await fetch(URL);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error("Error al obtener datos del Pokémon:", error);
    }
  };

  const getDittoData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      const data = await response.json();
      setDittoData(data);
    } catch (error) {
      console.error("Error al obtener datos de Ditto:", error);
    }
  };

  return (
    <View>
      <Text>Nombre: {params.name}</Text>
      {pokemonData ? (
        <Text>{JSON.stringify(pokemonData, null, 2)}</Text>
      ) : (
        <Text>Cargando datos de {params.name}...</Text>
      )}

      <Text>--- Datos de Ditto ---</Text>
      {dittoData ? (
        <Text>{JSON.stringify(dittoData, null, 2)}</Text>
      ) : (
        <Text>Cargando datos de Ditto...</Text>
      )}
    </View>
  );
}