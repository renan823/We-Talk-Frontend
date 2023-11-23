import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

const Provider = ({ children }) => {

    const [fonts] = useFonts({
        'Ubuntu': require('../../assets/fonts/Ubuntu/Ubuntu-Bold.ttf')
    })

    if (!fonts) {
        return null;
    }

    return (
        <View>
            <KeyboardAvoidingView>
                {children}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Provider;
