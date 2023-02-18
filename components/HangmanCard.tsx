import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Pressable,Button, TextInput } from 'react-native';


interface IHangmanCardProps {
  id: number;
  word: string;
}



  const HangmanCard: React.FC<IHangmanCardProps> = (props) => {
  const { word } = props;
  const initalWord = Array(word.length).fill('_ ');
  const [thisWord, setWord] = useState<any[]>(initalWord); 
  const intitalLetterBoard = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  const [letterboard, setLetterboard] = useState<string[]>(intitalLetterBoard); 
  const [usedLetter, setUsedLetter] = useState<string[]>([]);
 
    const handleLetterPress =(index:number) =>{
      addUsedLetter(letterboard[index]);
     

      checkLetter(letterboard[index]);
  }
 
  const addUsedLetter = (letter:string) => 
  {
    if (usedLetter.includes(letter) == false){
      //usedLetter.push(letter);
     //setUsedLetter(prevLetter => { prevLetter.push(letter); return prevLetter; });
      console.log("used letter ",usedLetter);
      setUsedLetter((prevLetter)=>[...prevLetter,letter]);
   
      }
    
  }
 
  useEffect(()=>{},[]);

  console.log("used letter ",usedLetter);

  const checkLetter = (letter:string) => 
  {
    
      if (word.includes(letter))
      {
        
       for (let x =0; x < word.length; x++)
       {
        if (word[x] == letter)
        {
          setWord((prevWord)=>prevWord.map((value,i) => i === x ? letter:value ));
        }
       }

      }
   
  }

  const checkisUsed= (letter:string) => {

    //let isUsed= usedLetterA.includes(letter);   
    let isUsed = usedLetter.includes(letter);
   console.log(letter,isUsed);
    return isUsed;
  }
  

  const restart = () => {
    setWord(initalWord);
    setLetterboard(intitalLetterBoard);
    //usedLetterA = [];
    setUsedLetter([]);

  }


  return (
    
    <View style={styles.backgroundContainer}>
      <View>
      <TouchableOpacity onPress={()=> restart()} style={styles.button}><Text>Restart</Text></TouchableOpacity>
      </View>
       <Text style = {styles.cardText}>{word}</Text>
       <View style={styles.boardView}>
        <View style={styles.boardContainer}>
          <Text>{thisWord}</Text>
        </View>
      </View>
      <View  style={styles.letterView}>
      <View  style={styles.letterContainer}>
      {letterboard.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={(checkisUsed(value))?styles.disableTile:styles.tile}
              onPress={() => {handleLetterPress(index);}}
              disabled={checkisUsed(value)}>
              
              <Text style={styles.tileText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View></View>

    </View>
  
  );
};

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: 'light blue',
      alignItems: 'center',
      justifyContent: 'center',
       },

       cardText: {
         fontFamily: 'comicsans',
         fontSize: 40,
       },

       boardView: {
         flex: 1,
         alignItems: 'center',
         padding: 30,
         backgroundColor: 'red',
       
       },
       boardContainer: {
        width: 300,
         flexDirection: 'row',
         flexWrap: 'wrap',
         justifyContent: 'center',
         alignItems: 'center',
       },
       letterView: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
      },
      letterContainer: {
        width: 300,
        flexDirection: 'row',
         flexWrap: 'wrap'
      } ,
      tile: {
        width:30,
        height:30,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

      },
      tileText: {
        fontSize: 10
      }
      ,
       usedLetterView: {
        flex: 3,
        justifyContent: 'flex-start',
        padding: 30,
        backgroundColor:'brown'
      } 
      ,
      usedText: {
        fontSize:10
        
      },
      button: {
        backgroundColor: '#DDDDDD',
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius:60,
        borderColor: 'yellow',
        borderWidth: 3,
      },
      disableTile:{
        width:30,
        height:30,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        backgroundColor:"grey"

      }
     
    
});
export default HangmanCard;