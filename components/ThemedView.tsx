import {View, useColorScheme, StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";

const ThemedView = ({ style, safe = false, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    if(!safe) {
        return (
            <View
                style={[{backgroundColor: theme.background}, style]} {...props}
            />
        )
    }

    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                {
                    backgroundColor: theme.background,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    //paddingLeft: insets.left,
                    //paddingRight: insets.right,
                },
                style,
            ]} {...props}
        />
    );
};

export default ThemedView;