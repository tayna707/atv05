import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Platform, View, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const db = DatabaseConnection.getConnection();

export default function EditCadastro() {
  const navigation = useNavigation();

  const [cliente, setCliente] = useState(null);
  const [nome, setNome] = useState('');
  const [data_nasc, setData_nasc] = useState('');
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = route.params;
  const route = useRoute();

  useEffect(() => {
    Cliente();
  }, []);

  const Cliente = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT cli.nome, cli.data_nasc, tel.numero, tel.tipo FROM tbl_clientes cli LEFT JOIN telefones_has_clientes tc ON cli.id = tc.cliente_id LEFT JOIN tbl_telefones tel ON tc.telefone_id = tel.id WHERE cli.id = ?',
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            setCliente(rows.item(0));
            setNome(rows.item(0).nome);
            setData_nasc(rows.item(0).data_nasc);
            setTelefone(rows.item(0).numero);
            setTipo(rows.item(0).tipo);
          } else {
            Alert.alert('Erro', 'Cliente não encontrado.');
            navigation.goBack();
          }
        },
        (_, error) => {
          Alert.alert('Erro', 'Erro ao buscar cliente.');
          console.error(error);
          navigation.goBack();
        }
      );
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const alteraCliente = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tbl_clientes SET nome = ?, data_nasc = ? WHERE id = ?',
        [nome, data_nasc, id],
        () => {
          Alert.alert('Info', 'Cliente atualizado com sucesso.');
          setModalVisible(false);
          loadCliente();
        },
        (_, error) => {
          Alert.alert('Erro', 'Erro ao atualizar cliente.');
          console.error(error);
        }
      );
      tx.executeSql(
        'UPDATE tbl_telefones SET numero = ?, tipo = ? where id = ?',
        [telefone, tipo, id]
      )
    });
  };

  const deletaCliente = () => {
    Alert.alert(
      'Atenção',
      'Tem certeza de que deseja excluir este cliente?',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            db.transaction(tx => {
              tx.executeSql(
                'DELETE FROM telefones_has_clientes WHERE cliente_id = ?',
                [id],
                (_, { rowsAffected }) => {
                  console.log(`${rowsAffected} registro na tabela excluído com sucesso.`);
                  tx.executeSql(
                    'DELETE FROM tbl_telefones WHERE id = ?',
                    [id],
                    (_, { rowsAffected }) => {
                      console.log(`${rowsAffected} número de telefone excluído com sucesso.`);
                      tx.executeSql(
                        'DELETE FROM tbl_clientes WHERE id = ?',
                        [id],
                        (_, { rowsAffected }) => {
                          Alert.alert('Info', `${rowsAffected} cliente excluído com sucesso.`);
                          navigation.goBack();
                        },
                        (_, error) => {
                          Alert.alert('Erro', 'Erro ao excluir cliente.');
                          console.error(error);
                        }
                      );
                    },
                    (_, error) => {
                      console.error('Erro ao excluir o número', error);
                    }
                  );
                },
                (_, error) => {
                  console.error('Erro ao excluir o registro na tabela', error);
                }
              );
            });
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View>
        <TouchableOpacity onPress={deletaCliente}>
          <Text>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>Voltar</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <View>
            <Text>Editar Cliente</Text>
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={text => setNome(text)}
            />
            <TextInput
              placeholder="Data de Nascimento"
              value={data_nasc}
              onChangeText={text => setData_nasc(text)}
            />
            <TextInput
              placeholder="Telefone"
              value={numero}
              onChangeText={text => setNumero(text)}
            />
            <TextInput
              placeholder="Tipo"
              value={tipo}
              onChangeText={text => setTipo(text)}
            />
            <TouchableOpacity onPress={alteraCliente}>
              <Text>Salvar Alteração</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  }
});
