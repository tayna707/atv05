import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const db = DatabaseConnection.getConnection();

export default function Home() {

    const navigation = useNavigation();

    const [todos, setTodos] = useState([]);

    const Cadastro = () => {
        navigation.navigate('Cadastro');
    }

    const ExibeTodos = () => {
        navigation.navigate('ExibeTodos');
    }

    const Pesquisa = () => {
        navigation.navigate('Pesquisa')
    }

    const deleteDatabase = () => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
                [],
                (_, { rows }) => {
                    rows._array.forEach(table => {
                        tx.executeSql(
                            `DROP TABLE IF EXISTS ${table.name}`,
                            [],
                            () => {
                                console.log(' A Tabela foi excluída com sucesso!');
                                setTodos([]);
                            },
                            (_, error) => {
                                console.error('Erro ao excluir a tabela', error);
                                Alert.alert('Erro', 'Ocorreu um erro ao excluir a tabela');
                            })
                    })
                })
        })
    };
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tbl_clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, data_nasc DATE NOT NULL)",
                [],
                () => console.log('Tabela clientes criada com sucesso'),
                (_, error) => console.error(error)
            )

            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tbl_telefones (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT NOT NULL, tipo TEXT NOT NULL)",
                [],
                () => console.log('Tabela telefones criada com sucesso'),
                (_, error) => console.error(error)
            )
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS telefones_has_clientes (telefone_id INTEGER NOT NULL, cliente_id INTEGER NOT NULL, CONSTRAINT fk_telefones_has_clientes FOREIGN KEY (telefone_id) REFERENCES tbl_telefones(id), CONSTRAINT fk_telefone_has_clientes FOREIGN KEY (cliente_id) REFERENCES tbl_clientes(id))",
                [],
                () => console.log('Tabela relacionamento criada com sucesso'),
                (_, error) => console.error(error)
            )
        })
    }, [todos]);

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/perfil-de-usuario2.png')}
                />
            </View>
            <SafeAreaView style={styles.androidSafeArea}>
                <TouchableOpacity onPress={Cadastro}>
                    <Text style={styles.button}>Cadastro</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ExibeTodos}>
                    <Text style={styles.button}>Lista de clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Pesquisa}>
                    <Text style={styles.button}>Pesquisar cliente</Text>
                </TouchableOpacity>
                <View>
                    <Button color='black' title="Deletar banco de dados" onPress={() => {
                        Alert.alert(
                            "Atenção!",
                            'Deseja realmente excluir o banco de dados?',
                            [
                                {
                                    text: 'SIM',
                                    onPress: () => deleteDatabase()
                                },
                                {
                                    text: 'NÃO',
                                    onPress: () => { return }
                                }
                            ],
                        )
                    }} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}
const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 15,
        gap: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        widht: 300,
        height: 300,
        backgroundColor: '#f2f2f2'
    },
    button: {
        backgroundColor: 'purple',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
    }
})
