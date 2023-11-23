import { View, Text } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Photo from './Photo';

const Suggestion = ({ suggestion }) => {

    return (
        <View className="bg-purple-300 mx-2 rounded-lg h-full px-3 py-7">
            <Photo user={suggestion.name} />
            <Text className="text-3xl font-bold text-center text-purple-700 m-2" style={{ fontFamily: 'Ubuntu' }}>{suggestion.name}</Text>
            <View>
                <Text style={{ fontFamily: 'Ubuntu' }}>{suggestion.biography}</Text>
            </View>
        </View>
    )
}

export default Suggestion;