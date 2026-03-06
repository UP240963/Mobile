import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const id = props.url.split("/").filter(Boolean).at(-1);

  const pokemonImageUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
    id +
    '.png';

  return (
    <Pressable
      onPress={() => router.push('/new-screen')}
      style={({ pressed }) => [
        styles.pressableStyle,
        pressed && { opacity: 0.5 },
      ]}
    >
      <Image
        source={{ uri: pokemonImageUrl }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{props.name}</Text>
      <Text>{props.url}</Text>
    </Pressable>
  );
}

// Ejemplo de uso con ScrollView
export function PokemonList({ data }: { data: PokemonCardProps[] }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {data.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pressableStyle: {
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    padding: 16,
  },
});