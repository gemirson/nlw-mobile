import  React, { useState, useEffect } from  'react';
import { View,ScrollView } from 'react-native';

import PageHeader from '../../component/PageHeader';
import TeacheItem, { Teacher } from '../../component/TeacheItem';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';
import TeacherItem from '../../component/TeacheItem';
import { useFocusEffect } from '@react-navigation/core';


function Favorite() {

  const [favorite,setFavorites]= useState([]);
  function loadfavorites() {
    AsyncStorage.getItem('favorites').then(response => {

      if (response) {
        const favoritedTeacher = JSON.parse(response)
        setFavorites(favoritedTeacher)
      }


    })

  }

  useFocusEffect(()=>{
    loadfavorites()
  })

    return(
        <View  style={styles.container}>
        <PageHeader title="Meus proffys favoritos"/>
        <ScrollView
         style={styles.teacherList}
         contentContainerStyle={{
           paddingHorizontal: 16,
           paddingBottom: 24
         }}
       >
       {favorite.map((teacher:Teacher)=>{
         return  <TeacherItem  key={teacher.id} teacher = {teacher}  tanned={true} />;
         
      })}
        
       </ScrollView>
     </View>
    )
}

export default Favorite;