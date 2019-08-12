
// a Promise is an object that represents an intermediate state of an operation
// — in effect, a promise that a result of some kind will be returned at some point
// in the future. There is no guarantee of exactly when the operation will complete
// and the result will be returned, but there is a guarantee that when the result
// is available, or the promise fails, the code you provide will be executed
// in order to do something else with a successful result, or to gracefully handle
// a failure case.


// Making asynchronous programming easier with async and await
async function hello() {
    return "Hello using promise";
}
async function helloRet() {
    return "Hello using promise Ret";
}
console.log("this exe before at the first");

hello().then((value) => console.log(value));
helloRet().then(console.log);


helloRet((ret)=>{
  console.log(ret);
})

console.log(hello());

console.log('a' + 'b');
