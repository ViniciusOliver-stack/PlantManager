import React, {useState, useEffect}from 'react'
import{
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity, 
}from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper' 
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { useNavigation, useRoute } from '@react-navigation/core' //Conseguimos recuperar valores passados pela rota
import {SvgFromUri} from 'react-native-svg'
import {Button} from '../components/Button'
import waterdrop from '../assets/waterdrop.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import {format, isBefore} from 'date-fns'
import {loadPlant, PlantProps, savePlant } from '../libs/storage'

interface Params{
    plant: PlantProps
}

export function PlantSaver(){
    //Vamos criar um estado para o horário selecionado
    const [ selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

    const route = useRoute()
    const {plant} = route.params as Params;

    const navigation = useNavigation()

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState)
        }
        //Fazer com que a pessoa não escolha uma data antes
        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date())
            return Alert.alert("Escolha um data no futuro! ⏳")
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }
    function handleOpenDatetimePickerForAndroid(){
            setShowDatePicker(oldState => !oldState)
        }
        

        async function handleSave(){

            try {   
                await savePlant({
                    ...plant,
                    dateTimeNotification: selectedDateTime
                });

                navigation.navigate('Confirmation', {
                    title: 'Tudo Certo',
                    subtitle: ' Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                    buttonTitle: 'Muito Obrigado! :D',
                    icon: 'hug',
                    nextScreen: 'MyPlantsScreen',
                })

            }catch{
                Alert.alert("Não foi possível salvar! 😥")
            }
        }

    return(

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.conatiner}
        >

        <View style={styles.conatiner}>
        <View style={styles.plantInfo}>
            <SvgFromUri
                uri={plant.photo}
                height={150}
                width={150}
            />
        
            <Text style={styles.plantName}>
               {plant.name}
            </Text>
            <Text>
                Sobre a Planta  
            </Text>
            <Text style={styles.plantAbout}>
                {plant.about}
            </Text>

        </View>
        <View style={styles.controller}>
            <View style={styles.tipContainer}>
                <Image
                    source={waterdrop}
                    style={styles.tipImage}
                />
                <Text style={styles.tipText}>
                    {plant.water_tips}
                </Text>
            </View>

            <Text style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado
            </Text>
            {
                showDatePicker && (
                <DateTimePicker
                    value={selectedDateTime}
                    mode='time'
                    display="spinner"
                    onChange={handleChangeTime}
            />
                )}

                {
                    Platform.OS == 'android' && (
                        <TouchableOpacity 
                            onPress={handleOpenDatetimePickerForAndroid}
                            style={styles.PickerButton}
                        >
                        <Text style={styles.dateTimePickerText}>
                            {`Mudar Para ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                        </TouchableOpacity>
                    )
                }

            <Button
                title="Cadastrar Planta"
                onPress={handleSave}
            />


        </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        marginTop: 15,
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage:{
        width: 56,
        height: 56
    },
    tipText:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    PickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
        
    },
    dateTimePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }

})