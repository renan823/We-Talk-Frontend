import { Text, TextInput, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Controller } from 'react-hook-form';

const Input = (props) => {

    const label = `mx-4 text-lg ${props.labelStyle}`;

    return (
        <View>
            { props.label ? <Text className={label} style={{fontFamily: 'Ubuntu'}}>{props.label}</Text> : <></> }
            <View className="flex flex-row bg-gray-200 items-center align-center justify-center mx-4 my-1 p-2 w-auto rounded border-2 border-gray-400">
                { props.icon ? <Icon name={props.icon} size={32} color="gray"/> : <></> }
                <Controller 
                    control = {props.control}
                    name = {props.field}
                    rules = {props.rules}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <TextInput 
                                placeholder={props.placeholder} 
                                secureTextEntry={props.secureTextEntry} 
                                multiline={props.multiline}
                                numberOfLines={props.numberOfLines}
                                value={value} 
                                onChangeText={onChange} 
                                className="mx-2 w-5/6 text-slate-600 bg-g" 
                                style={{fontFamily: 'Ubuntu'}}
                            />
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default Input;

