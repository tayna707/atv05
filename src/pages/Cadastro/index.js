import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


export default function NovoCadastro() {
    const [nome, setNome] = useState('');
    const [data_nasc, setData_nasc] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('');


    const adicionaCliente = () => {
        if (nome.trim() === '' || nome === null) {
            Alert.alert('Erro', 'Insira um texto válido para o nome do cliente');
        }
        if (telefone.trim() === '' || telefone === null) {
            Alert.alert('Erro', 'Insira um texto válido para o telefone');
        }
        if (data_nasc.trim() === '' || data_nasc === null) {
            Alert.alert('Erro', 'Insira uma data válida')
        }

        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO tbl_clientes (nome, data_nasc) VALUES (?, ?)',
                    [nome, data_nasc],
                    (_, { rowsAffected }) => {
                        console.log(rowsAffected);
                        setNome('');
                        setData_nasc('');
                    },
                    (_, error) => {
                        console.error('Erro ao adicionar o cliente', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao adicionar o cliente');
                    }
                );
            }
        );
        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO tbl_telefones (numero,tipo) VALUES (?, ?)',
                    [numero, tipo],
                    (_, { rowsAffected }) => {
                        console.log(rowsAffected);
                        setTelefone('');
                        setTipo('');
                    },
                    (_, error) => {
                        console.error('Erro ao adicionar o telefone', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao adicionar o telefone');
                    }
                );
            }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastre um novo cliente</Text>

            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite um novo nome"
            />

            <TextInput
                style={styles.input}
                value={data_nasc}
                onChangeText={setData_nasc}
                placeholder='Digite a data de nascimento'></TextInput>

            <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                placeholder='Digite um telefone'></TextInput>

                
            <TextInput
                style={styles.input}
                value={tipo}
                onChangeText={setTipo}
                placeholder='Digite o tipo de telefone'></TextInput>

            <Button title="Adicionar" onPress={adicionaCliente} />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8BFD8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontSize: 15,
        marginBottom: 15,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
});
