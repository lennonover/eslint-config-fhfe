# eslint-config-fhfe

## 规则

0 => off   => 表示禁用这条规则        
1 => warn  => 表示仅给出警告，并不会导致检查不通过     
2 => error => 会导致检查不通过报错   

- no-console

    0 => 允许console 进行代码调试

- for-direction

    2 => for 循环的方向要求必须正确
    
    ```javascript
    incorrect 
    /*eslint for-direction: "error"*/
    for (var i = 0; i < 10; i--) {
    }

    for (var i = 10; i >= 0; i++) {
    }
    ```
    ```javascript
    correct 
    /*eslint for-direction: "error"*/
    for (var i = 0; i < 10; i++) {
    }
    ```
- accessor-pairs

    2 => 有 setter 的地方必须有 getter，有 getter 的地方可以没有 setter
    
- getter-return

    [2, {allowImplicit: false}] => getter 必须有返回值

- no-await-in-loop

    1 => 允许在循环中出现 await 是为了限制无法同时发送多个异步请求 这里不建议使用 await 但是如果设为不允许太严格了

    ```javascript
    incorrect 
    async function foo(things) {
        const results = [];
        for (const thing of things) {
            // Bad: each loop iteration is delayed until the entire asynchronous operation completes
            results.push(await bar(thing));
        }
        return baz(results);
    }
    ```
    ```javascript
    correct 
    async function foo(things) {
        const results = [];
        for (const thing of things) {
            // Good: all asynchronous operations are immediately started.
            results.push(bar(thing));
        }
        // Now that all the asynchronous operations are running, here we wait until they all complete.
        return baz(await Promise.all(results));
    }
    ```
- no-prototype-builtins

    1 => 直接调用对象原型链上的方法

    ```javascript
    incorrect 
    /*eslint no-prototype-builtins: "error"*/
    var hasBarProperty = foo.hasOwnProperty("bar");
    var isPrototypeOfBar = foo.isPrototypeOf(bar);
    var barIsEnumerable = foo.propertyIsEnumerable("bar");
    ```
    ```javascript
    correct 
    /*eslint no-prototype-builtins: "error"*/
    var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");
    var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);
    var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
    ```
- valid-jsdoc

    0 => 关闭函数注释一定要遵守 jsdoc 规则
    ```javascript
    标准的 jsDoc
    /**
     * Add two numbers.
     * @param {number} num1 The first number.
     * @param {number} num2 The second number.
     * @returns {number} The sum of the two numbers.
     */
    function add(num1, num2) {
        return num1 + num2;
    }
    ```
- array-callback-return

    2 => 对于数据相关操作函数比如 map, filter 等，callback 必须有 return
    ```javascript
    incorrect 
    /*eslint array-callback-return: "error"*/
    var indexMap = myArray.reduce(function(memo, item, index) {
        memo[item] = index;
    }, {});
    var foo = Array.from(nodes, function(node) {
        if (node.tagName === "DIV") {
            return true;
        }
    });
    var bar = foo.filter(function(x) {
        if (x) {
            return true;
        } else {
            return;
        }
    });
    ```
    ```javascript
    correct 
    /*eslint array-callback-return: "error"*/
    var indexMap = myArray.reduce(function(memo, item, index) {
        memo[item] = index;
        return memo;
    }, {});
    var foo = Array.from(nodes, function(node) {
        if (node.tagName === "DIV") {
            return true;
        }
        return false;
    });
    var bar = foo.map(node => node.getAttribute("id"));
    ```