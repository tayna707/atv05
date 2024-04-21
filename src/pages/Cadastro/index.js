import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { DatabaseConnection } from '../../database/database'

const db = new DatabaseConnection.getConnection;

export default function NovoCadastro() {
    const [nome, setNome] = useState('');
    const [data_nasc, setData_nasc] = useState('');
    const [numero, setNumero] = useState('');
    const [tipo, setTipo] = useState('');


    const adicionaCliente = () => {
        if (nome.trim() === '' || nome === null) {
            Alert.alert('Erro', 'Insira um texto válido para o nome do cliente');
        }
        if (numero.trim() === '' || numero === null) {
            Alert.alert('Erro', 'Insira um texto válido para o telefone');
        }
        if (data_nasc.trim() === '' || data_nasc === null) {
            Alert.alert('Erro', 'Insira uma data válida')
        }

        if (tipo.trim() === '' || tipo === null) {
            Alert.alert('Erro', 'Insira um tipo válido, sendo fixo ou celular.')
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
                        setNumero('');
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
            <Text style={styles.title}>Cadastre um novo cliente:</Text>

            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o nome"
            />

            <TextInput
                style={styles.input}
                value={data_nasc}
                onChangeText={setData_nasc}
                placeholder='Digite a data de nascimento'></TextInput>

            <TextInput
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
                placeholder='Digite um telefone'></TextInput>


            <TextInput
                style={styles.input}
                value={tipo}
                onChangeText={setTipo}
                placeholder='Digite o tipo de telefone (ex: celular ou fixo)'></TextInput>

            <Button color='green' title="Adicionar" onPress={adicionaCliente} />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
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
        backgroundColor: 'pink',
    },
});
