import React, {useState, useEffect}from 'react'
import{
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions
}from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import colors from '../styles/colors'
import UserImg from '../assets/profile.png'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Header(){
    const [userName, setUserName] = useState<string>()

    useEffect(() =>{
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')//Caso tenha alguma coisa dentro do user que vai ser salvo dentro de userName, se não nada é passado
        }

        loadStorageUserName();

    },[])

    return(
        <View style={styles.container}>
            <View>
               <Text style={styles.greeting}>Olá,</Text> 
               <Text style={styles.userName}>
                   {userName}
               </Text>
            </View>

            <Image 
            source={UserImg}
            style={styles.imagem}
            
            />

        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
        
        
    },
    imagem:{
        width: 70,
        height: 70,
        borderRadius: 40,
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40 //Diminuir o tamanho da largura da linha
    }
})