import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/pages/Home'
import Cadastro from './src/pages/Cadastro';
import ExibeTodos from './src/pages/ExibeTodos';
import Pesquisa from './src/pages/Pesquisa';
import EditCadastro from './src/pages/EditCadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: 'Home',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Cadastro'
            component={Cadastro}
            options={{
              title: 'Cadastro',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='ExibeTodos'
            component={ExibeTodos}
          />
          <Stack.Screen
            name='Pesquisa'
            component={Pesquisa}
            options={{
              title: 'Pesquisa',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='EditCadastro'
            component={EditCadastro}
            options={{
              title: 'EditCadastro',
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}