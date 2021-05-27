import React from 'react'
import{
    Text, SafeAreaView, 
    Image, StyleSheet, 
    TouchableOpacity, Dimensions, 
    View
}from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/core'
import watering from '../assets/watering.png';
import colors from '../styles/colors';
import fontes from '../styles/fonts'

export function Wellcome(){
    const navigation = useNavigation()
    //Vamos criar uma função, como se fosse startar nosso projeto
    function handleStart(){ //Vamos chamar essa função lá em baixo
        //É com ele que vammos conseguir navegar
        navigation.navigate('UserIdentification')//Coloque o nome da tela que vc quer ir
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
            <Text style={styles.title}> 
                Gerencie{'\n'} 
                suas plantas de{'\n'} 
                forma fácil
            </Text>

            <Image 
                source={watering} 
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas. 
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.7}
                onPress={handleStart} //Quando apertar, ela vai direto para outra tela
                >
                    <Text style={styles.buttonIcons}>
                       <Feather
                        name= 'chevron-right'
                        style={styles.buttonIcons}
                       />
                    </Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    wrapper:{
        flex: 1,
        justifyContent: 'space-around',//Para não colar nas bordas
        alignItems:'center',
        paddingHorizontal: 20
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:38,
        color: colors.heading,
        fontFamily: fontes.heading,
        lineHeight: 34

    },
    subtitle:{
        textAlign:'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fontes.text
    },
    
    image:{
        height: Dimensions.get('window').width * 0.7 
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        //Para da um subida nele
        marginBottom: 10, 
        //Definindo Tamanho
        height: 56,
        width: 56
    }, 
    buttonIcons:{
        fontSize: 32,
        color: '#FFFFFF',
        
    }
})