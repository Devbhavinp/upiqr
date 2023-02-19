import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import AddUpi from './AddUpi';
import { Storage } from 'expo-storage';
import ShowQr from './ShowQr';

export default function App() {
  const [UpiModalVisible, setUpiModalVisible] = useState(false);
  const [modalShowQr, setModalShowQr] = useState(false)
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  const [allData, setAllData] = useState([])
  const [showQrData, setShowQrData] = useState({})
  const onPress = async (value: any) => {
    setUpiModalVisible(true)
  };

  useEffect(() => {
    (async () => {
      const item = JSON.parse(await Storage.getItem({ key: `UPIDataList` })) || []
      setAllData(item)
    })();
  })

  const onPressAddUpi = () => {
    setUpiModalVisible(true)
  }

  const onPressShowQr = async (value: any) => {
    // await Storage.removeItem({ key: `UPIDataList` })
    // alert('clear data' + + value)
    setShowQrData(value)
    setModalShowQr(true)
  }

  const viewUPIList = (): any => {
    return allData && allData.length ? allData.map((value: any, index: number) => (
      <TouchableOpacity key={index} style={styles.button} onPress={() => onPress(value)} >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View style={styles.cardContainer}>
            <Image style={{ width: 40, height: 40 }} source={require('./assets/scan.png')} />
            <View style={styles.cardTexts}>
              <Text style={styles.cardTitle}>{value?.userName}</Text>
              <Text style={styles.cardSubText}>{value?.upiId}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.ShowQr} onPress={() => onPressShowQr(value)}>Show QR</Text>
          </View>
        </View>
      </TouchableOpacity>
    ))
      : (<View><Text>No Data</Text></View>)
  }


  if (!fontsLoaded) {
    return (
      <View><Text>Loading</Text></View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {modalShowQr ?
            <TouchableOpacity onPress={() => setModalShowQr(false)}><Image style={{ width: 50, height: 50 }} source={require('./assets/back.png')} /></TouchableOpacity>
            : <Image style={{ width: 50, height: 50 }} source={require('./assets/logo.png')} />}
          <Image style={{ width: 28, height: 28 }} source={require('./assets/share.png')} />
        </View>
        {modalShowQr ? <ShowQr {...{ showQrData }} /> :
          <>
            <Text style={styles.headerText}>Hello, Good Morning</Text>
            <ScrollView style={styles.listWrapper}>
              {viewUPIList()}
            </ScrollView>
            {UpiModalVisible &&
              <AddUpi {...{ UpiModalVisible, setUpiModalVisible }} />
            }
            <View style={styles.footer}>
              <Button
                onPress={onPressAddUpi}
                title="ADD NEW UPI"
                color="#C1C1C1"
              />
            </View>
            <StatusBar style="auto" />
          </>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
    fontFamily: 'Nunito-Regular'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Nunito-Medium',
    marginTop: 20,
    textAlign: 'left',
    paddingLeft: 40,
    paddingRight: 40,
  },
  listWrapper: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  button: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 25,
    borderRadius: 10,
    borderColor: '#999',
    borderWidth: 1
  },
  cardContainer: {
    flexDirection: 'row',
  },
  cardTexts: {
    marginLeft: 15
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    lineHeight: 22
  },
  cardSubText: {
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    color: '#7e7e7e',
    lineHeight: 15
  },
  ShowQr: {
    color: "#227AFF",
    paddingTop: 10,
  },
  footer: {
    width: "100%",
    padding: 18,
    color: "#FFFFFF",
  },

});
