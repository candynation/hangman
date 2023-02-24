import React,{useState, useEffect }  from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import HangmanCard from './components/HangmanCard';
import { Hangman, HangmanData } from './HangmanData';

let nextItem:Hangman =HangmanData[0] as Hangman;

export default function App() {
  const [word, setWord] = useState<string>(nextItem.word);
  const [id, setId] = useState<number>(nextItem.id);
  const [usedWord, setUsedWord] = useState<number[]>();



  const handleNewWord=()=>{
 
    nextItem =HangmanData[id+1] as Hangman;
    setWord(nextItem.word);
    setId(nextItem.id);
  }



 


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hangman</Text>
      <HangmanCard word={word} id={id} key={id} handleNextWord={handleNewWord}/> 
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 40,
  } ,
  buttonView: {
   
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius:40,
    borderColor: 'yellow',
    borderWidth: 3,
  },
  buttonText: {
    fontSize: 10
  }
});
