export type TopicNew = {
    name: string
}

export type Topic = Stats & TopicNew & {
    id: string
    questionsCount: number
}

export type QuestionNew = {
    name: string
    answer: string
    topicId: string
}

export type Question = Stats & QuestionNew & {
    id: string
    topicId: string
    name: string
}

export type GeneratedQuestion = Omit<Question, 'answer'> & {
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