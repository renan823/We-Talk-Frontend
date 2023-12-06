import { View, Text, ScrollView, FlatList } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Photo from './Photo';

const Suggestion = ({ suggestion }) => {

    return (
        <View className=" mx-2 rounded-lg px-3 py-7">
            <Photo user={suggestion.name} />
            <Text className="text-3xl font-bold text-center text-purple-700 m-2" style={{ fontFamily: 'Ubuntu' }}>{suggestion.name}</Text>
            <View>
                <Text className="text-center text-lg" style={{ fontFamily: 'Ubuntu' }}>{suggestion.biography}</Text>
            </View>
            <View className="m-2 p-3 bg-white rounded-md h-36">
                <ScrollView>
                    <Text className="text-lg" style={{ fontFamily: 'Ubuntu' }}> - Fala:</Text>
                    <View className="ml-7">
                        <FlatList data={suggestion.speak} keyExtractor={(item) => item} renderItem={({item}) => <Text style={{ fontFamily: 'Ubuntu' }}>•{item}</Text>}/>
                    </View>                     
                    <Text className="text-lg" style={{ fontFamily: 'Ubuntu' }}> - Quer aprender:</Text>
                    <View className="ml-7">
                        <FlatList data={suggestion.learn} keyExtractor={(item) => item} renderItem={({item}) => <Text style={{ fontFamily: 'Ubuntu' }}>•{item}</Text>}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Suggestion;