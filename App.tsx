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
        flexDirection: "column",
        marginTop: "1em"
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
    const [pokemon, onChangePokemeon] = useState("pikachu");

    const {isLoading, isError, data} = useQuery("pokemon",
        () => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(res => res.json()));

    const mutation = useMutation(() => queryClient.invalidateQueries('pokemon'));


    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput style={styles.input} value={pokemon} onChangeText={onChangePokemeon}
                           placeholder="Digite o nome do Pokémon"/>
                <Button title="Caçar" onPress={() => mutation.mutate()}/>
            </View>
            <View style={styles.pokemon}>
                {isLoading && <Text>Procurando Pokémon...</Text>}
                {isError && <Text>Puxa, parece que esse Pokémon não existe!</Text>}
                {data && <PokemonView {...mapToPokemon(data)}/>}
            </View>
        </View>
    );
};


interface Pokemon {
    id: number
    name: string
    species: string
    moves: string[]
    abilities: string[]
}

const mapToPokemon = (data): Pokemon => {
    return {
        id: data.id,
        name: data.name,
        species: data.species.name,
        moves: data.moves.map(item => item.move.name),
        abilities: data.abilities.map(item => item.ability.name).slice(0, 5)
    }
};

const PokemonView = (pokemon: Pokemon) => {
    const abilities = pokemon.abilities.length > 5 ? pokemon.abilities.slice(0, 5).join(', ').concat("...") : pokemon.abilities.join(', ');
    const moves = pokemon.moves.length > 5 ? pokemon.moves.slice(0, 5).join(', ').concat("...") : pokemon.moves.join(', ');

    return (
        <View>
            <Text>ID: {pokemon.id}</Text>
            <Text>Nome: {pokemon.name}</Text>
            <Text>Espécie: {pokemon.species}</Text>
            <Text>Habilidades: {abilities}</Text>
            <Text>Ataques: {moves}</Text>
        </View>
    );
}
