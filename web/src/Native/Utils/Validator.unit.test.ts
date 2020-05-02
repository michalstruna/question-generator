import * as Validator from './Validator'

describe('is', () => {
    describe('regexp predicate', () => {
        test('4 should match [0-9]', () => {
            expect(Validator.is(4, /[0-9]/)).toBeTruthy()
        })

        test('12 should  match [0-9]', () => {
            expect(Validator.is(12, /[0-9]/)).toBeTruthy()
        })

        test('12 should not match ^[0-9]$', () => {
            expect(Validator.is(12, /^[0-9]$/)).toBeFalsy()
        })

        test('* should not match [0-9]', () => {
            expect(Validator.is('*', /[0-9]/)).toBeFalsy()
        })
    })

    describe('array predicate', () => {
        test('Abc should match [\'Cde\', \'Abc\', \'Efg\']', () => {
            expect(Validator.is('Abc', ['Cde', 'Abc', 'Efg'])).toBeTruthy()
        })

        test('Abc should match [\'Cde\', \'Ab\', \'Efg\']', () => {
            expect(Validator.is('Abc', ['Cde', 'Ab', 'Efg'])).toBeFalsy()
        })

        test('Nothing should not match [\'A\', \'B\', \'C\']', () => {
            expect(Validator.is('Abc', ['Cde', 'Ab', 'Efg'])).toBeFalsy()
        })
    })

    describe('function predicate', () => {
        test('51 % 45 should match 6', () => {
            expect(Validator.is(51, x => (x % 45) === 6)).toBeTruthy()
        })

        test('typeof true should not match \'string\'', () => {
            expect(Validator.is(true, x => typeof x === 'string')).toBeFalsy()
        })
    })

    describe('value predicate', () => {
        test('7 should match 7', () => {
            expect(Validator.is(7, 7)).toBeTruthy()
        })

        test('\'A\' should not match \'B\'', () => {
            expect(Validator.is('A', 'B')).toBeFalsy()
        })

        test('true should not match false', () => {
            expect(Validator.is(true, false)).toBeFalsy()
        })
    })
})

describe('is2', () => {
    test('4 and 8 should by both higher than 3', () => {
        expect(Validator.is2(4, 8, (x, y) => x > 3 && y > 3)).toBeTruthy()
    })

    test('[1, 2] should match Array.isArray and \'ABC\' should match ^[A-Z]{3}$', () => {
        expect(Validator.is2([1, 2], 'ABC', (x, y) => Array.isArray(x) && /^[A-Z]{3}$/.test(y))).toBeTruthy()
    })

    test('1 should not be higher than 5', () => {
        expect(Validator.is2(1, 5, (x, y) => x > y)).toBeFalsy()
    })
})

describe('compare', () => {
    describe('equals', () => {
        test('7 should be equals 7', () => {
            expect(Validator.compare(7, Validator.Relation.EQUALS, 7)).toBeTruthy()
        })

        test('7 should not be equals 8', () => {
            expect(Validator.compare(7, Validator.Relation.EQUALS, 8)).toBeFalsy()
        })

        test('\'A\' should not be equals \'B\'', () => {
            expect(Validator.compare('A', Validator.Relation.EQUALS, 'B')).toBeFalsy()
        })
    })
})

describe('safe', () => {
    test('safe value should stay', () => {
        expect(Validator.safe(12, [6, 12, 18], 0)).toBe(12)
    })

    test('unsafe value should be replaced', () => {
        expect(Validator.safe('A', ['B', 'C', 'D'], 'Z')).toBe('Z')
    })

    test('undefined value should be replaced', () => {
        expect(Validator.safe(undefined, x => x !== undefined, true)).toBe(true)
    })

    test('undefined value should stay', () => {
        expect(Validator.safe(undefined, x => true, false)).toBe(undefined)
    })
})

describe('isEmail', () => {
    test('a@b.cz should be email', () => {
        expect(Validator.isEmail('a@b.cz')).toBeTruthy()
    })

    test('a.c@cde.cz should be email', () => {
        expect(Validator.isEmail('a.c@cde.cz')).toBeTruthy()
    })

    test('ab.@cde.cz should not be email', () => {
        expect(Validator.isEmail('ab.@cde.cz')).toBeFalsy()
    })

    test('abc@cde should not be email', () => {
        expect(Validator.isEmail('abc@cde')).toBeFalsy()
    })
})

describe('isUrl', () => {
    test('http://google.com should be url', () => {
        expect(Validator.isUrl('http://google.com')).toBeTruthy()
    })

    test('https://google.cz should be url', () => {
        expect(Validator.isUrl('https://google.cz')).toBeTruthy()
    })

    test('https://www.google.com should be url', () => {
        expect(Validator.isUrl('https://www.google.com')).toBeTruthy()
    })

    test('/home should not be url', () => {
        expect(Validator.isUrl('/home')).toBeFalsy()
    })

    test('/google.cz should not be url', () => {
        expect(Validator.isUrl('/google.cz')).toBeFalsy()
    })

    test('//google.cz should not be url', () => {
        expect(Validator.isUrl('//google.cz')).toBeFalsy()
    })
})
