import React from 'react';
import { Button, Modal, Text, Pressable, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = ({ student, closeModal, modal }) => {
  return (
    <Modal animationType="slide" visible={modal}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffsb.zobj.net%2Fcrop.php%3Fr%3D-WnRmZYofphVXIyOkV2jfF2SO8DitxezmLUyyNT774rxytsS34ceq0x2sX3gLexXw5VbEWzdr-57gS3WgNdsVWeyQ5RwOy7V4pO612o7O_aZ9fvXH5g5nMSAcZJKvUjrQj50WNVxwNwbqAqy&f=1&nofb=1&ipt=c4e447e9149db09d44c6d2559b6ff68a07d1d07d2f227aa701f2e1d715e74f8e&ipo=images'
            }}
            style={styles.images}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{student.name}</Text>
            <Text style={styles.texts}>{student.career}</Text>
            <Text style={styles.texts}>{student.code}</Text>
          </View>
        </View>

        <View style={{ marginTop: 100 }}></View>

        <View style={styles.menuContainer}>
          <MenuItem icon="settings-outline" text="fechas" />
          <MenuItem icon="settings-outline" text="Precio a pagar / Pagado" />
          <ButtonStyle text="Pagar"/>
        </View>

        <View style={{ marginTop: 100 }}></View>

        <View style={styles.menuContainer}>
          <ButtonStyle text="Ver Datos" />
          <ButtonStyle text="Cerrar Sesion" onPress={closeModal} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const MenuItem = ({ icon, text }) => (
  <Pressable style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#fff" />
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
    backgroundColor: '#6D28D9',
    marginHorizontal: 40,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
