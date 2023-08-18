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

// creats the userName form owner name
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(word => word[0]).join
      ("");
  })
}
createUserName(accounts)


// displays all transasctions
function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal"
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`

    containerApp.style.opacity = 100;

    // clear login input filds
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();


    containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}

// displays total balance in the account
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = `${acc.balance} EUR`
}

// Displays Income outcome and intrest
const calcDisplaySummary = function (acc) {
  const movements = acc.movements;
  const income = movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${income} Eur`;
  const outCome = movements.filter(mov => mov < 0).reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${outCome} Eur`;

  const intrest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(intrest => intrest >= 1)
    .reduce((acc, curr) => acc + curr, 0)
  labelSumInterest.textContent = `${intrest} Eur`;
}

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements)

  // display current balance
  calcDisplayBalance(acc)

  // display summary
  calcDisplaySummary(acc)
}



// Login functionality
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin?.value)) {

    // if all correct ->
    console.log("Login Succesfull");
    console.log(currentAccount);

    // display welcome message

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

    updateUI(currentAccount);


  } else {
    // Hide UI
    containerApp.style.opacity = 0;
  }
})


// Transfer to another account
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(acc => acc.userName === inputTransferTo.value)

  console.log(amount, reciverAccount);

  if (amount > 0 &&
    reciverAccount &&
    amount <= currentAccount.balance &&
    reciverAccount?.userName !== currentAccount.userName) {
    console.log("Transfer Valid");

    // transfer
    currentAccount.movements.push(-amount)
    reciverAccount.movements.push(amount)

    updateUI(currentAccount)
  }

  inputTransferAmount.value = inputTransferTo.value = ""
})


// Delete account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {

    const index = accounts.findIndex(acc => acc.userName === inputCloseUsername.value)
    accounts.splice(index, 1)
    // console.log(accounts);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = ""
})

// requesting Loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 &&
    currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount)
    updateUI(currentAccount)
  }

  // clear input
  inputLoanAmount.value = ""
})

// sort values
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, sorted)
  sorted = !sorted
})















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

// const calcAverageHumanAge = (dogsAge) => {
//   const newage = dogsAge.map((age) => age <= 2 ? 2 * age : 16 + age * 4)
//     .filter(age => age >= 18)
//     .reduce((acc, curr, i, arr) => (acc + curr / arr.length), 0);
//   return newage;
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]))

/////////////////////////////////////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithdrawal = movements.find(mov => mov < 0)
// console.log(movements);
// console.log(firstWithdrawal);

// const account = accounts.find(mov => mov.owner === 'Jessica Davis')
// // console.log(account);

// for (const value of accounts) {
//   if (value.owner === 'Jessica Davis') {
//     console.log(value);;
//   }
// }

//////////////////////////////////////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // // console.log(movements.includes(3000));

// // const anyDeposits = movements.some(mov => mov > 0)
// // console.log(anyDeposits);

// const tryEvery = account4.movements.every(mov => mov > 0)
// console.log(tryEvery);

/////////////////////////////////////////////////////////////////////////////////

// const arr = [[[1, 2], 3], [[4], 5], 6, 7];
// // console.log(arr.flat())

// const totalBalanceInAllAccounts =
//   accounts
//     .map(acc => acc.movements)
//     .flat()
//     .reduce((acc, curr) => acc + curr)
// console.log(totalBalanceInAllAccounts);

// const totalBalanceInAllAccountsFlatMap =
//   accounts
//     .flatMap(acc => acc.movements)
//     .reduce((acc, curr) => acc + curr)

// console.log(totalBalanceInAllAccountsFlatMap);

////////////////////////////////////////////////////////////////////////////////////

// const arr = [3, 5, 2, 3, 1, 6, 2, -1, -45, -2, 45, 90];
// const chars = ['a', 'f', 's', 'h', 'z', 'y', 'n', 'w']
// chars.sort()
// // arr.sort((a, b) => a > b ? 1 : -1)
// arr.sort((a, b) => a - b)
// console.log(arr);


// const newArr = [0, 1, 2, 3, 4, 5]
// newArr.fill(90, 2, 4)
// console.log(newArr);

// const y = Array.from({ length: 5 }, (_, index) => index + 1)
// console.log(y);



labelBalance.addEventListener('click', () => {

  // Example - 1
  // const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
  // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ""))));

  // Example - 2
  // NOTE: Arrays.from(condition to make array, mapping call back)
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
    (el => Number(el.textContent.replace('€', ""))));
  console.log(movementsUI);
})