import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const db = new DatabaseConnection.getConnection;

export default function App() {

    const navigation = useNavigation();

    useEffect(() => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tbl_clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, data_nasc DATE NOT NULL)",
            [],
            () => console.log('Tabela clientes criada com sucesso'),
            (_, error) => console.error(error)
        )
    }, []);

    useEffect (() => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tbl_telefones (id INTEGER PRIMARY KEY ATOINCREMENT, numero TEXT NOT NULL, tipo TEXT NOT NULL)",
            [],
            () => console.log('Tabela telefones criada com sucesso'),
            (_, error) => console.error(error)
        )
    }, []);

    useEffect(() => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS telefones_has_clientes (telefone_id INTEGER NOT NULL, cliente_id INTEGER NOT NULL, CONSTRAINT fk_telefone_has_clientes FOREIGN KEY (telefone_id) REFERENCES tbl_telefones(id), CONSTRAINT fk_telefone_has_clientes FOREIGN KEY (cliente_id) REFERENCES tbl_clientes(id)",
            [],
            () => console.log('Tabela relacinamento criada com sucesso'),
            (_, error) => console.error(error)
        )
    }, []);

return (
    <SafeAreaProvider>
        <SafeAreaView style={StyleSheet.androidSafeArea}>
            <View>
                <Image
                source = {require('../../../assets/logo.png')}
                style = {{ widht: 300, height: 300 }}
                />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
    
)
}
const styles = StyleSheet.create ({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 15,
        gap: 10
    }
})
