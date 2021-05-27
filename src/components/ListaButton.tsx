//EnviromentButton
import React from 'react'
import {
    StyleSheet, Text
} from 'react-native'
//Criar um outro botão || Ele foi instalado quando a gente fez a parte de navegação
//RectButtonProps -> Ele é um botão que já traz por default com as características na hora do click
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


interface ListaButtonProps extends RectButtonProps{
    title: string
    //Com a ? fala com que ele não seja obrigatório, então ele se torna opcional 
    active?: boolean //Queremos deixar destacado uma categoria quando for selecionada
}
export function ListaButton({
    title,
//Vamos passar o false, caso alguém for chamar esse componente e não esteja ativo, ele será falso || Quando ele ficar verdadeiro que ele fique com a cor ativa
    active = false,
    ...rest
} : ListaButtonProps){
    return(
        <RectButton
        //A gente consegue acomular estilos. Vamos fazer isso passando vetores
            style={[
                styles.container,
                //Se for ativo. ele vai adicionar esse estilo || Para que ele fique personalizado, é só add ele no botão
                active && styles.containerActive
            ]}
            {...rest}
        >
            <Text style={[
                styles.text,
                active && styles.textActive
                ]}>
                {title}
            </Text>

        </RectButton>
    )       
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.shape,
        height:40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5,
    },
    //Quando ele estiver ativo
    containerActive:{
        backgroundColor: colors.green_light
    },
    text:{
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive:{
        fontFamily: fonts.heading,
        color: colors.green_dark
    }
})