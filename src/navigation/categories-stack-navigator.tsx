import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/categories-screen";
import { CategoriesStackParamList } from "./types";
import CategoryScreen from "../screens/category-screen";
import CreateCategory from "../screens/cerate-category-screen";


const Stack = createNativeStackNavigator<CategoriesStackParamList>();

const CategoriesStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreateCategory"
                component={CreateCategory}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default CategoriesStackNavigator;