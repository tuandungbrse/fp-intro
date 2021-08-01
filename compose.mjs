// Setup
//==============
import {
  compose,
  map,
  filter,
  reduce,
  prop,
  head,
  last,
  add,
  replace,
  join,
  toLower,
  sortBy
} from 'ramda'

import { formatMoney } from 'accounting-js'
// Example Data
const CARS = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
]

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.

const isLastInStock = compose(prop('in_stock'), last)

QUnit.test('Ex1: isLastInStock', (assert) => {
  assert.deepEqual(isLastInStock(CARS), false)
})
;('')

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car

const nameOfFirstCar = compose(prop('name'), head)

QUnit.test('Ex2: nameOfFirstCar', (assert) => {
  assert.equal(nameOfFirstCar(CARS), 'Ferrari FF')
})

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

const _average = function (xs) {
  return reduce(add, 0, xs) / xs.length
} // <- leave be

const averageDollarValue = compose(_average, map(prop('dollar_value')))

QUnit.test('Ex3: averageDollarValue', (assert) => {
  assert.equal(averageDollarValue(CARS), 790700)
})

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

const _underscore = replace(/\W+/g, '_') //<-- leave this alone and use to sanitize

const sanitizeNames = map(compose(_underscore, toLower, prop('name')))

QUnit.test('Ex4: sanitizeNames', (assert) => {
  assert.deepEqual(sanitizeNames(CARS), [
    'ferrari_ff',
    'spyker_c12_zagato',
    'jaguar_xkr_s',
    'audi_r8',
    'aston_martin_one_77',
    'pagani_huayra'
  ])
})

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const availablePrices = compose(
  join(', '),
  map((x) => formatMoney(x.dollar_value)),
  filter(prop('in_stock'))
)

QUnit.test('Bonus 1: availablePrices', (assert) => {
  assert.deepEqual(availablePrices(CARS), '$700,000.00, $1,850,000.00')
})

// Bonus 2:
// ============
// Refactor to pointfree.

const fastestCar = function (cars) {
  const sorted = sortBy((car) => car.horsepower, cars)
  const fastest = last(sorted)
  return fastest.name + ' is the fastest'
}

QUnit.test('Bonus 2: fastestCar', (assert) => {
  assert.equal(fastestCar(CARS), 'Aston Martin One-77 is the fastest')
})
