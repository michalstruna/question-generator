import { useSelector } from 'react-redux'
import { GeneratorInstance } from '../types'

type State = any // TODO: Use typeof State.

export const useTopics = () => useSelector((state: State) => state.generator.topics)
export const useQuestion = () => useSelector((state: State) => state.generator.question)
export const useAnswer = () => useSelector((state: State) => state.generator.answer)
export const useGenerator = (): GeneratorInstance => useSelector((state: State) => state.generator.generator)