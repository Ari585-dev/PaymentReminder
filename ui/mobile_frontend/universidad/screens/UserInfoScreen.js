import React from 'react';
import { Linking, Button, Modal, Text, Pressable, View, SafeAreaView, StyleSheet, Image } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserInfoScreen = ({ dates, student, closeModal, modal }) => {
  return (
    <Modal animationType="slide" visible={modal}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {student.photo ? (
            <Image
            source={{
              uri: student.photo
            }}
            style={styles.images}
          />
          ) :
          <Image
            source={require('../img/person.png')}
            style={styles.images}
          />
          }
          
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{student.name}</Text>
            <Text style={styles.texts}>{student.career}</Text>
            <Text style={styles.texts}>{student.id}</Text>
          </View>
        </View>

        <View style={{ marginTop: 100 }}></View>
        <View style={styles.menuContainer}>
          {student.paid ? (
            <View style={styles.textContainer}>
            <Text style={styles.texts}>{"Pago realizado"}</Text>
          </View>
          ) :
            <View style={styles.textContainer}>
              <Text style={styles.texts}>{"Apertura de pago : " + dates.openingDate}</Text>
              <Text style={styles.texts}>{"Cierre de fechas de pago : " + dates.closingDate}</Text>
              <Text style={styles.texts}>{"Pago extraordinario : " + dates.extraordinaryDate}</Text>
            </View>
          }

          {student.paid ? (
            <MenuItem icon="settings-outline" text={`Tarifa pagada :  ${student.fee}`} />
          ) :
            <MenuItem icon="settings-outline" text={`Tarifa matricula : ${student.fee}`} />
          }
          
        </View>

        <View style={{ marginTop: 100 }}></View>
        
        <View style={styles.menuContainer}>
          {/*<ButtonStyle text="Ver Datos" />*/}
          {!student.paid && (
            <ButtonStyle text="Pagar" onPress={()=> Linking.openURL('https://google.com')} style={styles.blueButtonStyle}/>
          )}
          <View style={{ marginTop: 10 }}></View>
          <ButtonStyle text="Cerrar Sesion" onPress={closeModal} />
        </View>
        
      </SafeAreaView>
    </Modal>
  );
};

const MenuItem = ({ icon, text }) => (
  <Pressable style={styles.menuItem}>
    <Text style={styles.texts}>{text}</Text>
  </Pressable>
);

const ButtonStyle = ({ text, onPress }) => (
  <Pressable onPress={onPress} style={styles.buttonStyle}>
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#334',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButtonStyle: {
    backgroundColor: 'blue', // Blue background color
    marginHorizontal: 40,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  nameText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  texts: {
    color: '#fff',
    fontSize: 16,
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  buttonStyle: {
    backgroundColor: '#778899',
    marginHorizontal: 40,
    padding: 12,
    width: 170,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInfoScreen;
