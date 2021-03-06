
import React, { Component } from 'react';
import {  Body,  Container,  Header,  Title, Right,} from 'native-base';
import {
    StyleSheet, View, Text,  TextInput, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth'
import colors from '../../assets/colors'
import firestore from '@react-native-firebase/firestore'
import OneSignal from 'react-native-onesignal'
export default class LoginScreenBuyer extends Component {
    constructor(props){
        super(props)
        this.state ={
            email : '' ,
            password : '',
            userId : '',
        }
    }
    componentDidMount = async() => {
        await OneSignal.addEventListener('ids', this.onIds)
    }
    
    onIds = (devices) => {
        console.log('Device info = ', devices)
        this.setState({
          userId: devices.userId
        })
      }
    
      signIn = async() => {
        await firestore().collection("Users").doc(this.state.Id).update({
          OneSignalId : this.state.userId
        })
        this.props.navigation.navigate('Divider',{
            email : this.state.email
        })
      }
    login = () => {
        auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(
            () => this.signIn())
          .catch((e) => console.log(e))
      }
    render() {
        return (
            <Container style={styles.container}>

              
                <View style={styles.innerContainer}>
                    <Image 
                        source = {require('../images/logo1.jpg')}
                        style = {{height:200 , width:200}}
                    />
                <Text style={{fontSize:50,fontWeight:'bold',padding:15}}>GreyBazaar</Text>
                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        placeholder="email-id"
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholder="password"
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <TouchableOpacity onPress={() => this.login()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>


                    <Text style={styles.lastText}>
                        Don't have an account? {"\t\t"}

                        <Text
                            style={styles.signupText}
                            onPress={() => this.props.navigation.navigate('ChoiceRoute')}>
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    horizontalLine: {
        borderBottomColor: colors.colorBlack,
        borderColor: colors.colorRed,
        height: 0,
        width: 150,
        borderStyle: 'solid',
        margin: 10,
        borderBottomWidth: 1,
    },
    container: {
        // paddingTop: 20,
        flex: 1,
        backgroundColor: colors.colorShadow,
        justifyContent:'center'
    },
    heading: {
        color: colors.colorBlack,
        fontSize: 26,
        marginBottom: 10,
        
    },
    inputBox: {
        marginVertical: 14,
        paddingHorizontal: 16,
        width: 300,
        height: 50,
        backgroundColor: colors.colorShadow,
        fontSize: 16,
        // borderRadius: 25,
    },
    innerContainer: {
        padding: 10,
        margin: 15,
        borderRadius: 10,
        backgroundColor: colors.colorWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:
    {
        fontSize: 18,
        alignContent: 'center',
        justifyContent: 'center',
        color: colors.colorWhite,
        textAlign: 'center'
    },
    button:
    {
        paddingVertical: 15,
        paddingHorizontal: 15,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        width: 140,
        backgroundColor: colors.colorBlue,
    },
    signupText: {
        fontSize: 16,
        color: colors.colorBlue,
        textDecorationLine: 'underline',
    },
    lastText: {
        margin: 20,
        fontSize: 16,
    }
})
