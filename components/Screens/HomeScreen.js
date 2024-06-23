import React from "react";
import { StyleSheet, View, Text} from 'react-native';

import Button from '../Button.js';

/*HomeScreen Page, shows buttons to navigate to different pages*/

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
        <Text style = {styles.title}>Crochet</Text>
        <View style={styles.footerContainer}>
        {/*Buttons to navigae to new pages- interacts with
        navigation system's component names */}
          <Button label="Patterns"/>
          <Button label="Gallery" onPress={() => navigation.navigate("Gallery")}/>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7db69b',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 60,
      fontWeight: 'bold',
    },
    footerContainer: {
      flex: 1/3,
      alignItems: 'center',
    },
  });