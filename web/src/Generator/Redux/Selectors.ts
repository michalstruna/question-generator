import { useSelector } from 'react-redux'

export const useTopics = () => useSelector((state: any) => state.generator.topics)