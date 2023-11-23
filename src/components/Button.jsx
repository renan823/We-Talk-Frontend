import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Button = (props) => {

    let button = `container rounded p-2 m-2 my-3 w-4/5 ${props.buttonStyle}`;
    let text = `text-lg text-center ${props.textStyle}`;
    const style = {fontFamily: "Ubuntu"};

    const handleOnPress = () => {
        props.onPress();
    }

    if (props.icon) {
        button += " flex flex-row px-3 align-center justify-center";
        text += " mx-3 ";

        return (
            <TouchableOpacity className={button} onPress={() => handleOnPress()} activeOpacity={0.8}>
                <View>
                    <Text className={text} style={style}>{props.text}</Text>
                    <Icon name={props.icon} size={30} color="white"/> 
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity className={button} onPress={() => handleOnPress()} activeOpacity={0.8}>
            <View>
                <Text className={text} style={style}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button;