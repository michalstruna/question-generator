import { useSelector } from 'react-redux'
import { AnswerCheck, GeneratorInstance, Question, QuestionInstance, Topic } from '../types'
import { AsyncData, Filter, Pageable, Segment, Sort } from '../../Data'

type State = any // TODO: Use typeof State.

export const useTopics = (): AsyncData<Pageable<Topic>> => useSelector((state: State) => state.generator.topics)
export const useQuestions = (): AsyncData<Pageable<Question>> => useSelector((state: State) => state.generator.questions)

export const useSort = (): Sort => useSelector((state: State) => state.generator.sort)
export const useSegment = (): Segment => useSelector((state: State) => state.generator.segment)
export const useFilter = (): Filter => useSelector((state: State) => state.generator.filter)

export const useQuestion = (): AsyncData<QuestionInstance> => useSelector((state: State) => state.generator.question)
export const useAnswer = (): AsyncData<AnswerCheck> => useSelector((state: State) => state.generator.answer)
export const useGenerator = (): GeneratorInstance => useSelector((state: State) => state.generator.generator)
export const useTable = (): string => useSelector((state: State) => state.generator.table)
export const useNewTopic = (): AsyncData<Topic> => useSelector((state: State) => state.generator.newTopic)
export const useNewQuestion = (): AsyncData<Question> => useSelector((state: State) => state.generator.newQuestion)
export const useRemovedTopic = (): AsyncData<void> => useSelector((state: State) => state.generator.newTopic)
export const useRemovedQuestion = (): AsyncData<void> => useSelector((state: State) => state.generator.newQuestion)
export const useResetTopic = (): AsyncData<void> => useSelector((state: State) => state.generator.resetTopic)
export const useResetQuestion = (): AsyncData<void> => useSelector((state: State) => state.generator.resetQuestion())
export const useTopicId = (): number => useSelector((state: State) => state.generator.topicId)