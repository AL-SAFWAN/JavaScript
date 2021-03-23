/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  const buttonPressed = () => {

    if (text.length <4)  {
      Alert.alert('OOPS!', 'Todo must be greater than 3 character',[{
        text:'Ok', onPress:()=> setText('')
      }])
      return
    } ;
    
    setList(list => [{text, key: list.length}, ...list]);

    setText('');
  };

  const deleteItem = i => {
    setList(list => list.filter(({key}) => key !== i));
  };

  const renderItem = ({item: {text, key}}) => (
    <View style={styles.item}>
      <>
        <TouchableOpacity key={'touch' + key} onPress={() => deleteItem(key)}>
          <Text style={styles.text} key={key}>
            {' '}
            {text}
          </Text>
        </TouchableOpacity>
      </>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss()
    }}>
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          width: 405,
          backgroundColor: 'lightblue',
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 28,
            alignSelf: 'center',
            padding: 5,
            fontFamily: 'monospace',
          }}>
          {' '}
          My Todo List{' '}
        </Text>
      </View>
      <View key="input/btn">
        <View style={styles.header} key="input">
          <TextInput
            multiline
            style={{height: 40, width: 300}}
            placeholder="Type here to add "
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
        </View>
        <View style={{ width: 300, alignSelf: 'center'}}>
          <Button title="Add" onPress={buttonPressed} />
        </View>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </SafeAreaView>
    </View></TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    // backgroundColor:'hotpink',
    borderColor: 'black',
    margin: 20,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },
  body: {
    // backgroundColor:'pink',
    margin: 30,
    padding: 20,
  },
  text: {
    borderColor: 'black',
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderStyle: 'dashed',
    padding: 5,
  },
  item: {
    minWidth: 300,
    minHeight: 40,
    padding: 5,
    marginTop: 10,
  },
});

export default App;
