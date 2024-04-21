import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const db = DatabaseConnection.getConnection();

export default function PesquisarCliente() {
    const navigation = useNavigation();
    const [input, setInput] = useState('');
    const [resultados, setResultados] = useState([]);

    const pesquisaCliente = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT cli.nome, cli.data_nasc, tel.numero FROM tbl_clientes cli LEFT JOIN telefones_has_clientes tc ON cli.id = tc.cliente_id LEFT JOIN tbl_telefones tel ON tc.telefone_id = tel.id WHERE cli.nome LIKE ? OR tel.numero LIKE ?',
                [`%${input}%`, `%${input}%`],
                (_, { rows }) => {
                    setResultados(rows._array);
                }
            );
        });
    };

    const pesquisaItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditCadastro', { id: item.id })}>
            <Text>{item.nome}</Text>
        </TouchableOpacity>
    );

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.androidSafeArea}>
            <Text>Pesquisar Cliente</Text>
            <TextInput style={styles.input}
                placeholder="Digite o nome ou número de telefone do cliente"
                value={input}
                onChangeText={text => setInput(text)}
            />
            <TouchableOpacity onPress={pesquisaCliente}>
                <Text style={styles.button}>Pesquisar</Text>
            </TouchableOpacity>
            <FlatList
                data={resultados}
                pesquisaItem={pesquisaItem}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            />
            <TouchableOpacity onPress={handleGoBack}>
            <FontAwesome6 name='backward' color={'black'} size={24} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10,
    backgroundColor: 'pink',
    padding: 15,
    gap: 10,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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