import { Redux } from '../../Data'
import { Answer, AnswerCheck, GeneratedQuestion, GeneratorInstance, Question, Stats, Topic } from '../types'

const topics: Topic[] = [
    { id: 't1', name: 'Datové struktury', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456} },
    { id: 't2', name: 'Webové aplikace', stats: { questionsCount: 128, correct: 512, wrong: 118, time: 123456 } }
]

const questions: GeneratedQuestion[] = [
    { id: 'q1', topicId: 't2', token: 'abc', name: 'Jak se nazývá novinka, která v Reactu umožňuje používat state ve stateless komponentách?', stats: { wrong: 10, correct: 20, time: 30 } }
]

const answers: Answer[] = [
    { token: 'abc', value: '56' }
]

const answerChecks: AnswerCheck[] = [
    { isCorrect: true, time: 1200, correctAnswer: answers[0] }
]

const mock = {
    getTopics: () => new Promise<Topic[]>(resolve => {
        setTimeout(() => resolve(topics), 500)
    }),
    generateQuestion: (topics: Topic[]) => new Promise<GeneratedQuestion>(resolve => {
        setTimeout(() => resolve(questions[0]), 500)
    }),
    sendAnswer: (answer: Answer) => new Promise<AnswerCheck>(resolve => {
        setTimeout(() => resolve(answerChecks[0]))
    })
}

const Slice = Redux.slice(
    'generator',
    {
        topics: Redux.async<Topic[]>(),
        question: Redux.async<GeneratedQuestion>(),
        answer: Redux.async<Answer>(),
        generator: Redux.empty<GeneratorInstance>()
    },
    ({ async, set }) => ({
        getTopics: async<void, Topic[]>('topics', mock.getTopics),
        generateQuestion: async<Topic[], GeneratedQuestion>('question', mock.generateQuestion),
        sendAnswer: async<Answer, AnswerCheck>('answer', mock.sendAnswer, {
            onSuccess: (state, action) => {
                console.log(111, state, action)
            }
        }),
        setGenerator: set<GeneratorInstance>('generator')
    })
)

export default Slice.reducer
export const { getTopics, generateQuestion, sendAnswer, setGenerator } = Slice.actions