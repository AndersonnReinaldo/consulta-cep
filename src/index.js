import React,{ useState, useRef} from 'react'
import { StyleSheet, Text, View,TextInput, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';
import api from './services/api';

const index = () => {
    
    const [cep, setCep] = useState('');
    const [dados, setDados] = useState(null);
    const inputRef = useRef(null);

        async function buscar(){

            if(cep == ''){
                alert('Digite um CEP valido!');
                inputRef.current.focus();
                setCep('');
                return;
            }
            try {
                const response = await api.get(`/${cep}/json`);
                setDados(response.data)
                Keyboard.dismiss();
            } catch (error) {
                console.log('ERROR: ' + error)
            }
                
        }

        function limpar(){
            setCep('');
            setDados(null);
            inputRef.current.focus();
        }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{alignItems:'center'}}>

                <Text style={styles.text}>Digite o CEP desejado</Text>

                <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="EX: 85000054"
                value={cep}
                onChangeText={(value) => setCep(value)}  
                keyboardType='numeric'
                keyboardAppearance='dark'       
                />
            </View>

            <View  style={styles.areaBtn}>
               
                <TouchableOpacity 
                    style={styles.botao}
                    onPress={ buscar }
                    >
                    <Text style={styles.textBotao}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botao, {backgroundColor:'#003c7d'}]} 
                    onPress={ limpar }
                    >
                    <Text style={styles.textBotao}>Limpar</Text>
                </TouchableOpacity>
            </View>

        {dados && (
        <View style={styles.resultContainer}>
            <Text style={styles.itemText}>CEP: {dados.cep} </Text>
            <Text style={styles.itemText}>Logradouro: {dados.logradouro} </Text>
            <Text style={styles.itemText}>Bairro: {dados.bairro} </Text>
            <Text style={styles.itemText}>Cidade: {dados.localidade} </Text>
            <Text style={styles.itemText}>Estado: {dados.uf} </Text>
        </View>

        )}
          
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({

    container:{
        flex:1
    },
    text:{
        marginTop:25,
        marginBottom:15,
        fontSize:25,
        fontWeight:'bold'
    },
    input:{
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:'#DDD',
        borderRadius:5,
        width:'90%',
        padding:10,
        fontSize:18
    },
    areaBtn:{
        alignItems:'center',
        flexDirection:'row',
        marginTop:15,
        justifyContent: 'space-around'
    },
    botao:{
        height:50,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:5,
        backgroundColor: '#FF0000'
    },
    textBotao:{
        color:'#FFF',
        fontSize:22
    },
    resultContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    itemText:{
        fontSize:25
    }




})
