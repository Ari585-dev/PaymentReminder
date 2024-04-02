import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image, Modal, Alert } from 'react-native';
import tailwind from 'twrnc';
import Home from './Home';
import { checkCredentials, getStudent, getDates, getNews} from '../api/api-utils';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const idRef = useRef("null");
  const passwordRef = useRef("null");

  const [modal, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [student, setStudent] = useState({});
  const [dates, setDates] = useState({});
  const [news, setNews] = useState({});

  const clearInput = () => {
    idRef.current.clear();
    idRef.current.focus()
    passwordRef.current.clear();
  }

  const login = () => {
    if ([id, password].includes('')) {
      Alert.alert('Error', 'Ingrese todos los datos');
      return;
    }
    checkCredentials(id, password)
      .then(() => {
        getStudent(id)
          .then((data) => {
            setStudent({
              id: id,
              name: data.student[0].first_name + " " + data.student[0].middle_name + " " + data.student[0].last_name,
              career: data.student[0].career,
              paid: data.student[0].payed,
              fee: data.student[0].tuition_value,
              photo: data.student[0].profile_picture,
            });
            console.log("user retrieved " + data.student[0].mail);
          })
          .catch((error) => {
            console.error('Response:', error.response.data);
          });

        getDates()
          .then((data) => {
            setDates({
              openingDate: data.openingDate,
              extraordinaryDate: data.extraordinaryDate,
              closingDate: data.closingDate,
            });
          })
          .catch((error) => {
            console.error('Response:', error.response.data);
          });

        getNews()
          .then((data) => {
            setNews({
              info_1: data.info_1,
              info_2: data.info_2
            });
          })
          .catch((error) => {
            console.error('Response:', error.response.data);
          });

        // Clear input fields using refs
        clearInput()
        setId("")
        setPassword("")
        console.log("login user");
        setModalVisible(true);
      })
      .catch((error) => {
        console.error('Response:', error.response.data.message);
        clearInput()
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <NavigationContainer>
      <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
        <View style={tailwind`p-8 w-full max-w-sm`}>
          <Image
            style={{ paddingLeft: 320, width: 340, height: 340 }}
            source={require('../img/udistritallogo.png')}
          />
          <Text style={tailwind`text-3xl font-bold mb-6 text-slate-900`}>
            Login
          </Text>

          <TextInput
            style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
            placeholderTextColor="#000"
            placeholder="Ingresa tu codigo"
            keyboardType='numeric'
            onChangeText={setId}
            ref={idRef}
          />

          <TextInput
            style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
            placeholderTextColor="#000"
            placeholder="Ingresa contraseña"
            secureTextEntry={true}
            onChangeText={setPassword}
            ref={passwordRef}
          />

          <View style={tailwind`flex flex-row justify-between items-center my-4`}>
            <View style={tailwind`flex-row items-center`}></View>
          </View>

          <Pressable
            style={tailwind`h-13 bg-blue-500 rounded-md flex flex-row justify-center items-center px-6`}
            onPress={() => login()}
          >
            <View style={tailwind`flex-1 flex items-center`}>
              <Text style={tailwind`text-white text-base font-medium`}>
                Login
              </Text>
            </View>
          </Pressable>

          <Home
            dates={dates}
            student={student}
            news={news}
            closeModal={closeModal}
            modal={modal}
          />
        </View>
      </View>
    </NavigationContainer>
  );
}
