import { ActivityIndicator } from "react-native"
import { Box } from "../../../utils/theme"
import SafeAreaWrapper from "./safe-area-wrapper"


export const Loader = () => {
    return (
        <SafeAreaWrapper>
            <Box flex={1} alignItems="center" justifyContent="center">
                <ActivityIndicator />
            </Box>
        </SafeAreaWrapper>
    )
}