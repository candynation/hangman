import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated } from 'react-native';


interface IHangmanCardProps {
  id: number;
  word: string;
  handleNextWord():void;
  
}

  let unquieChar= new Set();
  const HangmanCard: React.FC<IHangmanCardProps> = (props) => {

    const { word, handleNextWord } = props;
    const createDash =() => {
      let initalWord:string[] = [] ;
    
      if( word.includes(' ')){
          const myArr = word.split(" ");
          initalWord=Array(myArr[0].length).fill('-')
          for (let x = 1; x < myArr.length; x++) 
          {
            initalWord = initalWord.concat('=', Array(myArr[x].length).fill('-')); 
            //console.log(myArr[x], myArr[x].length);
            //console.log(initalWord, initalWord.length);
          }}
          else
          {
            initalWord = Array(word.length).fill('-');}
            createUquieChar();
      return initalWord;
    }
    const createUquieChar =() => {
      unquieChar.clear();
      for (let i =0; i <word.length; i++)
        {
          if(word[i]!= ' ')
          {
          unquieChar.add(word[i]);
          }
        }
     
  }
    
  const [thisWord, setWord] = useState<any[]>(createDash); 
  const intitalLetterBoard = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const [letterboard, setLetterboard] = useState<string[]>(intitalLetterBoard); 
  const [usedLetter, setUsedLetter] = useState<string[]>([]);
  const [gameOver, setGameOverText] = useState<string>(' ');
  const [win, setWin] = useState<boolean> (false);
  const [lose, setLose] = useState <boolean> (false);
  const [wrongCounter, setWrongCounter] = useState<number>(0);


  const handleLetterPress =(index:number) =>{
      addUsedLetter(letterboard[index]);
      checkLetter(letterboard[index]);
      checkWinLose();
  }
 

  const addUsedLetter = (letter:string) => 
  {
    
    if (usedLetter.includes(letter) == false){
      //usedLetter.push(letter);
     //setUsedLetter(prevLetter => { prevLetter.push(letter); return prevLetter; });
      //console.log("used letter ",usedLetter);
      setUsedLetter((prevLetter)=>[...prevLetter,letter]);
     
      } 
      unquieChar.delete(letter);
      console.log(unquieChar);
  }

  useEffect(()=>{},[]);
  const checkLetter = (letter:string) => 
  {
      if (word.includes(letter))
      {
        for (let x =0; x < word.length; x++)
        {
          if (word[x] == letter)
          {
            //function (setWord(prevWord)) {
            //return function (prevWord.map((value,i)) {
            //return (i === x ? letter:value )}
            setWord((prevWord)=>prevWord.map((value,i) => i === x ? letter:value ));
          }
        }
      }
      else 
      {
       setWrongCounter(wrongCounter+1);
      }
  }

  //useEffect(()=>{},[thisWord]);
 // console.log("thisword after set ",thisWord.toString());

const checkWinLose = () => {
 // console.log ("word",word); 
  //console.log("thisword in win lose",thisWord.toString());
  //console.log("wrong counter",wrongCounter);
  if(wrongCounter ==6) 
  {
    setLose(true);
    setGameOverText('Game Over')
  }
  else if (unquieChar.size==0)
  {
    setWin(true);
    setGameOverText('Win')

  }

}

  const checkisUsed = (letter:string) => {
    //let isUsed= usedLetterA.includes(letter);  
    if (win == true || lose == true) 
    {
      return true;
    }
    else{
    let isUsed = usedLetter.includes(letter);
    //console.log("usedLetter letter",usedLetter);
   //console.log(letter,isUsed);
    return isUsed;
    }
  }
  

  const handleRestart = () => {
    setWord(createDash);
    setLetterboard(intitalLetterBoard);
    //usedLetterA = [];
    setUsedLetter([]);
    setGameOverText(' '); 
    setWrongCounter(0);
    setWin(false);
    setLose(false);

  }
  const handleShowAnswer = () => {
    
  
      setWord(word.split(''));

  }


  return (
    
    <View style={styles.backgroundContainer}>
     
      <View nativeID='game-board' style = {styles.gameContainer}> 
     
      <View style={styles.imageContainer}>
        <Image source = {require(`../assets/hangman${wrongCounter}.png`)} style={styles.image} />
        </View>
        
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=> handleNextWord()} style={styles.button}><Text style={styles.buttonText}>Next word</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=> handleRestart()} style={styles.button}><Text style={styles.buttonText}>Restart</Text></TouchableOpacity>
            <View style={lose? {display:'flex'}: {display:'none'}}>
            <TouchableOpacity onPress={()=> handleShowAnswer()} style={styles.button}><Text style={styles.buttonText}>Show Answer</Text></TouchableOpacity>
           
            </View>
            <View style={styles.gameOverContainer}><Text>{gameOver}</Text></View>
          </View>
          
          
     
      </View>
     
        <View style={styles.wordContainer}>
     
          <Text style ={styles.wordText}>{thisWord}</Text>
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
      marginTop: 25,
      width: '100%',
     
      alignItems: 'center',
       },

      gameContainer: {
       flex: 1.5,
       width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',

      },
      image: {
        flex:1,
        aspectRatio:0.45,
        borderColor:'black',
        borderWidth:4
      },
      imageContainer: {
      flex:1,
       },
       
       buttonContainer: {
         alignItems:'center'
       },
       gameOverContainer: {
        flex:1,
        justifyContent:'flex-end',
        
       }
      ,
      wordContainer: {
        width:340,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
       
        marginTop: 20,
    
      }
      ,
      wordText: {
        fontSize: 35
      }
       ,
       letterView: {
        flex: 1,
        width:340,
        marginTop: 20,
    
    
        
      },
      letterContainer: {
        flexDirection: 'row',
         flexWrap: 'wrap',
         justifyContent: 'center',
    
     
      } ,
      tile: {
        width:45,
        height:45,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

      }
      ,
      tileText: {
        fontSize: 15
      },
      button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius:40,
        borderColor: 'yellow',
        borderWidth: 3,
        resizeMode: 'contain'
        
      },
      buttonText: {
        fontSize: 18
      },
      disableTile:{
        width:45,
        height:45,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        backgroundColor:"grey"

      }
});
export default HangmanCard;