import React from 'react'
import{
    NavigationContainer
}from '@react-navigation/native'

import StackRoutes from './stack.routes'
//Container de Navegação
const Routes = () => (
    <NavigationContainer>
        <StackRoutes/>
    </NavigationContainer>
)   
//Vamos criar isso, pq ao inves de chamar tela por tela, chamamos o Routes
export default Routes;