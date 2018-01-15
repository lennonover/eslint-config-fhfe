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
- block-scoped-var
    
    2 => 针对 var 声明当成块状作用域 防止变量提升导致的 bug

- dot-location

		 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
- curly

		 if 后面必须要有 {，除非是单行 if
- eqeqeq

		 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外

- guard-for-in

	1 => for in 内部没有 hasOwnProperty 给出警告
	```javascript
	incorrect 
	/*eslint guard-for-in: "error"*/
	for (key in foo) {
		doSomething(key);
	}
	```
	```javascript
	correct
	/*eslint guard-for-in: "error"*/
	for (key in foo) {
		if (Object.prototype.hasOwnProperty.call(foo, key)) {
			doSomething(key);
		}
		if ({}.hasOwnProperty.call(foo, key)) {
			doSomething(key);
		}
	}
	```

- complexity

    0 => 关闭代码复杂度限制

- default-case

    2 => switch case 语句里面一定需要 default 分支

- no-fallthrough

	2 => switch 的 case 内必须有 break, return 或 throw

- no-alert

    1 => 代码中使用了 alert 给出警告

- no-debugge

    2 => 禁止使用 debugger

- no-empty-function

    2 => 禁止用空函数，除非在空函数里面给出注释说明

- no-eq-null

    0 => 允许 foo == null 用于判断 foo 不是 undefined 并且不是 null

- no-eval

    2 => 不允许使用 eval

- no-extend-native

    2 => 禁止修改原生对象

- no-dupe-args

	2 => 禁止在函数参数中出现重复名称的参数

- no-dupe-keys

	2 => 禁止在对象字面量中出现重复名称的键名
	
- no-empty

		 禁止出现空代码块

- no-empty-character-class

	2 => 禁止在正则表达式中使用空的字符集 []

- no-ex-assign

	2 => 禁止函数表达式中出现多余的括号

- no-extra-semi

	2 => 禁止出现多余的分号

- no-loop-func

	2 => 禁止在循环内的函数中出现循环体条件语句中定义的变量

- no-new

	2 => 禁止直接 new 一个类而不赋值

- no-redeclare

	2 => 禁止重复定义变量

- no-return-assign

	2 => 禁止在 return 语句里赋值

- no-useless-call

	2 => 禁止出现没必要的 call 或 apply

- array-bracket-newline

	0 => 数组前后括号不必须换行

- array-bracket-spacing

	2 => 数组的括号前后禁止有空格

- array-element-newline

	0 => 数组里面的元素关闭强制换行

- block-spacing

	2 => 代码块如果在一行，则大括号内的首尾必须有空格

	```
	correct 
    /*eslint class-methods-use-this: "error"*/
	function (a, b) { retur a + b; }
	```

- camelcase

	2 => 变量命名需要以驼峰命名法，对属性字段不做限制

- capitalized-comments

	0 => 注释的首字母必须大写，对此不做限制

- comma-spacing

	2 => 逗号后面强制要求加空格
	```javascript
	correct
	/*eslint comma-style: ["error", "last"]*/
	var foo = 1, bar = 2;
	```

- comma-style

	2 => 逗号必须写在最后面

	```javascript
	correct
	/*eslint comma-style: ["error", "last"]*/
	var foo = 1,
		bar = 2;
	```

- func-call-spacing

	2 => 函数名和执行它的括号之间禁止有空格
	```javascripr
	correct
	/*eslint func-call-spacing: ["error", "never"]*/
	fn();
	```

- func-name-matching

	0 => 函数赋值给变量时，函数名必须和赋值的变量名一致的限制不采纳

- func-names

	0 => 不限制匿名函数的命名问题

- id-blacklist

	0 => 变量黑名单，不采纳

- id-length

	0 => 变量命名长度不做限制

- id-match

	2 => 变量命令的字符需要在某个正则匹配规则里面，不采纳

- indent

	2 => 一个缩进必须用四个空格替代, switch 语句里面的 case 2 个空格 Tab 无法做到行内 行末代码或注释的对齐, 而空格啥都可以


- key-spacing

	2 => 对象字面量中冒号前面禁止有空格，后面必须有空格

- keyword-spacing

	2 => 关键字前后必须要加上空格

    ```javascript
    /*eslint keyword-spacing: ["error", { "before": true } , { "after": true }]*/
    correct
    if (foo) {
        // ...
    }
    ```
    
- class-methods-use-this

    2 => 要求在 Class 里面合理使用 this，如果某个方法没有使用 this, 则应该申明为静态方法
    ```javascript
    incorrect 
    /*eslint class-methods-use-this: "error"*/
    /*eslint-env es6*/
    class A {
        foo() {
            console.log("Hello World");     /*error Expected 'this' to be used by class method 'foo'.*/
        }
    }
    ```
    ```javascript
    correct 
    /*eslint class-methods-use-this: "error"*/
    /*eslint-env es6*/
    class A {
        foo() {
            this.bar = "Hello World"; // OK, this is used
        }
    }

    class A {
        constructor() {
            // OK. constructor is exempt
        }
    }

    class A {
        static foo() {
            // OK. static methods aren't expected to use this.
        }
    }
    ```
-
		