const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require('tapable')

const hook = new AsyncSeriesWaterfallHook(["author", "age"]);

console.time("time");

hook.tapAsync("测试1", (param1, param2, callback) => {
  console.log("测试1接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, '测试1传递的参数');
  }, 1000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, '测试2传递的参数');
  }, 2000)
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, '测试3传递的参数');
  }, 3000)
});

hook.callAsync("jett", "99", (err, result) => {
  console.log("这是成功后的回调", err, result);
  console.timeEnd("time");
});

/*
const hook = new SyncLoopHook([]); //先实例化，并定义回调函数的形参

let count = 5;

//通过tap函数注册事件
hook.tap("测试1", () => {
  console.log("测试1里面的count:", count);
  if ([1, 2, 3].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

hook.tap("测试2", () => {
  console.log("测试2里面的count:", count);
  if ([1, 2].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

hook.tap("测试3", () => {
  console.log("测试3里面的count:", count);
  if ([1].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

hook.call();
*/

/*
const syncHook = new SyncWaterfallHook(['author', 'age'])

syncHook.tap('listener1', (p1, p2) => {
  console.log('listener1', p1, p2)
  return '111'
})

syncHook.tap('listener2', (p1, p2) => {
  console.log('listener2', p1, p2)
  return '222'
})

syncHook.tap('listener3', (p1, p2) => {
  console.log('listener3', p1, p2)
  return '333'
})

syncHook.call('jett', 18)
*/

/*
const syncHook = new SyncHook(['author'])

syncHook.tap('listener1', name => {
  console.log('listener1', name)
})

syncHook.tap('listener2', name => {
  console.log('listener2', name)
})

syncHook.call('呵呵')
*/

/*
const syncHook = new SyncBailHook(['author'])

syncHook.tap('listener1', name => {
  console.log('listener1', name)
})

syncHook.tap('listener2', name => {
  console.log('listener2', name)
  return '111'
})

syncHook.tap('listener3', name => {
  console.log('listener3', name)
})

syncHook.call('呵呵')
*/
