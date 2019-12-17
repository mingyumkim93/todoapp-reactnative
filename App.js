import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const {height, width} = Dimensions.get("window");

export default function App() {
  const [newToDo, setNewToDo] = useState("");
  const [loadedToDos, setLoadedToDos] = useState(false);
  const [toDos, setToDos] = useState({});

  useEffect(()=>_loadToDos(), []);

  _controlNewToDo = text => {
    setNewToDo(text);
  }

  _loadToDos = () => {
    setLoadedToDos(true);
  }

  _addToDo = () => {
    if(newToDo !== ""){
      const ID = uuidv1();
      const newToDosObject = {
        ...toDos,
        [ID]:{
          id: ID,
          isCompleted: false,
          text: newToDo,
          createdAt: Date.now()
        }
      };
      setToDos({...newToDosObject})
      setNewToDo("");
    }

  }

  if(!loadedToDos){
    return <AppLoading/>
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <Text style={styles.title}>To Do By Migu</Text>
      <View style={styles.card}>
        <TextInput 
        style={styles.input} 
        placeholder="New To Do" 
        value={newToDo} 
        onChangeText={this._controlNewToDo} 
        placeholderTextColor={"#999"} 
        returnKyType={"Done"} 
        autoCorrect={false}
        onSubmitEditing={this._addToDo}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          <ToDo text={"Hello I'm a To Do"}/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title:{
    color:"white",
    fontSize:30,
    marginTop: 50,
    fontWeight: "400",
    marginBottom: 30
  },
  card:{
    backgroundColor:"white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios:{
        shadowColor: "rgba(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android:{
        elevation:5
      }
    })
  },
  input: {
      padding: 20,
      borderBottomColor: "#bbb",
      borderBottomWidth: 1,
      fontSize:25
  },
  toDos:{
    alignItems:"center"
  }
});
