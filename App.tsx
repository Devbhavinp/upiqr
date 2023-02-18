import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Button, Pressable } from 'react-native';
import AddUpi from './AddUpi';

export default function App() {
  const [UpiModalVisible, setUpiModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  const onPress = () => { };
  const arr = [1, 1, 1, 1, 1, 1, 11, 1];

  const onPressAddUpi = () => {
    setUpiModalVisible(true)
  }
  
  const onPressShowQr = () => {}

  const temp = (): any => arr.map((value) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress} >
        <View style={styles.cardContainer}>
          <Image style={{ width: 40, height: 40 }} source={require('./assets/scan.png')} />
          <View style={styles.cardTexts}>
            <Text style={styles.cardTitle}>Axis Bank</Text>
            <Text style={styles.cardSubText}>abcd@upi</Text>
          </View>
          <View>
            <Text style={styles.ShowQr} onPress={onPressShowQr}>Show QR</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  })


  if (!fontsLoaded) {
    return (
      <View><Text>Loading</Text></View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={{ width: 50, height: 50 }} source={require('./assets/logo.png')} />
          <Image style={{ width: 28, height: 28 }} source={require('./assets/share.png')} />
        </View>
        <Text style={styles.headerText}>Hello, Good Morning</Text>
        <ScrollView style={styles.listWrapper}>
          {temp()}
        </ScrollView>
        <View style={styles.footer}>
          <Button
            onPress={onPressAddUpi}
            title="ADD NEW UPI"
            color="#C1C1C1"
            />
        </View>
        <StatusBar style="auto" />
        {UpiModalVisible && <View>
           <AddUpi {...{UpiModalVisible, setUpiModalVisible}} />
           </View>
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
    flexDirection: 'row'
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
    paddingLeft: 60
  },
  footer: {
    width: "100%",
    padding: 18,
    color: "#FFFFFF",

  },

});
