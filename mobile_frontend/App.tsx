import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import tailwind from 'twrnc';
import Home from './Home';

export default function LoginScreen() {
  const [modal, setModalVisible] = useState(false);
  const [code, setCode] = useState(0);
  const [password, setPassword] = useState(0);
  const [student, setStudent] = useState({});
  //const [dates, setDates] = useState([])
  const login = () => {
    if ([code, password].includes('')) {
      Alert.alert('Error', 'Ingrese todos los datos');
      return 
    } 
    //if login data base
    
    setStudent({
      code: code,
      name: 'Julian Gomez',
      career: 'Tec Sistematización de Datos',
      paid: true,
      fee: 123.21,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Image
          style={{paddingLeft: 320, width: 340, height: 340}}
          source={require('./img/udistritallogo.png')}
        />
        <Text style={tailwind`text-3xl font-bold mb-6 text-slate-900`}>
          Login
        </Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Ingresa codigo de estudiante"
          onChangeText={setCode}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#000"
          placeholder="Ingresa contraseña"
          onChangeText={setPassword}
        />

        <View style={tailwind`flex flex-row justify-between items-center my-4`}>
          <View style={tailwind`flex-row items-center`}></View>
        </View>

        <Pressable
          style={tailwind`h-13 bg-blue-500 rounded-md flex flex-row justify-center items-center px-6`}
          onPress={() => login()}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>
              Login
            </Text>
          </View>
        </Pressable>

        <Home
          //dates={dates}
          student={student}
          closeModal={closeModal}
          modal={modal}
        />
      </View>
    </View>
  );
}
