import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  
const getPokemons = async() => {
  useEffect(() => {
    console.log("Entre en pantalla");
    getPokemons();
  }, []);

  try {
    const url = "https://poke.co/api/v2/pokemon?limit=100000&offset=0"; 
  const response = await fetch(url, {
    method: "GET",
  });
  if(response.ok){
    console.log("Respuesta ok");
  }else{
    console.log("Bad request");
  }
  } catch (error) {
    console.log("Error en la petición:", error);
  }
};
  return (
    <View>    
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );}