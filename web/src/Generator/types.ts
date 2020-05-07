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

export type Question = Stats & Omit<QuestionNew, 'topicId'> & {
    id: number
    topic: Topic
    name: string
}

export type QuestionInstance = {
    id: number
    question: Question
    startTime: number
}

export type Answer<Value = string> = {
    id: number,
    value: Value
}

export type AnswerCheck<Value = string> = {
    isCorrect: boolean
    correctAnswer: Omit<Value, 'token'>
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