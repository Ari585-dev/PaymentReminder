import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({ dates, student, news, closeModal, modal }) => {
  console.log(news)
  const navigation = useNavigation();

  const navigateToUserInfo = () => {
    closeModal(); // Close the current modal
    navigation.navigate('UserInfo'); // Navigate to UserInfoScreen
  };

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

          {/* Student Information */}
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{student.name}</Text>
              <Text style={styles.texts}>{student.career}</Text>
              <Text style={styles.texts}>{student.code}</Text>
            </View>
          </View>

          {/* Button to navigate to UserInfoScreen */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonStyle}
              onPress={navigateToUserInfo}
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

export default Home;
