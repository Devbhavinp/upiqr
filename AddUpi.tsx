import React, { useState, useEffect } from 'react'
import { Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'

const AddUpi = ({ UpiModalVisible, setUpiModalVisible }: any) => {
  const [newUPIData, setNewUPIData] = useState({
    userName: "",
    upiId:""
  })

  const Arr = [
    { title: 'Merchant/Payee Name', name: "userName" },
    { title: 'UPI ID', name: "upiId" },
  ]

  const onChangeText = ({ name, event }: any) => {
    setNewUPIData({ ...newUPIData, [name]: event })
  }

  const handleSubmit = () => {
    alert(JSON.stringify(newUPIData))
  }
  
  return (

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={UpiModalVisible}
        onRequestClose={() => {
          setUpiModalVisible(!UpiModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>ADD NEW UPI</Text>

            {Arr.map((val) => (
              <View>
                <Text style={styles.inputLabel}>{val.title}</Text>
                <SafeAreaView>
                  <TextInput
                    style={styles.input}
                    onChangeText={(event) => onChangeText({ name:val.name, event })}
                    value={newUPIData[val.name]}
                  />
                </SafeAreaView>
              </View>
            ))}

            <View>
            <Button
              onPress={handleSubmit}
              title="ADD NEW UPI"
              color="#227AFF"
            />
            </View>
          </View>
        </View>
      </Modal>

    </View>

  )
}


export default AddUpi

const styles = StyleSheet.create({
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

});