import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function App() {
    const db = new DatabaseConnection.getConnection;
    const [input, setInput] = useState('');
    const [resultado, setResultado] = useState([]);
    
    const pesquisaCliente = () => {
        if (input.trim() ==='' || input === null) {
            Alert.alert('Erro', 'Digite um nome válido para pesquisar o cliente');
            return;
        }

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tbl_clientes WHERE nome LIKE ? OR nome LIKE ?',
                [`%${input}%`, `%${input}%`],
                (_, { rows }) => {
                    setResultado(rows._array);
                  }
                );
              });
            };
          
            return (
              <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder="Insira o nome do cliente ou ID"
                  value={input}
                  onChangeText={setInput}
                />
                <Button title="Pesquisar" onPress={pesquisaCliente} />
                {resultado.map(item => (
                  <View key={item.id} style={styles.clienteItem}>
                    <Text>ID: {item.id}</Text>
                    <Text>Nome: {item.nome}</Text>
                    <Text>Data de nascimento: {item.data_nasc}</Text>
                  </View>
                ))}
              </View>
            );
          }
          
          const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#FF69B4',
              padding: 20,
              alignItems: 'center',
            },
            input: {
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              padding: 10,
              marginBottom: 20,
              width: '100%',
            },
            clienteItem: {
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              padding: 10,
              marginBottom: 15,
              width: '100%',
            },
          });