import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, StackActions, useRoute, useFocusEffect } from '@react-navigation/native'

const db = new DatabaseConnection.getConnection;
const windowWidht = Dimensions.get('window').width;

export default function Exibetodos() {
    const route = useRoute();

    const [todos, setTodos] = useState([]);
    const [textPesquisa, setTextPesquisa] = useState(null);
    const [refresh, setRefresh] = useState(route.params?.refresh ? route.params.setRefresh : false);

    const navigation = useNavigation();

    const novoCadastro = () => {
        navigation.navigate('Cadastro');
    }

    useFocusEffect(
        useCallback(() => {
            if (todos.length !== 0) {
                pesquisaRegistros();
            }
        }, [refresh])
    )

    const pesquisaRegistros = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM tbl_clientes',
                    [], (_, { rows }) =>
                    setTodos(rows._array),
                );
            });
        } catch (error) {
            console.error('Erro ao buscar todos:', error);
        }
    };


    return (

        <SafeAreaView style={styles.androidSafeArea}>
            <View>
                <Text>Clientes cadastrados</Text>
            </View>

            <ScrollView>
                {todos.map(item => (
                    <View key={item.id}>
                        <View>
                            <FontAwesome6 name='address-card' color={'black'} size={50} />
                        </View>
                        <View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
                                <Text>{clientes.id}</Text>
                            </View>

                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Data de nascimento: </Text>
                                <Text>{clientes.nome}</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Atenção!",
                                            'Deseja excluir o registro selecionado?',
                                            [
                                                {
                                                    text: 'OK',
                                                    onPress: () => exclui(cliente.id)
                                                },
                                                {
                                                    text: 'Cancelar',
                                                    onPress: () => { return },
                                                    style: 'cancel',
                                                }
                                            ],
                                        )
                                    }}>

                                    <FontAwesome6 name='trash-can' color={'red'} size={25} />
                                </TouchableOpacity>

                                <TouchableOpacity

                                    onPress={() => { handleButtonPress({ id: id.id, nome: nome.nome }) }}
                                >
                                    <FontAwesome6 name='pen-to-square' color={'green'} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}

            </ScrollView>

            <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20, position: 'relative', elevation: 5 }}>

                <TouchableOpacity
                    onPress={novoCadastro}>
                    <FontAwesome6 name='user-plus' color={'black'} size={24} />
                </TouchableOpacity>

            </View>

        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        marginTop: 10,
        backgroundColor: 'pink'
    },
    container: {
        width: '90%',
        backgroundColor: 'purple',
        padding: 15,
        gap: 10,
        borderRadius: 10,
        elevation: 5,
        marginTop: 5
    }
});
