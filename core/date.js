const now = new Date();

const today = now.toUTCString();
const time = now.toLocaleTimeString();
console.log(today)
console.log(time)
console.log(now.toLocaleString());