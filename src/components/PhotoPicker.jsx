import { Pressable, Text, View, Image } from 'react-native';
import { useState } from 'react';
import { useStore } from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { setImage } from '../redux/image/imageSlice';
import * as ImagePicker from 'expo-image-picker';

const PhotoPicker = () => {

    const [imageFile, setImageFile] = useState(null);
    const store = useStore();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        if (!result.canceled) {
            setImageFile(result.assets[0].uri);
            store.dispatch(setImage(result.assets[0]));
        }
    }

    const removeImage = () => {
        setImageFile(null);
        store.dispatch(setImage(null));
    }

    return (
        <View className="container flex my-2 items-center">
            <Pressable onPress={pickImage} className="bg-fuchsia-600 flex flex-col rounded-full w-fit h-auto align-middle p-1 items-center justify-center">
                {
                    imageFile ? <Image source={{ uri: imageFile }} className="rounded-full w-28 h-28"/> :  <Icon name="account" size={90} color="white"/>
                }
            </Pressable>
            <View className="flex flex-row">
                { imageFile == null ? 
                    <Text className="text-lg text-fuchsia-500" style={{fontFamily: 'Ubuntu'}}>Foto de perfil</Text> 
                    :
                    <Pressable onPress={removeImage} className="bg-fuchsia-500 rounded-full w-fit h-auto p-1 my-2">
                        <Icon name="trash-can" size={24} color="white"/>
                    </Pressable>
                }
            </View>
        </View>
    )
}

export default PhotoPicker;