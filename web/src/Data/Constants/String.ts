import Language from './Language'
import Url from '../../Routing/Constants/Url'

const CS = Language.CS
const EN = Language.EN

export default {

    nav: {
        links: [
            { text: { [CS]: 'Přehled', [EN]: 'Overview' }, pathname: Url.HOME, icon: 'Overview' },
            { text: { [CS]: 'Databáze', [EN]: 'Database' }, pathname: Url.DATABASE, icon: 'Database' },
            { text: { [CS]: 'Generátor', [EN]: 'Generator' }, pathname: Url.GENERATOR, icon: 'Generator' }
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
        time: { [CS]: 'Doba odpovědi' }
    }

}