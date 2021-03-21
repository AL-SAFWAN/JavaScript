/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, 
  Button, ScrollView,TouchableOpacity
} from 'react-native';



const App = () => {

  const [text, setText] = useState('');
  const [list,setList]= useState([])
  const buttonPressed=()=>{
    console.log(list)
    if(text=='') return
    // list.push({text, key: list.length})
    setList( list => [{text, key: list.length+text},...list])

    setText('')
    console.log(list)

  }

  const deleteItem=(i)=>{
    setList(list=> list.filter( ({key})=> key !==i  ))
  }
  return (

        <View
          style={styles.container}>
            <View>
            <View style={styles.header}> 
            <TextInput
            multiline
        style={{height: 40}}
        placeholder="Type here to add "
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
            </View><Button title='submit' onPress={buttonPressed}/>
            </View>
           <ScrollView  style={styles.body}>
             {list.map(
               ({text,key}) =>{
                 return(<>
                <TouchableOpacity key={'touch' +key} onPress={() =>deleteItem(key)}>
                 <Text style={styles.text} key ={key}> {text}</Text>
                 </TouchableOpacity>
                   </>
                 ) 
               }
             )}
              
  
           </ScrollView>

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
    // backgroundColor:'hotpink',
    borderColor:'black',
    margin:20,
    borderWidth:2,
    borderRadius:10,
    padding: 5
  },
  body:{
    // backgroundColor:'pink',
    margin: 30,
    padding:20
  },
  text:{
    borderColor:'black',
    marginBottom:20,
    borderWidth:2,
    borderRadius:10,
    padding: 5,
    backgroundColor:'lightblue',

  }


});

export default App;
