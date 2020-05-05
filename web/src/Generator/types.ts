export type TopicNew = {
    name: string
}

export type Topic = Stats & TopicNew & {
    id: number
    questionsCount: number
}

export type QuestionNew = {
    name: string
    answer: string
    topicId: number
}

export type Question = Stats & QuestionNew & {
    id: number
    topicId: number
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
    totalTime: number
}

export type Stats = {
    correct: number
    wrong: number
    totalTime: number
}

export type GeneratorInstance = Stats & {
    topics: Topic[]
}