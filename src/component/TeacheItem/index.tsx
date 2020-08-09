
import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import AsyncStorage  from '@react-native-community/async-storage';

import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles'
import api from '../../services/api';

export interface Teacher {

  name: string;
  avatar: string;
  subject: string;
  whatsapp:string;
  bio: string;
  cost: number;
  id: number;
  user_id: number;

}

interface TeacherItemProps {

  teacher: Teacher;
  tanned: boolean;

}
// 'https://github.com/diego3g.png'

const TeacherItem: React.FunctionComponent<TeacherItemProps>=({teacher,tanned})=>  {

  const [isTanned, setTanned] = useState(tanned); 
  function hanleLinkToWhatsapp(){
    api.post('connections',{
      user_id: teacher.id
    })
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)

  }

  async function hanleToggleFavorites() {

    const favorites =  await AsyncStorage.getItem('favorites')
       let favoriteArray = [];
       if(favorites){
         favoriteArray = JSON.parse(favorites)
       }


    if(isTanned){
      const favoriteIndex = favoriteArray.findIndex((TeacherItem:Teacher)=>{

        return TeacherItem.id === teacher.id
      });
      favoriteArray.splice(favoriteIndex,1);
      setTanned(false)
    }
    else{
       
       setTanned(true)
       favoriteArray.push(teacher);
       
    }
    await AsyncStorage.setItem('favorites',JSON.stringify(favoriteArray))
  }
  return (
    <View style={styles.container} >

      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri:teacher.avatar}}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>

        </View>
      </View>

      <Text style={styles.bio}>
      
        {teacher.bio}
      
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>

          <RectButton
           onPress={hanleToggleFavorites}
           style={[
             styles.favoriteButton,
             isTanned ? styles.tanned:{},]}>
          {
             isTanned
             ?  <Image source={unfavoriteIcon}></Image>
             :  <Image source={heartOutlineIcon}></Image>
          }
           
          </RectButton>

          <RectButton onPress={hanleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>

        </View>

      </View>

    </View>)
}

export default TeacherItem;