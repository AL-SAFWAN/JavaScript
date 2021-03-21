/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';



const App = () => {


  return (

        <View
          style={styles.container}>
            <View style={styles.header}> 
               <Text >Hello World</Text>
            </View>
           <View style={styles.body}>
              <Text> This is text 1</Text>
              <Text> This is text 2</Text>
              <Text> This is text 3</Text>

           </View>

        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  header:{
    backgroundColor:'hotpink',
    padding:20
  },
  body:{
    backgroundColor:'lightblue',
    padding:20
  }


});

export default App;
