import {Pressable, StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";

const ThemedButton = ({style, ...props}) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
            {...props}
        />

    );
};

export default ThemedButton as Pressable;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
        textAlign: "center",
    },
    pressed: {
        opacity: 0.8,
    }
});