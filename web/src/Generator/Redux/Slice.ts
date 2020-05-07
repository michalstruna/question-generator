import { Cursor, Filter, Pageable, Redux, Segment, Sort } from '../../Data'
import { Answer, AnswerCheck, GeneratorInstance, Question, QuestionInstance, QuestionNew, Topic, TopicNew } from '../types'
import { Query } from '../../Routing'
import { Requests } from '../../Async'

const questionColumns = ['name', 'name', 'answer', 'topic', 'success', 'answersCount', 'totalTime', 'timePerAnswer']

const Slice = Redux.slice(
    'generator',
    {
        topics: Redux.async<Pageable<Topic>>(),
        questions: Redux.async<Pageable<Question>>(),
        sort: Redux.empty<Sort>({}),
        filter: Redux.empty<Filter>({}),
        segment: Redux.empty<Segment>({}),
        answer: Redux.async<AnswerCheck>(),
        generator: Redux.empty<GeneratorInstance | undefined>(),
        question: Redux.async<QuestionInstance>(),
        table: '',
        newTopic: Redux.async<TopicNew>(),
        newQuestion: Redux.async<QuestionNew>(),
        removedTopic: Redux.async<void>(),
        removedQuestion: Redux.async<void>(),
        resetTopic: Redux.async<void>(),
        resetQuestion: Redux.async<void>(),
        topicId: Redux.empty('')
    },
    ({ async, set }) => ({
        getTopics: async<void, Pageable<Topic>>('topics', () => Requests.get<Pageable<Topic>>('topics')),

        addTopic: async<TopicNew, Topic>('newTopic', topic => Requests.post<Topic>('topics', topic), {
            onSuccess: (state, action) => {
                state.topics.payload!.content.push(action.payload)
                state.topics.payload!.totalElements++
            }
        }),

        removeTopic: async<string, void>('removedTopic', topicId => Requests.delete<any>(`topics/${topicId}`), {
            onSuccess: (state, action) => {
                state.topics.payload!.content = state.topics.payload!.content.filter(topic => topic.id !== action.meta!.arg)
                state.topics.payload!.totalElements--

                if (state.questions.payload) {
                    state.questions.payload.content = state.questions.payload.content.filter(q => q.topic.id !== action.meta!.arg)
                }
            }
        }),

        resetTopic: async<string, Topic>('resetTopic', topicId => Requests.put<Topic>(`topics/${topicId}/reset`), {
            onSuccess: (state, action) => {
                for (const topic of state.topics.payload!.content) {
                    if (topic.id === action.meta!.arg) {
                        topic.correct = topic.wrong = topic.totalTime = 0
                    }
                }

                if (state.questions.payload && (state.topicId === action.payload.id || !state.topicId)) {
                    for (const question of state.questions.payload.content) {
                        question.correct = question.wrong = question.totalTime = 0
                    }
                }
            }
        }),

        setSort: set<Sort>('sort', {
            syncObject: () => ({
                column: [Query.SORT_COLUMN, v => Number.isInteger(v) && v > 0 && v < 6, 1],
                isAsc: [Query.SORT_IS_ASC, [false, true], true]
            })
        }),

        setFilter: set<Filter>('filter', {
            sync: () => [Query.FILTER, v => typeof v === 'string', '']
        }),

        setSegment: set<Segment>('segment', {
            syncObject: () => ({
                size: [Query.SEGMENT_SIZE, [5, 10, 20, 50, 100, 200], 20],
                index: [Query.SEGMENT_INDEX, v => Number.isInteger(v) && v >= 0, 0] // TODO: Max value.
            })
        }),

        getQuestions: async<[Cursor, number?], Pageable<Question>>('questions', ([cursor, topicId]) => Requests.get('questions', {
            nameFilter: cursor.filter,
            topicIdFilter: topicId,
            sort: questionColumns[cursor.sort.column] + ',' + (cursor.sort.isAsc ? 'asc' : 'desc')
        })),

        addQuestion: async<QuestionNew, Question>('newQuestion', question => Requests.post('questions', question), {
            onSuccess: (state, action) => {
                if (state.topicId === action.payload.topic.id || !state.topicId) {
                    state.questions.payload!.content.push(action.payload)
                }

                for (const topic of state.topics.payload!.content) {
                    if (topic.id === action.payload.topic.id) {
                        topic.questionsCount++
                    }
                }
            }
        }),

        removeQuestion: async<string, void>('resetQuestion', questionId => Requests.delete(`questions/${questionId}`), {
            onSuccess: (state, action) => {
                if (state.questions.payload) {
                    state.questions.payload.content = state.questions.payload.content.filter(question => {
                        if (question.id === action.meta!.arg) {
                            for (const topic of state.topics.payload!.content) {
                                if (topic.id === question.topic.id) {
                                    topic.correct = topic.correct - question.correct
                                    topic.wrong = topic.wrong - question.wrong
                                    topic.questionsCount--
                                    topic.totalTime = topic.totalTime - question.totalTime
                                }
                            }

                            return false
                        }

                        return true
                    })
                }
            }
        }),

        resetQuestion: async<string, void>('resetQuestion', questionId => Requests.put(`questions/${questionId}/reset`), {
            onSuccess: (state, action) => {
                for (const question of state.questions.payload!.content) {
                    if (question.id === action.meta!.arg) {
                        for (const topic of state.topics.payload!.content) {
                            if (topic.id === question.topic.id) {
                                topic.correct = topic.correct - question.correct
                                topic.wrong = topic.wrong - question.wrong
                                topic.totalTime = topic.totalTime - question.totalTime
                            }
                        }

                        question.correct = question.totalTime = question.wrong = 0
                    }
                }
            }
        }),

        setTopicId: set<string>('topicId'),

        generateQuestion: async<number[], QuestionInstance>('question', topicIds => Requests.get<QuestionInstance>('questions/random', {
            topicIds
        }), {
            onPending: state => state.question.payload = state.question.error = state.answer.payload = null
        }),

        sendAnswer: async<Answer, AnswerCheck>('answer', answer => Requests.put(`questions/${answer.id}/answer`, answer.value), {
            onSuccess: (state, action) => {
                state.generator![action.payload.isCorrect ? 'correct' : 'wrong']++
                state.answer.payload = action.payload
            }
        }),

        setGenerator: set<GeneratorInstance | undefined>('generator'),

        setTable: set<string>('table', {
            sync: () => [Query.DB_TABLE, ['questions', 'topics'], 'topics']
        })
    })
)

export default Slice.reducer

export const {
    getTopics, generateQuestion, sendAnswer, setGenerator, setSort, setTable, getQuestions, addTopic, addQuestion,
    removeTopic, removeQuestion, resetQuestion, resetTopic, setSegment, setFilter, setTopicId
} = Slice.actions