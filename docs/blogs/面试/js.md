# js相关

## promise优势
1. 解决回调地狱问题（链式调用）
2. 统一的错误处理机制（可以通过 `.catch()` 捕获链中任何一步的错误）
3. 更好的异步操作控制（`Promise` 提供了多种静态方法（如 `Promise.all` 、 `Promise.race` 等），可以更灵活地控制多个异步操作）
4. 状态明确(一旦状态改变，就不会再变，这使得异步操作的结果可预测)

## promise缺点
1. 无法取消 `Promise` ，一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数， `Promise` 内部抛出的错误，不会反应到外部
3. 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

## promise为什么支持链式调用

### 1. then方法返回新的Promise对象
Promise的 then 方法本身会返回一个 新的Promise对象 ，而不是返回this（原Promise）。这是链式调用的基础
### 2. 返回值会被自动包装成Promise
then 方法的回调函数返回的任何值都会被自动包装成一个Promise：

- 如果回调函数返回一个值，那么 then 返回的Promise将会以该值被解决（resolved）
- 如果回调函数返回一个Promise，那么 then 返回的Promise将跟随这个Promise的状态
- 如果回调函数抛出异常，那么 then 返回的Promise将以该异常被拒绝（rejected）
```js
Promise.resolve(1)
  .then(value => {
    console.log(value); // 1
    return value + 1;   // 返回普通值，会被包装成Promise.resolve(2)
  })
  .then(value => {
    console.log(value); // 2
    return Promise.resolve(value + 1); // 返回Promise
  })
  .then(value => {
    console.log(value); // 3
    throw new Error('出错了'); // 抛出异常
  })
  .catch(error => {
    console.error(error.message); // "出错了"
  });
```
### 3. Promise状态传递机制
每个新Promise的状态取决于前一个Promise的处理结果：

- 如果前一个Promise成功解决，则调用 then 中的第一个回调函数
- 如果前一个Promise被拒绝，则调用 then 中的第二个回调函数或 catch 中的回调函数
这种状态传递机制确保了异步操作可以按顺序执行。
### 4. 异步操作的顺序控制
链式调用允许我们按顺序执行异步操作，每一步都依赖于前一步的结果：
```js
fetchUserData(userId)
  .then(userData => {
    // 使用用户数据获取该用户的订单
    return fetchUserOrders(userData.orderId);
  })
  .then(orders => {
    // 使用订单信息获取订单详情
    return fetchOrderDetails(orders[0].id);
  })
  .then(details => {
    // 处理订单详情
    console.log(details);
  })
  .catch(error => {
    // 统一处理错误
    console.error('处理过程中出错:', error);
  });
```
通过这种机制，Promise能够优雅地支持链式调用，使异步代码更加清晰和易于维护，有效避免了回调地狱问题。
## promise静态方法
1. Promise.resolve()
2. Promise.reject()
3. Promise.all()
4. Promise.race()
5. Promise.allSettled() (ES2020)

接收一个Promise数组，返回一个新的Promise。该Promise在所有输入的Promise都已完成（无论成功或失败）后解决，结果是一个对象数组，每个对象表示对应的Promise结果。
```js
const promise1 = Promise.resolve('成功');
const promise2 = Promise.reject('失败');
const promise3 = new Promise(resolve => setTimeout(() => resolve('延迟成功'), 1000));

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log(results);
    // 输出:
    // [
    //   { status: 'fulfilled', value: '成功' },
    //   { status: 'rejected', reason: '失败' },
    //   { status: 'fulfilled', value: '延迟成功' }
    // ]
  });
```
6. Promise.any() （ES2021）

接收一个Promise数组，返回一个新的Promise。一旦数组中的任何一个Promise成功，返回的Promise就会成功；如果所有Promise都失败，则返回的Promise会失败，并带有AggregateError。
```js
const promise1 = Promise.reject('失败1');
const promise2 = new Promise(resolve => setTimeout(() => resolve('成功'), 1000));
const promise3 = Promise.reject('失败3');

Promise.any([promise1, promise2, promise3])
  .then(result => {
    console.log(result); // 输出: '成功'
  })
  .catch(error => {
    console.error(error); // 如果所有Promise都失败，这里会捕获AggregateError
  });
```
7. Promise.withResolvers() （ES2024）

创建一个Promise及其resolve和reject函数，并将它们作为对象的属性返回
```js
// 传统方式
let resolveFunction, rejectFunction;
const promise = new Promise((resolve, reject) => {
  resolveFunction = resolve;
  rejectFunction = reject;
});

// 使用withResolvers
const { promise, resolve, reject } = Promise.withResolvers();

// 现在可以直接使用resolve和reject函数
setTimeout(() => resolve('完成'), 1000);

promise.then(result => {
  console.log(result); // 输出: '完成'
});
```
## async和 await

## this指向
## 深拷贝和浅拷贝
## 原型和原型链
## 闭包
## 防抖和节流
## 事件循环
