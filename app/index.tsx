import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {Link} from "expo-router";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

const Home = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title} title={true}>The World!</ThemedText>
            <Spacer height="20" />
            <ThemedText>Reading List App</ThemedText>
            <Spacer height="10" />

            <Link href={"/login"}>
                <ThemedText>Login to an account</ThemedText>
            </Link>
            <Spacer height="10" />

            <Link href={"/register"}>
                <ThemedText>Register</ThemedText>
            </Link>
            <Spacer height="10" />

            <Link href={"/profile"}>
                <ThemedText>Profile</ThemedText>
            </Link>
        </ThemedView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});