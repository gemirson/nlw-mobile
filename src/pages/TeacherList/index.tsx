import React, { useState} from "react";
import { View, ScrollView, Text,TextInput } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import AsyncStorage  from '@react-native-community/async-storage';

import {Feather}  from '@expo/vector-icons'

import api from "../../services/api";

import PageHeader from "../../component/PageHeader";
import TeacherItem, { Teacher } from "../../component/TeacheItem";

import styles from "./styles";



function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false); 
  const [favorite,setFavorites]= useState<Number[]>([]);
  const [teachers,setTeachers]=useState([]);
  const [subject,setSubject]=useState('');
  const [week_day,setWeek_day]=useState('');
  const [time,setTime]=useState('');

  function loadfavorites(){
   AsyncStorage.getItem('favorites').then(response=>{

      if(response){
         const favoritedTeacher = JSON.parse(response)
         const favoritedTeachersIds = favoritedTeacher.map((teacher:Teacher)=>{
            return teacher.id;
         })
            setFavorites(favoritedTeachersIds)
      }
   })

}
  function handlerToggleFiltersVisible() {
   setIsFiltersVisible(!isFiltersVisible)
     
  }


  async function handlerFiltersSubmit(){

   loadfavorites()
  
   const response = await  api.get('classes',{
      params:{subject,
      week_day,
      time
    }
    })
    setIsFiltersVisible(false)
    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
           <BorderlessButton  onPress={handlerToggleFiltersVisible}>
             <Feather name="filter" size={20} color="#FFFF" />
           </BorderlessButton>
           )}>
           {isFiltersVisible && (
              <View style={styles.searchForm}>
                 <Text style={styles.label}>Matérias</Text>

                 <TextInput
                    style={styles.input}
                    value ={subject}
                    onChangeText={text=>setSubject(text)}
                    placeholder="Qual a matéria"
                    placeholderTextColor="#c1bccc"
                 />
                 <View style={styles.inputGroup}>
                    <View style={styles.inputBlock}>
                       <Text style={styles.label}>Dia da semana</Text>

                       <TextInput
                          style={styles.input}
                          value={week_day}
                          onChangeText={text=>setWeek_day(text)}
                          placeholder="Qual o dia"
                          placeholderTextColor="#c1bccc"
                       />
                    </View>

                    <View style={styles.inputBlock}>
                       <Text style={styles.label}>Horário</Text>

                       <TextInput
                          style={styles.input}
                          value={time}
                          onChangeText={text=>setTime(text)}
                          placeholder="Qual o horário"
                          placeholderTextColor="#c1bccc"
                       />
                    </View>
                 </View>
                 <RectButton
                    onPress={handlerFiltersSubmit}
                    style={styles.submitButton}
                 >

                    <Text style={styles.submitButtonText}>Filtrar</Text>
                 </RectButton>
              </View>
           )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24
        }}
      >
      {teachers.map((teacher:Teacher)=>{
         return  <TeacherItem  key={teacher.id} teacher = {teacher}  tanned={favorite.includes(teacher.id)} />;
         
      })}
        
       
      </ScrollView>
    </View>
  );
}

export default TeacherList;
