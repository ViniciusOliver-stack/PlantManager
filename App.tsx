import React from 'react';
import AppLoading from 'expo-app-loading'
//Vamos criar isso, pq ao inves de chamar tela por tela, chamamos o Routes
import Routes from './src/routes' 
import{
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
}from '@expo-google-fonts/jost'

export default function App() {
//Vamos arazenar o retorno do Boolean dentro do fontsLoaded
  const [ fontsLoaded ] = useFonts({
    //Vamos passar um objeto para o nosso useFonts e vamos incluir as fontes que vamos usar
    Jost_400Regular,
    Jost_600SemiBold
  });
//Vamos poder utilizar ele dentro de uma condição
//Agora a condição vai testar, ela está carregada? ela já crregou?
if(!fontsLoaded)
return <AppLoading/>

  return (
    <Routes/> //Ele vai chamar as telas
  )
}

