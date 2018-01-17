module.exports = {
    // 使用非默认的 babel-eslint 作为代码解析器
    parser: 'babel-eslint',
    // 指定程序的目标环境
    'env': {
        'browser': true,
        'commonjs': false,
        'jquery': true,
        'es6': true
    },
    // esLint 规则默认开启
    // 'extends': 'eslint:recommended',
    // 预定义的全局变量
    'globals': {

    },
    'parserOptions': {
        // ECMAScript 的版本
        'ecmaVersion': 5,
        // 指定被检查的文件是什么扩展名的 可选项'script'和'module'
        'sourceType': 'script',
        // 附加特性的对象
        'ecmaFeatures': {

        }
    },
    // 对于某个文件使用哪个配置文件，按照以下顺序查找
    // 1. 在待检测文件的同一目录查找配置文件
    // 2. 往上逐层父级目录查找，直到发现一个有 "root": true 的
    // 3. 使用项目根目录配置文件
    // 4. 使用系统全局配置文件
    // 所以表示 以当前目录为根目录，不再向上查找 .eslintrc.js
    'root': true,
    'rules': {

        // 0 => off   => 表示禁用这条规则
        // 1 => warn  => 表示仅给出警告，并不会导致检查不通过
        // 2 => error => 会导致检查不通过报错

        //----------------base--------------------------
        //  允许使用 console 进行代码调试
        'no-console': 0,
        // for 循环的方向要求必须正确
        'for-direction': 2,
        // 有 setter 的地方必须有 getter，有 getter 的地方可以没有 setter
        'accessor-pairs': [
            2,
            {
                setWithoutGet: true,
                getWithoutSet: false
            }
        ],
        // getter 必须有返回值，并且禁止返回值为 undefined;
        'getter-return': [2, {allowImplicit: false}],
        // 允许在循环中出现 await
        'no-await-in-loop': 1,
        // 直接调用对象原型链上的方法
        'no-prototype-builtins': 1,
        // 关闭函数注释一定要遵守 jsdoc 规则
        'valid-jsdoc': 0,
        // 对于数据相关操作函数比如 map, filter 等，callback 必须有 return
        'array-callback-return': 2,
        // 针对 var 声明当成块状作用域 防止变量提升导致的 bug
        'block-scoped-var': 2,
        // 关闭代码复杂度限制
        'complexity': 0,
        // 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
        'dot-location': [
            2,
            'property'
        ],
        // if 后面必须要有 {，除非是单行 if
        'curly': [
            2,
            'multi-line',
            'consistent'
        ],
        // 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [
            2,
            'always',
            {
                null: 'ignore'
            }
        ],
        // for in 内部没有 hasOwnProperty 给出警告
        'guard-for-in': 1,
        // switch case 语句里面一定需要 default
        'default-case': 2,
        // switch 的 case 内必须有 break, return 或 throw
        'no-fallthrough': 2,
        // 代码中使用了 alert 给出警告
        'no-alert': 1,
        // 禁止使用 debugger
        'no-debugger': 2,
        // 禁止用空函数，除非在空函数里面给出注释说明
        'no-empty-function': 2,
        // 允许 foo == null 用于判断 foo 不是 undefined 并且不是 null
        'no-eq-null': 0,
        // 禁止使用 eval
        'no-eval': 2,
        // 禁止修改原生对象
        'no-extend-native': 2,
        // 禁止在函数参数中出现重复名称的参数
        'no-dupe-args': 2,
        // 禁止在对象字面量中出现重复名称的键名
        'no-dupe-keys': 2,
        // 禁止出现空代码块
        'no-empty': [
            2,
            {
                allowEmptyCatch: true
            }
        ],
        // 禁止在正则表达式中使用空的字符集 []
        'no-empty-character-class': 2,
        // 禁止将 catch 的第一个参数 error 重新赋值
        'no-ex-assign': 2,
        // 禁止函数表达式中出现多余的括号
        'no-extra-parens': [
            2,
            'functions'
        ],
        // 禁止出现多余的分号
        'no-extra-semi': 2,
        // 禁止在循环内的函数中出现循环体条件语句中定义的变量
        'no-loop-func': 2,
        // 禁止直接 new 一个类而不赋值
        'no-new': 2,
        // 禁止重复定义变量
        'no-redeclare': 2,
        // 禁止在 return 语句里赋值
        'no-return-assign': [
            2,
            'always'
        ],
        // 禁止出现没必要的 call 或 apply
        'no-useless-call': 2,

        // ----------------风格-------------------------
        // 数组前后括号不必须换行
        'array-bracket-newline': 0,
        // 数组里面的元素关闭强制换行
        'array-element-newline': 0,
        // 变量命名需要以驼峰命名法，对属性字段不做限制
        'camelcase': [
            2,
            {properties: 'never'}
        ],
        // 逗号必须写在最后面
        'comma-style': [
            2,
            'last'
        ],
        // 函数赋值给变量时，函数名必须和赋值的变量名一致的限制不采纳
        'func-name-matching': 0,
        // 不限制匿名函数的命名问题
        'func-names': 0,
        // 变量黑名单，不采纳
        'id-blacklist': 0,
        // 变量命名长度不做限制
        'id-length': 0,
        // 变量命令的字符需要在某个正则匹配规则里面，不采纳
        'id-match': 0,
        // 对换行符不限制
        'linebreak-style': 0,
        // 代码块嵌套的深度禁止超过 5 层
        'max-depth': [
            2,
            5
        ],
        // 单行最多允许 100 个字符, 对包含 url 的行不进行此限制
        'max-len': [
            2,
            {
                code: 100,
                tabWidth: 2,
                ignoreUrls: true
            }
        ],
        // 不限制某个文件能够放置的最大代码行数
        'max-lines': 0,
        // 函数的参数禁止超过 10 个
        'max-params': [2, 10],
        // 不限制三元算语句换行
        'multiline-ternary': 0,
        // 构造函数的必须以大写字母开头
        'new-cap': 2,
        // new 后面类必须带上括号
        'new-parens': 2,
        // 不限制链式调用必须换行
        'newline-per-chained-call': 0,
        // 位操作，不进行限制
        'no-bitwise': 0,
        // continue 语句的使用，不限制
        'no-continue': 0,
        // 允许单独使用 if 语句，而不配套使用 else、else if 等
        'no-lonely-if': 0,
        // 连续空行，不限制
        'no-multiple-empty-lines': 0,
        // if 里面不允许出现否定表达式， 不采纳
        'no-negated-condition': 0,
        // 允许三元表达式的嵌套使用
        'no-nested-ternary': 0,
        // 允许使用 ++ 或 --
        'no-plusplus': 0,
        // 允许变量名中出现下划线
        'no-underscore-dangle': 0,
        // 大括号内的首尾必须有换行
        'object-curly-newline': [
            2,
            {
                multiline: true,
                consistent: true
            }
        ],
        // 对象字面量内的属性每行必须只有一个，不采纳
        'object-property-newline': 0,
        // 声明变量时，禁止一条语句声明多个变量
        'one-var': [0, {
            var: 'never',
            let: 'never',
            const: 'never',
        }],
        // 变量申明必须每行一个
        'one-var-declaration-per-line': [0, 'always'],
        // 必须使用单引号
        'quotes': [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        // 结尾必须有分号
        'semi': 2,
        // 分号必须写在行尾，禁止在行首出现
        'semi-style': [2, 'last'],
        //--------------------风格 空格---------------------------
        // 一个缩进必须用四个空格替代, switch 语句里面的 case 2 个空格
        'indent': [
            2,
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ],
        // 代码块如果在一行，则大括号内的首尾必须有空格
        'block-spacing': [
            2,
            'always'
        ],
        // 逗号后面强制要求加空格
        'comma-spacing': 2,
        // 对象字面量中冒号前面禁止有空格，后面必须有空格
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true,
                mode: 'strict',
            }
        ],
        // 关键字前后必须要加上空格
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 禁止行尾部有空格
        'no-trailing-spaces': 2,
        // 禁止属性前有空格，比如 foo. bar()
        'no-whitespace-before-property': 2,
        // 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 函数名和执行它的括号之间禁止有空格
        'func-call-spacing': [2, 'never'],
        // if, function 等的大括号之前必须要有空格
        'space-before-blocks': [2, 'always'],
        // function 的小括号前面必须有空格
        'space-before-function-paren': [
            2,
            {
                'anonymous': 'always',
                'named': 'always',
                'asyncArrow': 'always'
            }
        ],
        // 小括号内的首尾禁止有空格
        'space-in-parens': [2, 'never'],
        // 操作符左右必须有空格, var str = 'HELLO' + 'FHUED';
        'space-infix-ops': 2,
        // 数组的括号前后禁止有空格
        'array-bracket-spacing': [2, 'never'],
        // 禁止混用空格和缩进
        'no-mixed-spaces-and-tabs': 2,
        //--------------------风格 注释---------------------------
        // 注释空格不限制
        'spaced-comment': 0,
        // 注释的首字母必须大写，对此不做限制
        'capitalized-comments': 0,
        // 内联注释不限制
        'no-inline-comments': 0,
        // 注释的位置不进行限制
        'line-comment-position': 0,
        // 注释前后必须有空行不限制
        'lines-around-comment': 0,


        //-----------------ES6--------------------------
        // 要求在 Class 里面合理使用 this，如果某个方法没有使用 this, 则应该申明为静态方法
        'class-methods-use-this': 2,
        // constructor 中必须有 super
        'constructor-super': 2,
        // 箭头函数的返回值，应该允许灵活设置没必须一定用大括号写成多条语句
        'arrow-body-style': 0,
        // 箭头函数的参数必须用括号包裹起来，限制去掉。当只有一个参数时，没必要使用括号
        'arrow-parens': 0,
        // 箭头函数的箭头前后必须有空格
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // generator 的 * 前面禁止有空格，后面必须有空格
        'generator-star-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 禁止 import 重复模块
        'no-duplicate-imports': 2,
        // 当前团队还有 es5 关闭禁止采用 var 去定义变量，必须使用 let 或者 const
        'no-var': 0,
        // 必须使用箭头函数作为回调，不采纳
        'prefer-arrow-callback': 0,
        // 变量如果没有发生修改，则必须使用 const 进行命名
        'prefer-const': 1,
        // 禁止对使用 const 定义的常量重新赋值
        'no-const-assign': 2,
        // 禁止重复定义类
        'no-dupe-class-members': 2,
        // 强制使用结构的限制，不采纳
        'prefer-destructuring': 0,
        // 建议强制使用模板字符串
        'prefer-template': 1,
        // 模板字符串内的首尾禁止有空格
        'template-curly-spacing': [2, 'never'],
        //  ... 的后面禁止有空格
        'rest-spread-spacing': [2, 'never'],
        // import 的排序不用限制
        'sort-imports': 0,
        // yield* 后面必须加空格
        'yield-star-spacing': [2, 'after']
    }
};