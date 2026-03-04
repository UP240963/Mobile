import React from 'react';
import { Image, ScrollView, Text } from 'react-native';

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard(props: PokemonCardProps) {
    const id=props.url.split("/").filter(Boolean).at(-1);
    console.log(id);
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <ScrollView>
        <Image 
        source={{uri: pokemonImageUrl}} 
        style={{width: 100, height: 100}}>
        </Image>
      <Text>{props.name}</Text>
      <Text>{props.url}</Text>
    </ScrollView>
  )
}