# eslint-config-fhfe

[![npm version](https://badge.fury.io/js/eslint-config-fhfe.svg)](http://badge.fury.io/js/eslint-config-fhfe)

eslint-config-fhfe 是烽火 UED 前端组为了帮助保持团队的代码风格统一，发现代码潜在错误而定制出了友好的 ESLint 配置。

## 使用

- 项目中使用

    `npm install --save-dev eslint babel-eslint eslint-config-fhfe`

    在你的项目根目录下创建 .eslintrc.js，并将以下内容复制到文件中：

    ```javascript
    module.exports = {
        extends: [
            'eslint-config-fhfe',
        ],
        globals: {
            // 这里填入你的项目需要的全局变量
            // 这里值为 false 表示这个全局变量不允许被重新赋值
        rules: {
            // 这里填入你的项目需要的个性化配置
        }
    };
    ```
- vscode 中使用

    首先，打开 VSCode 扩展面板并搜索 ESLint 扩展，然后点击安装，安装完毕之后点击 `重新加载` 以激活扩展，但想要让扩展进行工作，我们还需要先进行 ESLint 的安装配置。

    - 如果你仅仅想让 ESLint 成为你项目构建系统的一部分，我们可以在项目根目录进行本地安装：

    `npm install eslint --save-dev`

    - 如果想使 ESLint 适用于你所有的项目，我们建议使用全局安装，使用全局安装 ESLint 后，你使用的任何 ESLint 插件或可分享的配置也都必须在全局安装。

    `npm install -g eslint`

    安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 `文件` > `首选项` > `设置` 打开 VSCode 配置文件

    从左侧系统设置中可以看到，ESLint 扩展默认已经启用，我们现在只需在右侧用户设置中添加配置来指定我们创建的 .eslintrc.js 配置文件路径即可启用自定义规则检测，ESLint 会查找并自动读取它们：

    ```javascript
    "eslint.options": {
        "configFile": "xxx/xxx/.eslintrc.js"
    },
    ```
- pre-commit 钩子

    如果项目使用了 git, 可以通过使用 pre-commit 钩子在每次提交前检测，如果检测失败则禁止提交。

    首先在package.json中添加script命令：
    ```json
    "scripts": {
    "eslint": "eslint --ext .js src"
    }
    ```
    安装 `pre-commit`
    ```
    npm install pre-commit --save-dev
    ```
    在package.json中配置 pre-commit 需要运行的命令：
    ```json
    "pre-commit": [
        "eslint"
    ]
    ```
    完成之后，在每次提交之前，都会运行 eslint 命令进行检测，如果检测到有违反代码规则的情况，则会返回 1，导致 git commit 失败。

- 代码自动修复

    在 [ESLint 规则](http://eslint.cn/docs/rules/) 列表页面，我们发现有些规则的旁边会带有一个橙色扳手图标，表示在执行 `eslint` 命令时指定 `--fix ` 参数可以自动修复该问题。

    ```javascript
    eslint test.js --fix
    ```

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

- no-mixed-spaces-and-tabs

    2 => 禁止混用空格和缩进

- array-element-newline

	0 => 数组里面的元素关闭强制换行

- camelcase

	2 => 变量命名需要以驼峰命名法，对属性字段不做限制

- comma-style

	2 => 逗号必须写在最后面

	```javascript
	correct
	/*eslint comma-style: ["error", "last"]*/
	var foo = 1,
		bar = 2;
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

- linebreak-style

    0 => 对换行符不限制

- max-depth

    2 => 代码块嵌套的深度禁止超过 5 层

- max-len

    2 => 单行最多允许 100 个字符, 对包含 url 的行不进行此限制

- max-lines

    0 => 不限制某个文件能够放置的最大代码行数，

- max-params

    2 => 函数的参数禁止超过 10 个

- multiline-ternary

    2 => 不限制三元算语句换行


- new-cap

    2 => 构造函数的必须以大写字母开头

- new-parens

    2 => new 后面类必须带上括号

- newline-per-chained-call

    0 => 不限制链式调用必须换行

- no-bitwise

    0 => 位操作，不进行限制

- no-continue

    0 => continue 语句的使用，不限制


- no-lonely-if

    0 => 允许单独使用 if 语句，而不配套使用 else、else if 等

- no-multiple-empty-lines

    0 => 连续空行，不限制

- no-negated-condition

    0 => if 里面不允许出现否定表达式， 不采纳

- no-nested-ternary

    0 => 允许三元表达式的嵌套使用

- no-plusplus

    0 => 允许使用 ++ 或 --

- no-underscore-dangle

    0 => 允许变量名中出现下划线

- object-curly-newline

    2 => 大括号内的首尾必须有换行

- object-property-newline

    0 => 对象字面量内的属性每行必须只有一个，不采纳
- one-var

    0 => 不采纳，声明变量时，禁止一条语句声明多个变量

- one-var-declaration-per-line

    0 => 不采纳，变量申明必须每行一个

- quotes

    2 => 必须使用单引号

- semi

    2 => 结尾必须有分号

- semi-style

    2 => 分号必须写在行尾，禁止在行首出现

- indent

	2 => 一个缩进必须用四个空格替代, switch 语句里面的 case 2 个空格 Tab 无法做到行内 行末代码或注释的对齐, 而空格啥都可以

- block-spacing

	2 => 代码块如果在一行，则大括号内的首尾必须有空格

	```
	correct 
    /*eslint class-methods-use-this: "error"*/
	function (a, b) { retur a + b; }
	```
- comma-spacing

	2 => 逗号后面强制要求加空格
	```javascript
	correct
	/*eslint comma-style: ["error", "last"]*/
	var foo = 1, bar = 2;
	```
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
- no-trailing-spaces

    2 => 禁止行尾部有空格

- no-whitespace-before-property

    2 => 禁止属性前有空格比如 foo. bar()

- semi-spacing

    2 => 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
- func-call-spacing

	2 => 函数名和执行它的括号之间禁止有空格
	```javascripr
	correct
	/*eslint func-call-spacing: ["error", "never"]*/
	fn();
	```
- space-before-blocks

    2 => if, function 等的大括号之前必须要有空格

- space-before-function-paren

    2 => function 的小括号前面必须有空格

- space-in-parens

    2 => 小括号内的首尾禁止有空格

- space-infix-ops

    2 => 操作符左右必须有空格, var str = 'HELLO' + 'FHUED'

- spaced-comment

    0 => 注释空格不限制

- capitalized-comments

	0 => 注释的首字母必须大写，对此不做限制

- no-inline-comments

    0 => 内联注释不限制

- line-comment-position

    0 => 注释的位置不进行限制

- lines-around-comment

    0 => 注释前后必须有空行不限制


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
- constructor-super

    2 => constructor 中必须有 super

- arrow-body-style

    0 => 箭头函数的返回值，应该允许灵活设置没必须一定用大括号写成多条语句

- arrow-parens

    0 => 箭头函数的参数必须用括号包裹起来，限制去掉。当只有一个参数时，没必要使用括号

- arrow-spacing

    2 => 箭头函数的箭头前后必须有空格

- generator-star-spacing

    2 => generator 的 * 前面禁止有空格，后面必须有空格

- no-class-assign

    2 => 禁止对定义过的 Class 重新赋值

- no-duplicate-imports

    2 => 禁止 import 重复模块

- no-var

    0 => 当前团队还有 es5 关闭禁止采用 var 去定义变量，必须使用 let 或者 const

- prefer-arrow-callback

    0 => 必须使用箭头函数作为回调，不采纳

- prefer-const

    1 => 变量如果没有发生修改，则必须使用 const 进行命名

- prefer-destructuring

    0 => 强制使用结构的限制，不采纳

- prefer-destructuring

    1 => 建议强制使用模板字符串

- template-curly-spacing

    2 => 模板字符串内的首尾禁止有空格

- rest-spread-spacing

    2 => ... 的后面禁止有空格

- sort-imports

    0 => import 的排序不用限制
- 

    2 => 模板字符串内的首尾禁止有空格

- yield-star-spacing

    2 => yield* 后面必须加空格

- no-const-assign

    2 => 禁止对使用 const 定义的常量重新赋值

- no-dupe-class-members

    2 => 禁止重复定义类

		