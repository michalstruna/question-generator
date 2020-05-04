import { Redux, Sort } from '../../Data'
import {
    Answer,
    AnswerCheck,
    GeneratedQuestion,
    GeneratorInstance,
    Question,
    QuestionNew,
    Topic,
    TopicNew
} from '../types'
import { Query } from '../../Routing'
import { Requests } from '../../Async'

const topics: Topic[] = [
    { id: 't1', name: 'Datové struktury', questionsCount: 128, correct: 512, wrong: 118, time: 123456 },
    { id: 't2', name: 'Webové aplikace', questionsCount: 128, correct: 512, wrong: 118, time: 123456 }
]

const generatedQuestions: GeneratedQuestion[] = [
    {
        id: 'q1',
        topicId: 't2',
        token: 'abc',
        name: 'Jak se nazývá novinka, která v Reactu umožňuje používat state ve stateless komponentách?',
        wrong: 10,
        correct: 20,
        time: 30
    },
    {
        id: 'q2',
        topicId: 't1',
        token: 'cde',
        name: 'Kolik nejvýše potomků může mít uzel binárního stromu?',
        correct: 8,
        time: 12,
        wrong: 23
    }
]

const questions: Question[] = [
    {
        id: 'q1',
        topicId: 't2',
        answer: 'abc',
        name: 'Jak se nazývá novinka, která v Reactu umožňuje používat state ve stateless komponentách?',
        wrong: 10,
        correct: 20,
        time: 30
    },
    {
        id: 'q2',
        topicId: 't1',
        answer: 'cde',
        name: 'Kolik nejvýše potomků může mít uzel binárního stromu?',
        correct: 8,
        time: 12,
        wrong: 23
    }
]

const answers: Answer[] = [
    { token: 'abc', value: '56' }
]

const answerChecks: AnswerCheck[] = [
    { isCorrect: true, time: 12650, correctAnswer: answers[0] }
]

const mock = {
    getTopics: () => new Promise<Topic[]>(resolve => {
        setTimeout(() => resolve(topics), 500)
    }),
    generateQuestion: (topics: Topic[]) => new Promise<GeneratedQuestion>(resolve => {
        setTimeout(() => resolve(generatedQuestions[Math.floor(Math.random() * 2)]), 500)
    }),
    sendAnswer: (answer: Answer) => new Promise<AnswerCheck>(resolve => {
        setTimeout(() => resolve(answerChecks[0]), 500)
    }),
    getQuestions: () => new Promise<Question[]>(resolve => {
        setTimeout(() => resolve(questions), 500)
    }),
    addTopic: (topic: TopicNew) => new Promise<Topic>(resolve => {
        setTimeout(() => resolve(topics[0]), 500)
    }),
    addQuestion: (question: QuestionNew) => new Promise<Question>(resolve => {
        setTimeout(() => resolve(questions[0]), 500)
    }),
    removeTopic: (topicId: string) => new Promise<void>(resolve => {
        setTimeout(() => resolve(), 500)
    }),
    removeQuestion: (questionId: string) => new Promise<void>(resolve => {
        setTimeout(() => resolve(), 500)
    }),
    resetTopic: (topicId: string) => new Promise<void>(resolve => {
        setTimeout(() => resolve(), 500)
    }),
    resetQuestion: (topicId: string) => new Promise<void>(resolve => {
        setTimeout(() => resolve(), 500)
    })
}

const Slice = Redux.slice(
    'generator',
    {
        topics: Redux.async<Topic[]>(),
        question: Redux.async<GeneratedQuestion>(),
        answer: Redux.async<AnswerCheck>(),
        generator: Redux.empty<GeneratorInstance | undefined>(),
        sort: Redux.empty<Sort>({}),
        questions: Redux.async<Question[]>(),
        table: '',
        newTopic: Redux.async<TopicNew>(),
        newQuestion: Redux.async<QuestionNew>(),
        removedTopic: Redux.async<void>(),
        removedQuestion: Redux.async<void>(),
        resetTopic: Redux.async<void>(),
        resetQuestion: Redux.async<void>()
    },
    ({ async, set }) => ({
        getTopics: async<void, Topic[]>('topics', () => Requests.get<Topic[]>('topics')),

        addTopic: async<TopicNew, Topic>('newTopic', topic => Requests.post<Topic>('topics', topic), {
            onSuccess: (state, action) => {
                state.topics.payload!.push(action.payload)
            }
        }),

        removeTopic: async<string, void>('removedTopic', topicId => Requests.delete<any>(`topics/${topicId}`), {
            onSuccess: (state, action) => {
                if (state.topics.payload) {
                    state.topics.payload = state.topics.payload.filter(topic => topic.id !== action.meta?.arg)
                }
            }
        }),

        resetTopic: async<string, void>('resetTopic', topicId => Requests.put<void>(`topics/${topicId}/reset`), {
            onSuccess: (state, action) => {
                for (const topic of state.topics.payload!) {
                    if (topic.id === action.meta?.arg) {
                        topic.correct = topic.wrong = topic.time = 0

                        if (state.table === topic.id) {
                            for (const question of state.questions.payload!) {
                                question.correct = question.wrong = question.time = 0
                            }
                        }
                    }
                }
            }
        }),

        getQuestions: async<string | void, Question[]>('questions', mock.getQuestions),
        generateQuestion: async<Topic[], GeneratedQuestion>('question', mock.generateQuestion, {
            onPending: state => state.question.payload = state.question.error = state.answer.payload = null
        }),
        sendAnswer: async<Answer, AnswerCheck>('answer', mock.sendAnswer, {
            onSuccess: (state, action) => {
                if (action.payload.isCorrect) {
                    state.generator!.correct++
                } else {
                    state.generator!.wrong++
                }

                state.answer.payload = action.payload
            }
        }),
        setGenerator: set<GeneratorInstance | undefined>('generator'),
        setSort: set<Sort>('sort', {
            syncObject: () => ({
                column: [Query.SORT_COLUMN, v => Number.isInteger(v) && v > 0 && v < 6, 1],
                isAsc: [Query.SORT_IS_ASC, [false, true], true]
            })
        }),
        setTable: set<string>('table', {
            sync: () => [Query.DB_TABLE, s => s?.length > 0, '__topics__']
        }),
        addQuestion: async<QuestionNew, Question>('newQuestion', mock.addQuestion, {
            onSuccess: (state, action) => {
                if (state.table === action.payload.topicId) {
                    state.questions.payload?.push(action.payload)
                }
            }
        }),
        removeQuestion: async<string, void>('resetQuestion', mock.resetQuestion, {
            onSuccess: (state, action) => {
                if (state.questions.payload) {
                    state.questions.payload = state.questions.payload.filter(question => {
                        if (question.id === action.meta?.arg) {
                            for (const topic of state.topics.payload!) {
                                if (topic.id === question.topicId) {
                                    topic.correct = topic.correct - question.correct
                                    topic.wrong = topic.wrong - question.wrong
                                    topic.questionsCount = topic.questionsCount - 1
                                    topic.time = topic.time - question.time
                                }
                            }

                            return false
                        }

                        return true
                    })
                }
            }
        }),
        resetQuestion: async<string, void>('resetQuestion', mock.resetQuestion, {
            onSuccess: (state, action) => {
                for (const question of state.questions.payload!) {
                    if (question.id === action.meta?.arg) {
                        for (const topic of state.topics.payload!) {
                            if (topic.id === question.topicId) {
                                topic.correct = topic.correct - question.correct
                                topic.wrong = topic.wrong - question.wrong
                                topic.questionsCount = topic.questionsCount - 1
                                topic.time = topic.time - question.time
                            }
                        }

                        question.correct = question.time = question.wrong = 0
                    }
                }
            }
        })
    })
)

export default Slice.reducer

export const {
    getTopics, generateQuestion, sendAnswer, setGenerator, setSort, setTable, getQuestions, addTopic, addQuestion,
    removeTopic, removeQuestion, resetQuestion, resetTopic
} = Slice.actions