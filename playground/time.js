const moment = require('moment');
const date = moment();
// console.log(date.getMonth());

/* console.log(date.format());
date.add(1, 'years').subtract(6, 'months');
console.log(date.format('MMM Do, YYYY')); */

// Time format 15:34 pm
const someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
console.log(date.format('h:mm a'))
