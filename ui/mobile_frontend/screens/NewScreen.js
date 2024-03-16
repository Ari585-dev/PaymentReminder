import React, { useState } from 'react';
import { Linking, Button, Modal, Text, Pressable, View, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';

const UserInfoScreen = ({ dates, student, news, closeModal, modal }) => {
  console.log(news)
  return (
    <Modal animationType="slide" visible={modal}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          {/* Slider Container */}
          <View style={styles.sliderContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {Object.entries(news).map(([key, value]) => (
                <View key={key} style={styles.sliderContainer}>
                  <Image source={{ uri: value }} style={styles.sliderImage} />
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.container}>
            <Image
              source={{
                uri: student.photo
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
            {student.paid ? (
              <Text style={styles.texts}>Pago realizado</Text>
            ) :
              <View style={styles.textContainer}>
                <Text style={styles.texts}>{"Apertura de pago : " + dates.openingDate}</Text>
                <Text style={styles.texts}>{"Cierre de fechas de pago : " + dates.openingDate}</Text>
                <Text style={styles.texts}>{"Pago extraordinario : " + dates.openingDate}</Text>
              </View>
            }

            {student.paid ? (
              <Text style={styles.texts}>{`Tarifa pagada :  ${student.fee}`}</Text>
            ) :
              <Text style={styles.texts}>{`Tarifa matricula : ${student.fee}`}</Text>
            }
          </View>

          <View style={{ marginTop: 100 }}></View>

          <View style={styles.menuContainer}>
            {!student.paid && (
              <Button title="Pagar" onPress={() => Linking.openURL('https://google.com')} />
            )}
            <View style={{ marginTop: 10 }}></View>
            <Button title="Cerrar Sesion" onPress={closeModal} />
          </View>

          {/* Button to navigate to UserInfoScreen */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText}>Ir a Información</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#334',
  },
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  sliderContainer: {
    height: 200,
  },
  sliderImage: {
    width: 500,
    height: 200,
    resizeMode: 'cover',
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: '#FF0001',
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

export default UserInfoScreen;
