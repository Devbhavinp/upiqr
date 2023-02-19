import React, { useState } from 'react'
import { Button, Image, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import ModalUPI from './ModalUPI';

const ShowQr = ({ showQrData }: any) => {
    const data = JSON.parse(JSON.stringify(showQrData)) || {}
    const [modalVisible, setModalVisible] = useState(false);
    const [qrValue, setQrValue] = useState("")

    const onPressAddAmount = () => {
        setModalVisible(true)
    }

    const handleSubmit = () => {
        alert(qrValue)
        setModalVisible(false)
    }

    return (
        <View style={styles.container} >
            <Text style={styles.details}>{data?.userName}</Text>
            <Text style={styles.details}>{`${qrValue} ${qrValue && "₹"}`}</Text>
            <View style={styles.qrCode}>
                <QRCode
                    value={`upi://pay?pn=${data?.userName}&pa=${data?.upiId}&am=${qrValue}` || "0"}
                    size={200}
                    color="white"
                    backgroundColor='black'
                />
            </View>
            <Text style={styles.details}>{data?.upiId}</Text>
            <Image style={styles.paymentLogo} source={require('./assets/paymentsLogo.png')} />
            <View style={styles.footer}>
                <Button
                    onPress={onPressAddAmount}
                    title={qrValue ? "UPDATE AMOUNT" : "ADD AMOUNT"}
                    color="#C1C1C1"
                />
            </View>
            {modalVisible &&
                <ModalUPI {...{ UpiModalVisible: modalVisible, setUpiModalVisible: setModalVisible }}>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>ADD AMOUNT</Text>
                                <Text style={styles.inputLabel}>Amount</Text>
                                <SafeAreaView>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.input}
                                        onChangeText={(event) => setQrValue(event)}
                                        value={qrValue}
                                    />
                                </SafeAreaView>
                                <View>
                                    <Button
                                        onPress={handleSubmit}
                                        title="ADD NEW UPI"
                                        color="#227AFF"
                                    />
                                </View>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </ModalUPI>
            }
        </View >
    )
}

export default ShowQr

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 50,
        fontFamily: 'Nunito-Regular'
    },
    details: {
        marginLeft: 150,
    },
    qrCode: {
        width: 250,
        height: 250,
        marginLeft: 50,
        marginTop: 30,
        marginBottom: 30
    },
    paymentLogo: {
        width: 320,
        height: 100,
        marginTop: 40,
        marginLeft: 20
    },
    footer: {
        width: "100%",
        padding: 18,
        color: "#FFFFFF",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 10,
        width: 150,
        borderWidth: 1,
        padding: 10,
    },
    modalTitle: {
        fontSize: 12
    },
    inputLabel: {
        color: "#7E7E7E"
    }
})

