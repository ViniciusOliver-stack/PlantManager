import React, {useEffect, useState} from 'react';
import{
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ScrollView
}from 'react-native'

import { Header } from '../components/Header';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png'
import {loadPlant, PlantProps} from '../libs/storage'
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { Load } from '../components/Load';

export function MyPlants(){

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true)
    const [nextWaterd, setNextWatered] = useState<string>()

    useEffect(() => {
        async function loadStorageData() {
            const plantStoraged = await loadPlant()

            const nextTime = formatDistance(
                new Date(plantStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            )

            setNextWatered(
                `Não esqueça de regar a ${plantStoraged[0].name} à ${nextTime} horas.`
            )   
            setMyPlants(plantStoraged);
            setLoading(false);
        }

        loadStorageData();

    },[])

    if(loading)
        return <Load/>

    return(
        <ScrollView
        showsVerticalScrollIndicator={false}
        >


        <View style={styles.container}>
            <Header/>

            <View style={styles.spolight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                    />

            <Text style={styles.spotlightText}>
                {nextWaterd}
            </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                 <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) =>(
                        <PlantCardSecundary data={item} />
                    )}
                    contentContainerStyle={styles.enviromentList}
                    ListHeaderComponent={<View />}
                    ListHeaderComponentStyle={{ marginRight: 28 }}
                    showsVerticalScrollIndicator={false}
                 />

            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
        padding: 20,
    },
    spolight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage:{
        width: 60,
        height: 60,
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify',
    },
    plants:{
        flex: 1,
        width: '100%',
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    },
    enviromentList:{
        justifyContent: 'center',
        paddingBottom: 5,

    }
    
})