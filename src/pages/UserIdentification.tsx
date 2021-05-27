import React, {useState} from 'react'
import{
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
}from 'react-native'
import {Button} from '../components/Button'
import {useNavigation} from '@react-navigation/core'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import AsyncStorage from '@react-native-async-storage/async-storage'


export function UserIdentification(){
//VAMOS CRIAR UM ESTADO, VAMOS SABER SE O FOCUS ESTÁ NO INPUT || ELE VAI IMPORTAR O useState do React para lhedar com estado  
    const[isFocused, setIsFocused] = useState(false) //Padrão
    //Vai ver se está preenchido
    const [isFilled, setIsFilled] = useState(false)
    //Vamos pegar o nome do usuário
    const [name, setName] = useState<string>()//Vamos tipar || e não vamos passar nada
    const navigation = useNavigation()

    function handleInputBlur(){
        setIsFocused(false)
        //Se ele sair do campo, vamos verificar se tem conteudo lá
        setIsFilled(!!name)//Se caso ele sair do conteúdo e tiver texto lá dentro, continuara verde, se não ficará cinza
    }
    function handleInputFocus(){
        setIsFocused(true)
    }
    //Ele vai verificar toda vez que o Input muda
    function handleInputChance(value: string){//Vamos capturar uma propriedade (value) passada pelo input (string)
        /*As duas esclamaçoes vão servir para transformar value em boolean || Se tem conteúdo -> Verdadeiro, se não tem -> Falso*/
        setIsFilled(!!value)
        setName(value)//Isso daqui é essencial para não dar erro na verificação

    }
     async function handleSubmit(){
        if(!name)
            return Alert.alert('Me diz como devo lhe chamar! 😥');
            try{
                await AsyncStorage.setItem('@plantmanager:user', name);
                navigation.navigate('Confirmation', {
                    title: 'Prontinho',
                    subtitle: ' Agora vamos começar a cuidar das suas plantinhas com muito cuidado. 🌱',
                    buttonTitle: 'Começar',
                    icon: 'smile',
                    nextScreen: 'PlantSelect',
                })
            }catch{
                Alert.alert('Não foi possível salvar o seu nome 😥');
            }
            
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                //Se a plataforma for android ele vai ser padding se não em qualquer outro vai ser height
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <View style={styles.content}>
                    <View style={styles.form}>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.emoji}>
                            {isFilled ? '😄' : '😀'}
                        </Text>
                        <Text style={styles.title}>
                            Como Podemos{'\n'}
                            chamar você?
                        </Text>
                    </View>    
                    <TextInput 
                    //Vamos passar um array/vetor aonde podeos passar mais de um estilo
                        style={[
                            styles.input,
                            //Se isFocused for verdadeiro e podemos ver se ele é preenchido
                            (isFocused || isFilled) &&
                            {borderColor: colors.green}
                        ]}
                        placeholder="Digite seu nome"
                            //NOME DA FUNÇÃO
                        onBlur={handleInputBlur} //Quando o usuário sai do nosso texto
                        onFocus={handleInputFocus} //Quando o focus vai para o input
                        onChangeText={handleInputChance}
                    />
                    
                    <View style={styles.footer}>
                        <Button
                            //Vamos precisar ir no nosso Button.tsx e vamos tipar ele
                            title= "Confirmar" //DANDO UM NOME AO BOTÃO
                            onPress={handleSubmit}
                            
                        />
                    </View>

                    </View>

                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems:'center',
        width: '100%',
    },
    content:{
        flex: 1,
        width: '100%',
    },
    form:{
    //Formulário 
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    emoji:{
        fontSize: 44,
    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 8,
        textAlign: 'center',
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 22
    },
    footer:{
        marginTop: 40,
        paddingHorizontal: 20,
        width: '100%',
    }
})