import React, { useEffect, useState } from 'react'
import{
    View,
    Text,
    StyleSheet, 
    FlatList,
    ActivityIndicator
} from 'react-native'
import{ ListaButton }from '../components/ListaButton'
import {PlantProps} from '../libs/storage'
import {Header} from '../components/Header'
import api from '../services/api'
import {Load} from '../components/Load'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { useNavigation } from '@react-navigation/core'

//Vamos criar uma interface para poder tipar o que vem lá de dentro
interface EnviromentProps{
    key: string;
    title: string;
}



export function PlantSelect(){

    //Vamos criar um estado para armazenar os nossos ambientes
    const [enviroments, setEnvirtoments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    //Vamos criar a parte de filtro |Estamos criando um filtro aux para poder trazer tudo da API|
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    //Vamos saber qual ambiente o usuário selecionou   O que vai está selecionado por padrão será o all
    const [enviromentSelected, setenviromentSelected] = useState('all')
    //Vamos criar um estado para saber se ele está carregando
    const [loading, setLoading] = useState(true)
                //Vamos começar pela 1
    const [page, setPage] = useState(1)
    //Vamos saber se tem mais coisas para carregar
    const [loadingMore, setLoadingMore] = useState(false)

    const navigation = useNavigation();

    //Vamos fazer a seleção
    function handleEnviromentSelect(enviroment: string){
        setenviromentSelected(enviroment); 

        if(enviroment == 'all')
            return setFilteredPlants(plants)

        //Caso a pessoa não queira todos
        const filtered = plants.filter(plants =>
            //Vamos verificar se a planta tem o ambiente que contém esse ambiente
            plants.environments.includes(enviroment)
            );
            //Para armazenar as plantas Filtradas
            setFilteredPlants(filtered);           
    }

    
    async function fetchPlants(){                                             //Ele só traz 8 itens no limite
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        //Se não tem nada
        if(!data)
            return setLoading(true) //então já carregou tudo então
        //Fazer a verificação se a pagina é maior que 1
        if(page > 1){//A gente consegue pegar os dados velhos do meu estado e recuperar essa informações
            setPlants(oldValue => [...oldValue, ...data])//Vamos fazer a junção dele com o novo dado
            setFilteredPlants(oldValue =>[...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        setLoading(false) //Mostrar a tela de carregamento, no caso encerra quando já carregado
        setLoadingMore(false)//Animação de Rolagem
       
    }

    //Criar uma função de rolagem de carregamento da página
    function handleFetchMore(distance: number){
        if(distance < 1)
            return;

            setLoadingMore(true)
            setPage(oldValue => oldValue + 1)
            fetchPlants()
        
    }
    
    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSaver', {plant})

    }

    useEffect(()=>{
        async function fetchEnviroment(){
            //Como essa busca na minha API como ela não vai me retornar no mesmo momento
            //vai depender da internet e depender de outros fatores. |Então: isso vai fazer com que espere com que a API devolva os dados para { data }|
            const { data } = await api.get(`plants_environments?_sort=title&order=asc`);

            setEnvirtoments([
                //Selecionar o ambiente que ele quer
                {
                    key: 'all',
                    title: 'Todos',
                },
                //Para despejar
                ...data
            ]);
        }

        fetchEnviroment();
    },[])


    useEffect(()=>{

        fetchPlants();
    },[])

    if(loading)
        return <Load/>
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                
                <FlatList
                //Vamos passar umas propriedades 
                data= {enviroments} //Ele vai ter 5 posições
                //Por questão de perfomace o Flatlist vai lhe dar melhor com as listas
                keyExtractor={(item) => String(item.key)} //Uma boa prática é utilizar String
                //Vamos pedir para ele renderizar || Com isso vamos passar uma função anônima 
                renderItem={({item})=> (
                    //Vamos passar o botão para ele renderizar
                    <ListaButton 
                       title={item.title}
                       //Vamos passar uma condição, vamos deixar um botão selecionado
                       active={item.key == enviromentSelected}
                       //Vamos selecionar o item |Mas vamos criar uma função|
                       onPress={()=> handleEnviromentSelect(item.key)}
                         
                    />
                 )}
                 //Deixa os icones na horizontal
                 horizontal
                 //Esconde a barrinha
                 showsHorizontalScrollIndicator={false}
                 //Por ser lista ela tem um tratamento diferente
                 contentContainerStyle={styles.enviromentList}
                 ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{ marginRight: 32 }}
                
                />
            </View>
            <View style={styles.plants}>
                    <FlatList
                        data={filteredPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem = {({item}) =>(
                            <PlantCardPrimary
                                data={item}
                                onPress={() => handlePlantSelect(item)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}//Quantas Colunas
                        onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}

                    ListFooterComponent={
                        //Vamos utilizar um verdadeiro e falso
                        loadingMore ?
                        //Barrinha de carregamento, vamos evitar que fique inifinitamente  
                        <ActivityIndicator color={colors.green}/>
                        //add um disfragment para nãocarregar nada
                        : <></>
                    }

                    />

            </View>
                    
        </View>
    )
} 


const styles = StyleSheet.create({
    container:{
        flex: 1,  
        backgroundColor: colors.background
    },
    header:{
        paddingHorizontal: 32
    },
    title:{
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 18,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle:{
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 18,
        lineHeight: 20,
    },
    enviromentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32
    }, plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },

})