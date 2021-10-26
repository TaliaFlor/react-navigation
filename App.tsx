import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {QueryClient, QueryClientProvider, useMutation, useQuery} from "react-query";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        flexDirection: "row"
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: "15em",
        marginRight: "0.5em"
    },
    pokemon: {
        flexDirection: "column"
    }
});

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <PokeApi/>
        </QueryClientProvider>
    );
}

const PokeApi = () => {
    const [pokemeon, onChangePokemeon] = useState("");
    //
    // const {isLoading, isError, data} = useQuery("pokemeon", {});
    // const mutation = useMutation(`https://pokeapi.co/api/v2/pokemon/${pokemeon}`)
    //
    // if (isLoading) return <Text>Procurando Pokémon...</Text>;
    //
    // if (isError) return <Text>Puxa, parece que esse Pokémon não existe!</Text>;


    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput style={styles.input} value={pokemeon} onChangeText={onChangePokemeon} placeholder="Digite o nome do Pokémon"/>
                <Button title="Caçar" onPress={() => console.log(pokemeon)}/>
            </View>
            {/*<View style={styles.pokemon}>*/}
            {/*    <Text>ID: {data.id}</Text>*/}
            {/*    <Text>Nome: {data.name}</Text>*/}
            {/*    <Text>Espécie: {data.species.name}</Text>*/}
            {/*    <Text>Ataques: {data.moves.map(item => item.move.name).join(', ')}</Text>*/}
            {/*    <Text>Habilidades: {data.abilities.map(item => item.ability.name).join(', ')}</Text>*/}
            {/*</View>*/}
        </View>
    );
};
