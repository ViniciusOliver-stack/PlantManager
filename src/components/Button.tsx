import React from 'react'
import{ 
    TouchableOpacity,
    Text,
    StyleSheet, 
    TouchableOpacityProps
 }from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

//Vamos criar uma interface com um nome. |Vamos importar ele| Este botão ele é uma tipagem
interface ButtonProps extends TouchableOpacityProps{
    title: string //Poderemos utilizar esse nome dinamicâmente
}
                            //Vamos passar todo o resto
export function Button({title, ...rest}: ButtonProps){
    return (
        //Precisaremos tipar esses botões
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}
                {...rest}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        },
    text:{
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }
})