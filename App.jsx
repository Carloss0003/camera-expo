import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Button, Modal, Image } from 'react-native';
import {Camera, CameraType, FlashMode} from 'expo-camera'
import { useRef, useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false)
  const [capturedPhoto, setCaptured] = useState(null)
  const [typeCamera, setTypeCamera] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const ref = useRef(null)

  async function takePicture(){
    try{
      const options = {quality: 0.5, base64: true}
      const photo = await ref.current.takePictureAsync(options)
      setCaptured(photo.uri)
      setOpen(true)
    } catch(e){
      console.log(e)
    }
  }

  if (!permission) {
    return <View />;
  }

  if(!permission?.granted){
     return(
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
     )
  }

  function changeTypeCamera(){
    setTypeCamera(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Camera
         style={styles.cam}
         type={typeCamera}
         flashMode={FlashMode.auto}
         ref={ref}
      >
        
          <View 
          style={{
            marginBottom: 35, flexDirection: 'row', alignItems:"flex-end", justifyContent: 'space-between'
          }}
          >
              <TouchableOpacity 
              onPress={()=>takePicture()}
              style={styles.capture}
              >
                <Text>tirar foto</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={()=>changeTypeCamera()}
              style={styles.capture}
              >
                <Text>girar foto</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={()=>{}}
              style={styles.capture}
              >
                <Text>Album</Text>
              </TouchableOpacity>
          </View>
      </Camera>
      {
        capturedPhoto &&
      <Modal
        animationType='slide'
        transparent={false}
        visible={open}
      >
        <View 
        style={{
          flex: 1, 
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20
        }}
        >
          <Image
            resizeMode='contain'
            source={{uri: capturedPhoto}}
            style={{width: 350, height: 450, borderRadius: 15}}
          />
          <TouchableOpacity
            style={{margin: 18}}
            onPress={()=>setOpen(false)}
          >
             <Text style={{fontSize: 24}}>
               Fechar
             </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cam:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture:{
    flex: 0,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  }
});
