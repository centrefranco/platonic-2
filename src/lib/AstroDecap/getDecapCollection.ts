import type { Item } from '@composables/useSearch'
import { getCollection } from 'astro:content'

const preparedItems = (rawItems: any) => {
  if (Array.isArray(rawItems) && rawItems.length === 1) {
    return rawItems[0].data as Item
  }

  return rawItems.map((item: any) => item.data as Item)
}

const getDecapCollection = async (collectionName: string) => {
  const collection = await getCollection(collectionName)
  return preparedItems(collection)
}

export { getDecapCollection }
