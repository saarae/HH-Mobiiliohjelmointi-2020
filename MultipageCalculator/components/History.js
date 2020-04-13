import React from'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function History({ route, navigation }) {
    const { data } = route.params;

    return(
        <View style={styles.container}>
            <Text>History</Text>
            <FlatList
                data={data}
                renderItem={({item}) => 
                  <Text>{item.key}</Text>}
              />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });