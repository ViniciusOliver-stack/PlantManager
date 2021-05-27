import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import colors from '../styles/colors'
import { Wellcome } from '../pages/Wellcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSaver } from '../pages/PlantSave';
import {MyPlants} from '../pages/MyPlants'
import AuthRoutes from './tab.routes';


const stackRoutes = createStackNavigator();
// Vamos da um nome a ele e vamos tipar ele, ele será React Funcinol Components
const AppRoutes: React.FC = () => (
    //Vamos definir nossa pilha de navegação
    <stackRoutes.Navigator
    //Vamos passar algumas propriedades
    headerMode='none' //Quero que o header não apareça
    screenOptions={{ //Vamos passar umas propriedades
        cardStyle:{//Vamos definir o nosso card da cor branca
            backgroundColor: colors.white
        },
    }}
    >
    
        <stackRoutes.Screen
        //Vamos definir como vai funcionar a navegação
            name="Wellcome" //Nome da Tela
            component={Wellcome} //Componente que queremos renderizar

        />
        <stackRoutes.Screen
        //Vamos definir como vai funcionar a navegação
            name="UserIdentification" //Nome da Tela
            component={UserIdentification} //Componente que queremos renderizar
            
        />
        <stackRoutes.Screen
        //Vamos definir como vai funcionar a navegação
            name="Confirmation" //Nome da Tela
            component={Confirmation} //Componente que queremos renderizar
            
        />
        <stackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes}
        />
        <stackRoutes.Screen
            name="PlantSaver"
            component={PlantSaver}
        />
        <stackRoutes.Screen
            name = "MyPlantsScreen"
            component={AuthRoutes}
        />
        
    </stackRoutes.Navigator>
)

export default AppRoutes;