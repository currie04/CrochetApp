import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Modal} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import from expo-image-picker
import AsyncStorage from '@react-native-async-storage/async-storage';


import Button from '../Button.js';

/*Allows storage of photos selected from user gallery 
  Currently does not save when exiting gallery - update to use async storage instead of image array
  
  Potentially see about storing code differently
  
  All console logs currently used for error catching and debugging*/

export default function Gallery({ navigation }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
const [modalVisible, setModalVisible] = useState(false);

  //Picks an image from the image library
  const pickImageAsync = async () => {

    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      
      //print result to check it is defined
      console.log(result);

      if (!result.canceled) {
        //result.uri was accessing it wrong
        const selectedImageUri = result.assets[0].uri;
        console.log('Selected image URI:', selectedImageUri);
        setImages(prevImages => [...prevImages, selectedImageUri]);
      } else {
        alert('You did not select any image.');
      }
    } catch (error) {
      console.log('error picking image: ', error);
    }
  };

   //Used for debugging
   useEffect(() => {
    console.log('Updated images:', images);
  }, [images]); // This will run every time 'images' changes


  //rendering images in grid
  const renderItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.imageItem}
    onPress={() => {
      setSelectedImage(item);
      setModalVisible(true);
    }}>

      <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    //UI of the Gallery page
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <Button label="Add Photo" onPress={pickImageAsync} />
      <Button label="Home" onPress={() => navigation.navigate("Home")} />
      {/* Displaying chosen images in a grid using a flatlist */}
      <FlatList
        data={images}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      
      {/* Allows images to be viewed in large using a modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <Button label="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7db69b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageItem: {
    width: Dimensions.get('window').width / 3 - 15, // Adjust width to fit three images per row
    height: Dimensions.get('window').width / 3 - 15, // Maintain square aspect ratio
    marginVertical: 5, // Vertical margin between items
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8, //rounded corners 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalImage: {
    width: '100%',
    height: '80%',
  },
});

