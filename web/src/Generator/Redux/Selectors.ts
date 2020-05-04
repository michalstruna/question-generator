import { useSelector } from 'react-redux'
import { AnswerCheck, GeneratedQuestion, GeneratorInstance, Question, Topic } from '../types'
import { AsyncData, Sort } from '../../Data'

type State = any // TODO: Use typeof State.

export const useTopics = (): AsyncData<Topic[]> => useSelector((state: State) => state.generator.topics)
export const useQuestions = (): AsyncData<Question[]> => useSelector((state: State) => state.generator.questions)
export const useQuestion = (): AsyncData<GeneratedQuestion> => useSelector((state: State) => state.generator.question)
export const useAnswer = (): AsyncData<AnswerCheck> => useSelector((state: State) => state.generator.answer)
export const useGenerator = (): GeneratorInstance => useSelector((state: State) => state.generator.generator)
export const useSort = (): Sort => useSelector((state: State) => state.generator.sort)
export const useTable = (): string => useSelector((state: State) => state.generator.table)
export const useNewTopic = (): AsyncData<Topic> => useSelector((state: State) => state.generator.newTopic)
export const useNewQuestion = (): AsyncData<Question> => useSelector((state: State) => state.generator.newQuestion)
export const useRemovedTopic = (): AsyncData<void> => useSelector((state: State) => state.generator.newTopic)
export const useRemovedQuestion = (): AsyncData<void> => useSelector((state: State) => state.generator.newQuestion)
export const useResetTopic = (): AsyncData<void> => useSelector((state: State) => state.generator.resetTopic)
export const useResetQuestion = (): AsyncData<void> => useSelector((state: State) => state.generator.resetQuestion())