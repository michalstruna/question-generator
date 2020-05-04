import { useSelector } from 'react-redux'
import { GeneratorInstance, Topic } from '../types'
import { AsyncData } from '../../Data'

type State = any // TODO: Use typeof State.

export const useTopics = (): AsyncData<Topic[]> => useSelector((state: State) => state.generator.topics)
export const useQuestion = () => useSelector((state: State) => state.generator.question)
export const useAnswer = () => useSelector((state: State) => state.generator.answer)
export const useGenerator = (): GeneratorInstance => useSelector((state: State) => state.generator.generator)