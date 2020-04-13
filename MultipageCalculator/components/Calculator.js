import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function Calculator({ navigation }) {

    const[resultText, setResultText] = useState('');
    const[first, setFirst] = useState(0);
    const[second, setSecond] = useState(0);
    const[text, setText] = useState('');
    const[data, setData] = useState([]);
  
    const plusPressed = () => {
      const firstInt = parseInt(first);
      const secondInt = parseInt(second);
      const result = firstInt + secondInt;
      setResultText(`Result: ${result}`);
      setText(`${firstInt} + ${secondInt} = ${result}`);
      setData([...data, { key: text }]);
    }
  
    const minusPressed = () => {
      const firstInt = parseInt(first);
      const secondInt = parseInt(second);
      const result = firstInt - secondInt;
      setResultText(`Result: ${result}`);
      setText(`${firstInt} - ${secondInt} = ${result}`);
      setData([...data, { key: text }]);
    }

    return (
        <View style={styles.container}>
          <Text>{resultText}</Text>
          <TextInput
            style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            keyboardType={"number-pad"}
            onChangeText={text => setFirst(text)}
            value={Text}
          />
          <TextInput
            style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            keyboardType={"number-pad"}
            onChangeText={text => setSecond(text)}
            value={Text}
          />
          <View style={styles.buttons}>
            <Button onPress={plusPressed} title="+" />
            <Button onPress={minusPressed} title="-" />
            <Button
                title="History"
                onPress={() => navigation.navigate('History', {data: data})}
                style={styles.button}
              />
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttons: {
      flexDirection: 'row',
      margin: 20,
      width: 200,
      justifyContent: 'space-around'
    },
    list: {
      width: 200,
      height: 300
    },
    button: {
      width: '100%'
    }
  });