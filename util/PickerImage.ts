import { Alert } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';

export const pickerImage = async (): Promise<string | null> => {
    const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
    };

    return new Promise((resolve) => {
        launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            resolve(null);
        } else if (response.errorCode) {
            Alert.alert('에러', response.errorMessage || '알 수 없는 오류 발생');
            resolve(null);
        } else {
            const uri = response.assets?.[0]?.uri;
            resolve(uri ?? null);
        }
        });
    });
};
