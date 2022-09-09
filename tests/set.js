'use strict';

QUnit.module('Тестируем функцию set', function () {
    QUnit.test('set работает правильно c объектами с существующими свойствами', function (assert) {
        const object = {
            deep: {
                hested: {
                    field: 'baz'
                }
            }
        };

        const object2 = {
            deep: {
                hested: {
                    field: 42
                }
            }
        };

        const object3 = {
            deep: {
                hested: {
                    foo: 'bar'
                }
            }
        };

        const object4 = {
            deep: null
        };

        assert.deepEqual(set({foo: 'bar'}, '.foo', 'baz'), {foo: 'baz'});
        assert.deepEqual(set(object, '.deep.hested.field', 42), object2);

        assert.deepEqual(set(object, '.deep.hested', {foo: 'bar'}), object3);
        assert.deepEqual(set(object, '.deep', null), object4);
    });

    QUnit.test('set изменяет переданный объект', function (assert) {
        const object = {
            foo: 'bar'
        };

        const object1 = {
            foo: 'baz'
        };

        const object2 = set(object, '.foo', 'baz');
        assert.deepEqual(object, object1);
        assert.deepEqual(object2, object1);
    });

    QUnit.test('set работает правильно c массивами', function (assert) {
        const object1 = {
            foo: [1, 2, 3],
            bar: [
                {foobar: '42'}
            ]
        };

        const object2 = {
            foo: [1, 2, 3],
            bar: [
                {foobar: '42'}
            ]
        };

        const new1 = {
            foo: [42, 2, 3],
            bar: [
                {foobar: '42'}
            ]
        };

        const new2 = {
            foo: [1, 2, 3],
            bar: [
                {foobar: 'baz'}
            ]
        };

        assert.deepEqual(set(object1, '.foo.0', 42), new1);
        assert.deepEqual(set(object2, '.bar.0.foobar', 'baz'), new2);
    });

    QUnit.test('set работает правильно c объектами без свойств', function (assert) {
        const object = {
            deep: {
                nested: {
                    field: null
                }
            }
        };

        assert.deepEqual(set({}, '.deep.nested.field', null), object);
    });

    QUnit.test('set работает правильно обнуляет свойство', function (assert) {
        const object1 = {
            foo: [1, 2, 3],
            bar: [
                {foobar: '42'},
            ]
        };

        const new1 = {
            foo: null,
            bar: [
                {foobar: '42'},
            ]
        };


        assert.deepEqual(set(object1, '.foo', null), new1);
    });


    QUnit.test('set бросает ошибку при некорректном типе аргументов: path не строка', function (assert) {

        const object1 = {};
        try {
            set(object1, {}, {});
        } catch (err) {
            assert.deepEqual(err, TypeError("Invalid Argument"));
        }
    });

    QUnit.test('set бросает ошибку при некорректном типе аргументов: obj не объект', function (assert) {

        const object1 = "";
        try {
            set(object1, ".path", {});
        } catch (err) {
            assert.deepEqual(err, TypeError("Invalid Argument"));
        }
    });

    QUnit.test('set бросает ошибку при некорректном типе аргументов: val undefined', function (assert) {
        const object1 = {};
        try {
            set(object1, ".path",);
        } catch (err) {
            assert.deepEqual(err, TypeError("Invalid Argument"));
        }
    });


    QUnit.test('set бросает ошибку при некорректном типе аргументов: пустой путь', function (assert) {
        const object1 = {};
        try {
            set(object1, "", {});
        } catch (err) {
            assert.deepEqual(err, TypeError("Incorrect Path"));
        }
    });

    QUnit.test('set бросает ошибку при некорректном типе аргументов: некорректный путь', function (assert) {
        const object1 = {};
        try {
            set(object1, "val", {});
        } catch (err) {
            assert.deepEqual(err, TypeError("Incorrect Path"));
        }
    });

    QUnit.test('удаляем элементы, если того требует путь', function (assert) {
        const obj = {
            key1: "val1",
            key2: "val2",
            key3: {
                key1: "val3",
            }
        }

        const new1 = {
            key1: "val1",
            key2: "val2",
            key3: {
                key1: {
                    smth: {}
                }
            },

        }
        assert.deepEqual(set(obj, '.key3.key1.smth', {}), new1);
    });
    

    QUnit.test('set бросает ошибку при некорректном типе аргументов: некорректный путь тип 2', function (assert) {
        const obj = {
            key1: "val1",
            key2: "val2",
            key3: {
                key1: "val3",
            }
        }
        const new1 = {
            key1: "val1",
            key2: "val2",
            key3: {
                key1: "val3",
            },
            smth: {}
        }

        try {
            set(obj, '.', {})
        } catch (err) {
            assert.deepEqual(err, TypeError("Incorrect Path"));
        }
    });
});
