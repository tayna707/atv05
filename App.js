import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/pages/Home';
import Cadastro from './src/pages/Cadastro';
import ExibeTodos from './src/pages/ExibeTodos';
import Pesquisa from './src/pages/Pesquisa';
import EditCadastro from './src/pages/EditCadastro';


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            componente={Home}
          />
          <Stack.Screen
            name='Cadastro'
            componente={Cadastro}
          />
          <Stack.Screen
            name='ExibeTodos'
            componente={ExibeTodos}
          />
          <Stack.Screen
            name='Pesquisa'
            componente={Pesquisa}
          />
          <Stack.Screen
            name='EditarCadastro'
            componente={EditCadastro}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10
  },
  container: {
    width: '100%',
    backgroundColor: 'purple',
    padding: 15,
    gap: 10
  }
})


