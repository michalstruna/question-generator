export default {

    TEXT: {
        name: 'text',
        validator: () => true
    },

    EMAIL: {
        name: 'email',
        validator: () => true // TODO: Regexp.
    },

    NUMBER: {
        name: 'number',
        validator: (value: any) => /[0-9]*/.test(value)
    },

    PASSWORD: {
        name: 'password',
        validator: () => true
    },

    TEXTAREA: {
        name: 'textarea',
        validator: () => true
    },

    DATE: {
        name: 'date',
        validator: () => true // TODO: Validate date.
    },

    SELECT: {
        name: 'select',
        validator: () => true
    },

    CHECKBOX: {
        name: 'checkbox',
        validator: () => true
    }

}