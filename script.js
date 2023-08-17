'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function displayMovements(movements) {
  containerMovements.innerHTML = ''


  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal"
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`

    containerMovements.insertAdjacentHTML('beforeend', html)
  })
}
displayMovements(account1.movements)

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = `${balance} EUR`
}
calcDisplayBalance(account1.movements)


const calcDisplaySummary = function (movements) {

  const income = movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${income}💸`;
  const outCome = movements.filter(mov => mov < 0).reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${outCome}💸`;

  const intrest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 1.2 / 100)
    .filter(intrest => intrest >= 1)
    .reduce((acc, curr) => acc + curr, 0)
  labelSumInterest.textContent = `${intrest}💸`;
}

calcDisplaySummary(account1.movements)




const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(word => word[0]).join
      ("");
  })
}
createUserName(accounts)














/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// let arr = ['a', 'b', 'c', 'd', 'e', 'f']
// console.log(arr.slice(2));

// console.log(arr);
// console.log(arr.splice(1, 5));
// console.log(arr);

// arr = ['a', 'b', 'c', 'd', 'e', 'f']
// let arr2 = ['g', 'h', 'i', 'j', 'k']

// // arr.reverse()
// // console.log(arr);

// const latters = arr.concat(arr)
// console.log(latters);

// console.log(latters.join('.'));

// const nums = [23, 46, 12, 78, 12, 345]

// console.log(nums.at(0));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const x of movements) {
//   if (x > 0) {
//     console.log(`You deposite ${x}`);
//   } else {
//     console.log(`You Withdraw ${Math.abs(x)}`);
//   }
// }

// movements.forEach(function (x, i, arr) {
//   x > 0 ?
//     console.log(`move ${i + 1} deposite ${x}`) :
//     console.log(`move ${i + 1} withdraw ${Math.abs(x)}`);
// })

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log();
// })

// const mySet = new Set([12, 23, 12, 34, 12, 34, 23, 34, 23, 12])

// console.log(mySet);

// mySet.forEach(function (x, i, sets) {
//   console.log(i);
// })

/////////////////////////////////////////////////////////////////////////////

// Coding Challenge - 1

// const dogsJulia = [3, 5, 2, 12, 7]
// const dogsKate = [4, 1, 15, 8, 3]

// function checkDogs(dogs1, dogs2) {

//   const copyDogs1 = [...dogs1].splice(1, 2)
//   const allDogs = [...copyDogs1, ...dogs2]
//   // console.log(allDogs);
//   allDogs.forEach(function (x, i) {
//     x >= 3 ?
//       console.log(`Dog number ${i + 1} is an adult, and is ${x} years old`) :
//       console.log(`Dog number ${i + 1} is still a puppy`);
//   })
// }

// checkDogs(dogsJulia, dogsKate)

//////////////////////////////////////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1

// // const movementsUsd = movements.map(function (mov) {
// //   return Math.trunc(mov * eurToUsd)
// // })
// const movementsUsd = movements.map(mov => Math.trunc(mov * eurToUsd))
// console.log(movementsUsd);

// const movementsDiscriptons = movements.map((mov, i, arr) => {
//   return `move ${i + 1}: You${mov > 0 ? "deposite" : "withdraw"} ${Math.abs(mov)}`
// })

// console.log(movementsDiscriptons);

//////////////////////////////////////////////////////////////////////////////////

// console.log(movements);
// const deposits = movements.filter(mov => mov >= 0)
// const withdrawals = movements.filter(mov => mov < 0)
// console.log(withdrawals);

///////////////////////////////////////////////////////////////////////////////////

// console.log(movements);

// const totalBalance = movements.reduce((acc, mov) => acc + mov, 0)
// console.log(totalBalance);


// maximum

// const maxNum = movements.reduce((acc, curr) => Math.max(acc, curr))
// const maxNum = movements.reduce((acc, curr) => acc > curr ? acc : curr)

// console.log(maxNum);
/////////////////////////////////////////////////////////////////////////////////

// Coding Challenge - 2

// const dogsJulia = [5, 2, 4, 1, 15, 8, 3]
// const dogsKate = [4, 1, 15, 8, 3]

// // let humanAgeJulia;

// function calcAverageHumanAge(dogsAge) {
//   const humanAgeJulia = dogsAge.map((age) => age <= 2 ? 2 * age : 16 + age * 4)

//   const adults = humanAgeJulia.filter(age => age >= 18)

//   const avgAdultHumanAge = adults.reduce((acc, curr) => (acc + curr), 0) / adults.length;
//   return avgAdultHumanAge;
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]))

/////////////////////////////////////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1

// const totalUSDAmount = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, curr) => acc + curr)

// console.log(totalUSDAmount);

////////////////////////////////////////////////////////////////////////////////

// Coding Challenge - 3

const calcAverageHumanAge = (dogsAge) => (
  dogsAge
    .map(age => age <= 2 ? 2 * age : 16 + age * 4)
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => (acc + curr / arr.length, 0)
    )
)

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]))

///////////////////////////////////////////////////////////////////////////////
