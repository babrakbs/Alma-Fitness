import Snackbar from 'react-native-snackbar';
import { colors } from '../constants/index';

const toast = (text, properties = {}, onPress = () => { }) => {

    let { backgroundColor = colors.error, textColor = colors.white } = properties

    Snackbar.show({
        text: text,
        textColor: textColor,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: backgroundColor,
        action: {
            text: '',
            onPress: onPress,
            textColor: backgroundColor === colors.red ? colors.white : colors.black,
        },
    });
}

const toastSuccess = (text, properties = {}, onPress = () => { }) => {

    let { backgroundColor = colors.green, textColor = colors.black } = properties

    Snackbar.show({
        text: text,
        textColor: textColor,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: backgroundColor,
        action: {
            text: '',
            onPress: onPress,
            textColor: colors.black,
        },
    });
}

export {
    toast,
    toastSuccess,
}