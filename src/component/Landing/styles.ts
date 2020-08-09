
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8257E5',
      justifyContent: 'center',
      padding:40
     
    },

    banner:{
        width:'100%',
        resizeMode:'contain'
       
    },
    title:{
        color:'#fff',
        fontFamily:'Poppins_400Regular',
        fontSize:20,
        lineHeight:30,
        marginTop:80,

    },
    titleBold:{
        fontFamily:'Poppins_600SemiBold',
    },
    buttonsContainer:{

      flexDirection:'row',
      marginTop:40,
      justifyContent:'space-between'
     
    },
    button:{
      height:150,
      width:'48%',
      backgroundColor:'#333',
      borderRadius:8,
      padding:24,
      justifyContent:'space-between',
      alignItems:'center'
    },
    buttonPrimary:{
      backgroundColor:'#9871f5'
    },
    buttonSecondary:{
      backgroundColor:'#04d361'
    },

    buttonText:{
      fontFamily:'Archivo_700Bold',
      color:'#FFF',
      fontSize:20
    },

    totalConnections:{
      marginTop:40,
      fontFamily: 'Poppins_400Regular',
      color: '#d4c2ff',
      lineHeight:20,
      maxWidth:140,
      fontSize:12,
    }

  });

export default styles;