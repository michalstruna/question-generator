import { Redux, Sort } from '../../Data'
import { Answer, AnswerCheck, GeneratedQuestion, GeneratorInstance, Topic } from '../types'
import { Query } from '../../Routing'

const topics: Topic[] = [
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 5, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    {
        id: 't1',
        name: 'Datové struktury',
        stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 }
    }, { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 5, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    {
        id: 't1',
        name: 'Datové struktury',
        stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 }
    }, { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 5, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    {
        id: 't1',
        name: 'Datové struktury',
        stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 }
    }, { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 5, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    {
        id: 't1',
        name: 'Datové struktury',
        stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 }
    }, { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 5, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    {
        id: 't1',
        name: 'Datové struktury',
        stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 }
    }, { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 5, wrong: 118, time: 123456 } },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } },
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } }
]

const questions: GeneratedQuestion[] = [
    {
        id: 'q1',
        topicId: 't2',
        token: 'abc',
        name: 'Jak se nazývá novinka, která v Reactu umožňuje používat state ve stateless komponentách?',
        stats: { wrong: 10, correct: 20, time: 30 }
    },
    {
        id: 'q2',
        topicId: 't1',
        token: 'cde',
        name: 'Kolik nejvýše potomků může mít uzel binárního stromu?',
        stats: { correct: 8, time: 12, wrong: 23 }
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
        setTimeout(() => resolve(questions[Math.floor(Math.random() * 2)]), 500)
    }),
    sendAnswer: (answer: Answer) => new Promise<AnswerCheck>(resolve => {
        setTimeout(() => resolve(answerChecks[0]), 500)
    })
}

const Slice = Redux.slice(
    'generator',
    {
        topics: Redux.async<Topic[]>(),
        question: Redux.async<GeneratedQuestion>(),
        answer: Redux.async<Answer>(),
        generator: Redux.empty<GeneratorInstance | undefined>(),
        sort: Redux.empty<Sort>({})
    },
    ({ async, set }) => ({
        getTopics: async<void, Topic[]>('topics', mock.getTopics),
        generateQuestion: async<Topic[], GeneratedQuestion>('question', mock.generateQuestion, {
            onPending: state => state.question.payload = state.question.error = state.answer.payload = null
        }),
        sendAnswer: async<Answer, AnswerCheck>('answer', mock.sendAnswer, {
            onSuccess: (state, action) => {
                if ((action.payload as any).isCorrect) {
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
        })
    })
)

export default Slice.reducer
export const { getTopics, generateQuestion, sendAnswer, setGenerator, setSort } = Slice.actions