import React from 'react';
import { Button, Modal, Text, Pressable, View, SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = ({ closeModal, modal }) => {
  return (
    <Modal animationType="slide" visible={modal}>
      <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: '#334' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                Julian Gomez
            </Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>
                Tec. Sistematizacion de Datos
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 128 }}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 16 }}>
                No ha pagado
            </Text>
          </Pressable>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
            <Ionicons name="help-buoy-outline" size={24} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 16 }}>
                Pagar
            </Text>
          </Pressable>
          <Pressable  onPress={closeModal} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
            <MaterialIcons name="logout" size={24} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 16 }}>
                Cerrar Sesion
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Home;
