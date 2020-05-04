export type TopicNew = {
    name: string
}

export type Topic = TopicNew & {
    id: string
    stats: Stats & {
        questionsCount: number
    }
}

export type QuestionNew = {
    name: string
    answer: string
    topicId: string
}

export type Question = {
    id: string
    topicId: string
    name: string
    stats: Stats
}

export type GeneratedQuestion = Question & {
    token: string
}

export type Answer<Value = string> = {
    token: string,
    value: Value
}

export type AnswerCheck<Value = string> = {
    isCorrect: boolean
    correctAnswer: Omit<Answer<Value>, 'token'>
    time: number
}

export type Stats = {
    correct: number
    wrong: number
    time: number
}

export type GeneratorInstance = Stats & {
    topics: Topic[]
}