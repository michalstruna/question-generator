import Language from './Language'
import Url from '../../Routing/Constants/Url'

const CS = Language.CS
const EN = Language.EN

export default {

    nav: {
        links: [
            { text: { [CS]: 'Generátor', [EN]: 'Generator' }, pathname: Url.HOME, icon: 'Overview' },
            { text: { [CS]: 'Databáze', [EN]: 'Database' }, pathname: Url.DATABASE, icon: 'Database' },
        ]
    },

    home: {
        title: {
            [CS]: 'Nadpis',
            [EN]: 'Title'
        },
        toggle: {
            [CS]: 'Změnit jazyk',
            [EN]: 'Change language'
        }
    },

    generator: {
        title: { [CS]: 'Generátor otázek' },
        selectTopics: { [CS]: 'Vyberte témata' },
        selectedTopics: { [CS]: 'Vybraná témata' },
        submit: { [CS]: 'Začít' }
    },

    question: {
        answer: { [CS]: 'Odpověď', [EN]: 'Answer' },
        missingAnswer: { [CS]: 'Napište odpověď', [EN]: 'Type answer' },
        submit: { [CS]: 'Odpovědět', [EN]: 'Answer' },
        dontKnow: { [CS]: 'Nevím', [EN]: 'Don\'t know' },
        next: { [CS]: 'Další', [EN]: 'Next' },
        exit: { [CS]: 'Ukončit', [EN]: 'Exit' },
        correct: { [CS]: 'Správně' },
        wrong: { [CS]: 'Špatně' },
        correctAnswer: { [CS]: 'Správná odpověď' },
        time: { [CS]: 'Doba odpovědi' },
    },

    database: {
        topic: { [CS]: 'Téma' },
        questions: { [CS]: 'Otázky' },
        topics: { [CS]: 'Témata' },
        answers: { [CS]: 'Odpovědí' },
        success: { [CS]: 'Úspěšnost' },
        totalTime: { [CS]: 'Strávený čas' },
        timePerQuestion: { [CS]: 'Čas na odpověď' },
        reset: 'Reset',
        delete: { [CS]: 'Smazat' },
        allTopics: { [CS]: 'Všechna témata' },
        allQuestions: { [CS]: 'Všechny otázky' },
        global: { [CS]: 'Obecné' },
        specified: { [CS]: 'Specifické' },
        select: { [CS]: 'Vybrat' },
        contains: { [CS]: 'Kde název obsahuje' },
        anything: { [CS]: 'Cokoliv' },
        questionsFromTopics: { [CS]: 'Otázky z tématu' },
        add: { [CS]: 'Přidat' },
        name: { [CS]: 'Název' },
        missingName: { [CS]: 'Zadejte název' },
        addTopic: { [CS]: 'Nové téma' },
        addQuestion: { [CS]: 'Nová otázka' },
        answer: { [CS]: 'Odpověď' },
        missingAnswer: { [CS]: 'Zadejte odpověď' },
        from: { [CS]: 'Z tématu' },
        missingTopic: { [CS]: 'Vyberte téma' },
        question: { [CS]: 'Otázka' }
    }

}