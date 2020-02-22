import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet, TouchableHighlightBase, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions: null,
      scan:false,
      scanedData:'',
      buttonState:'normal'
    }
  }
  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(PermissionsCAMERA);
this.setState({
  hasCameraPermissions:status ==='granted',
  buttonState:'clicked',
  scaned:false
});
  }

  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    })
  }

    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
const scanned=this.state.scanned;
const buttonState=this.state.buttonState;
if(buttonState==="clicked"&& hasCameraPermissions){
  return (
    <BarCodeScanner
     onBarCodeScanned={scanned ? undefined: this.handleBarCodeScanned}
     style={StyleSheet.absoluteFillObject}
    />
  )
}
else if(buttonState==="normal"){
      return (
        <View style={styles.container}>
    <Text style={styles.displayText}>{
      hasCameraPermissions===true ? this.state.scanedData:"request Camera permision"
    }</Text>
          <TouchableOpacity 
          onPress={this.getCameraPermissions}
          style={styles.scanButon}> 
            <Text style={styles.buttonText}> scan QR code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
  const styles=StyleSheet.create({
container:{
  flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
},
displayText:{
  fontSize:16,
  textDecorationLine:'underline'
},
scanButon:{
  backgroundColor:'#2196F3',
  padding:10,
  margin:10,
},
buttonText:{
  fontSize:20,
}
  })
  