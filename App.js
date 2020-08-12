import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera_type: 'RNCamera.Constants.Type.front',
    };
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#000'}}>Photo page of passport </Text>
          <Text style={{color: '#000', textAlign: 'center'}}>
            Make sure your ID is physically present, all details are clear to
            read with no blur or glare
          </Text>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Icon
              color={'#000'}
              name="camera"
              type="entypo"
              size={50}
              activeOpacity={0.6}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.chooseImage}
            style={styles.btnSection}>
            <Text style={styles.btnText}>Choose File</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  chooseImage = () => {
    ImagePicker.launchImageLibrary('', (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('source URI', source);
        console.log('response from Image Picker', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri,
        // });
      }
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log('Photo taken value', data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  preview: {
    flex: 0.7,
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    // flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
});
export default App;
