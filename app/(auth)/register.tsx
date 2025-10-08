import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback} from "react-native";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import {Link} from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import {useState} from "react";
import {useUser} from "../../hooks/useUser";
import {Colors} from "../../constants/Colors";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { register } = useUser();

    const handleSubmit = async () => {
        setError(null);

        try {
            await register(email, password);
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <Spacer />
                <ThemedText title style={styles.title}>
                    Register for an account
                </ThemedText>

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                />

                <ThemedButton onPress={handleSubmit}>
                    <Text style={{ color: '#f2f2f2' }}>Register</Text>
                </ThemedButton>

                <Spacer />
                {error && <ThemedText style={styles.error}>{error}</ThemedText>}

                <Spacer height="100" />
                <Link href={"/login"}>
                    <ThemedText style={{textAlign: "center"}}>
                        Do you have an account? Login
                    </ThemedText>
                </Link>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 30,
    },
    error: {
        color: Colors.warning,
        padding: 10,
        backgroundColor: "#f5c1c8",
        borderColor: Colors.warning,
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 10,
    }
});