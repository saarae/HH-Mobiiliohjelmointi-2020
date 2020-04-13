import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage } from 'react-native';

export default function App() {
  const [comment, setComment] = useState('Guess a number between 1-100');
  const [guess, setGuess] = useState(0);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [highscoretext, setHighscoretext] = useState('');
  const [retrieve, setRetrieve] = useState(true);

  useEffect(() => {
    if (retrieve) {
      getRecord();
      setRetrieve(false);
    }
  }, [retrieve]);

  const guessMade = () => {
    if (count == 0) {
      randomizeNumber();
    }
    setCount(count + 1);
    if (guess == number) {
      if (highscore == 0) {
        console.log('New highscore!');
        setRecord(count);
        resetCounter();
      } else if (count < highscore) {
        console.log('New highscore!')
        setRecord(count);
        resetCounter();
      }
      Alert.alert(`You guessed the number in ${count} guesses`);
      setComment('Guess a number between 1-100');
    } else if (guess < number) {
      setComment(`Your guess ${guess} is too low`);
    } else {
      setComment(`Your guess ${guess} is too high`);
    }
  }

  const randomizeNumber = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setNumber(random);
  }

  const resetCounter = () => {
    setCount(0);
  }

  const setRecord = (count) => {
    setHighscore(count);
    updateStorage(count);
  }

  const updateStorage = async(count) => {
    let value = JSON.stringify(count);
    setRetrieve(true);
    console.log(`Storage to be updated: ${value}`)
    try {
      await AsyncStorage.setItem('best', value);
      console.log('Storage updated')
    } catch (e) {
      console.log(e)
    }
  }

  const getRecord = async() => {
    try  {
      let value = await AsyncStorage.getItem('best');
      console.log(`Got value: ${value}`);
      setHighscoretext(`Highscore: ${value}`);
      console.log(highscoretext);
    } catch (e) {
      console.log(e)
    }
  }

// AsyncStoragen resetointi testausta varten
//   const resetHighscore = async() => {
//     AsyncStorage.clear();
//     setRetrieve(true);
// }

  return (
    <View style={styles.container}>
      <View style={styles.comments}>
        <Text>{comment}</Text>
        {/* <Text>Number to be guessed: {number}</Text>
        <Text>Counter: {count}</Text>
        <Text>Highscore: {highscore}</Text> */}
      </View>
      <View style={styles.input}>
        <TextInput
          style={{width: 200, borderColor: 'gray', borderWidth: 1}}
          keyboardType={"number-pad"}
          onChangeText={text => setGuess(text)}
          value={Text}
        />
      </View>
      <View>
        <Button title="Make a guess" onPress={guessMade} />
      </View>
      <View style={styles.input}>
        <Text>{highscoretext}</Text>
      </View>
      {/* <View style={styles.input}>
      <Button title="Reset highscore" onPress={resetHighscore} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comments: {
  },
  input: {
    marginTop: 20,
    marginBottom: 20
  },
  button: {
  }
});
