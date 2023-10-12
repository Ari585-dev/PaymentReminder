import {View,Text,TextInput,Pressable,Image, Modal,Alert,} from 'react-native';
import React, {useState} from 'react';
import tailwind from 'twrnc';
import Home from './Home';
import { checkCredentials, getStudent } from './api-utils'

export default function LoginScreen() {
  const [modal, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [student, setStudent] = useState({});
  //const [dates, setDates] = useState([])

  const login = () => {
    if ([id, password].includes('')) {
      Alert.alert('Error', 'Ingrese todos los datos');
      return;
    }
    console.log(id)
    checkCredentials(id, password) // Use the checkCredentials function
    .then(() => {
      getStudent(id) // Use the checkCredentials function
      .then((data) => {
        setStudent({
          id: id,
          name: data.student[0].first_name + " " + data.student[0].last_name,
          career: data.student[0].career,
          paid: data.student[0].payed,
          fee: data.student[0].tuition_value,
        });
      })
      .catch((error) => {
        console.error('Response:', error.response.data);
      });
      setModalVisible(true);
    })
    .catch((error) => {
      console.error('Response:', error.response.data.message);
    });    
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
          placeholder="Ingresa email"
          onChangeText={setId}
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
/*

    fetch('http://localhost:3000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ mail: email, password: password }),
})
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Handle response errors here
      throw new Error('Login failed');
    }
  })
  .then((data) => {
    // If the login was successful, update the student state
    setStudent(data);

    // Show the modal
    setModalVisible(true);
  })
  .catch((error) => {
    console.error('Network error:', error);

    // Handle the error or display a meaningful message to the user
    console.log('Network error');
  });
  */ 