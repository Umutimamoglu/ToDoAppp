

import React from 'react'
import { Box, Text } from '../../../utils/theme'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import useSWR from 'swr'
import { fetcher } from '../../services/config'
import { Loader } from '../../components/shared/Loader'
import { FlatList } from 'react-native'
import { ICategory } from '../../types'
import Category from '../../components/categories/category'
import CreateNewList from '../../components/categories/create-new-list'




const CategoriesScreen = () => {
    const { data, isLoading, error } = useSWR<ICategory[]>(
        "category/",
        fetcher,
        {
            refreshInterval: 1000,
        }
    )

    if (isLoading) {
        return <Loader />
    }

    const renderItem = ({ item }: { item: ICategory }) => (
        <Category category={item} />
    )

    return (
        <SafeAreaWrapper>
            <Box flex={1} px="4">
                <Text variant="textX1" fontWeight="700" mb="10">
                    Categories
                </Text>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Box height={14} />}
                    keyExtractor={(item) => item._id}
                />
                <CreateNewList />
            </Box>
        </SafeAreaWrapper>
    )
}

export default CategoriesScreen