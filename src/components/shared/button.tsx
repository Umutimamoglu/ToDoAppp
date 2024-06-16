import { Box, Text } from "../../../utils/theme";
import { Pressable } from "react-native";

type ButtonPres = {
    label: string
    onPress: () => void
    onLongPress?: () => void
    disable?: boolean
    uppercase?: boolean
}

const Button = ({ label, onLongPress, onPress, disable, uppercase }: ButtonPres) => {

    return (
        <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disable} >
            <Box bg={disable ? "gray800" : "primary"}
                py="3.5"
                borderRadius={disable ? "rounded-7xl" : "rounded-2xl"}


            >
                <Text variant="textXs" fontWeight="700" color="white"
                    textAlign="center"
                    textTransform={uppercase ? "uppercase" : "none"}

                >
                    {label}
                </Text>
            </Box>
        </Pressable>
    )
}

export default Button

