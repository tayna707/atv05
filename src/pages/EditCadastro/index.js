import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, useRoute } from '@react-navigation/native'

import ExibeTodos from '../ExibeTodos/index';


const db = new DatabaseConnection.getConnection;

export default function EditCadastro () {
    const route = useRoute();
    const navigation = useNavigation();

    const [id, setId] = useState(route.params?.id)
    const [nome, setNome] = useState(route.params?.nome)
    const [data_nasc, setData_nasc] = useState(route.params?.data_nasc)
    const [numero, setNumero] = useState(route.params?.numero)
    const [tipo, setTipo] = useState(route.params?.tipo)

    const salvarRegistro = () => {
        if (nome.trim() === '') {
            Alert.alert('Erro', 'O nome deve ser preenchido');
            return;
        }
        if (data_nasc.trim() === '') {
        Alert.alert('Erro', 'A data de nascimento deve ser preenchido');
    return;
        }
        if (telefone.trim() === '') {
        Alert.alert ('Erro', 'O telefone deve preenchido');
        return;

    }
    db.transaction(
        tx => {
          tx.executeSql(
            'UPDATE tbl_clientes SET nome=?, data_nasc=? WHERE id=?',
            [nome, data_nasc],
            (_, { rowsAffected }) => {
              console.log(rowsAffected);
              setNome('');
              setData_nasc('');
              Alert.alert('Info', 'Registro alterado com sucesso',
                [
                  {
                    onPress: () => {
                      navigation.navigate('ExibeTodos');
                    }
                  }]);
  
            },
            (_, error) => {
              console.error('Erro ao editar o registro:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao editar o registro.');
            }
          );
        }
      );
      db.transaction(
        tx => {
          tx.executeSql(
            'UPDATE tbl_telefones SET numero=?, tipo=? WHERE id=?',
            [numero, tipo],
            (_, { rowsAffected }) => {
              console.log(rowsAffected);
              setNumero('');
              setTipo('');
              Alert.alert('Info', 'Registro alterado com sucesso',
                [
                  {
                    onPress: () => {
                      navigation.navigate('ExibeTodos');
                    }
                  }]);
  
            },
            (_, error) => {
              console.error('Erro ao editar o registro:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao editar o registro.');
            }
        )})
      };
      
  
    return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.androidSafeArea}>
            <View style={styles.container}>
    
              <View style={styles.viewTitle}>
                <Text style={styles.title}>Editar registro</Text>
              </View>
    
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Informe o nome do cliente"
              />
              <TextInput 
              style={styles.input}
              value={data_nasc}
              onChangeText={setData_nasc}
              placeholder='Informe a data de nascimento'
              />
              <TouchableOpacity
                onPress={salvarRegistro}>
                <Text>Salvar</Text>
                <FontAwesome6 name='check' size={32} color="#FFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
            );
        }
    
  
    const styles = StyleSheet.create({
        androidSafeArea: {
          flex: 1,
          alignItems: 'center',
          paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
          marginTop: 10
        },
        container: {
          width: '90%',
          backgroundColor: 'purple',
          padding: 15,
          gap: 10,
          borderRadius: 10,
          elevation: 5
        }
        });