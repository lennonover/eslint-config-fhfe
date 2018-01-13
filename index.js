module.exports = {
    // 指定程序的目标环境
    "env": {
        "browser": true,
        "commonjs": false,
        "jquery":true,
        "es6": false
    },
    // esLint 规则默认开启
    "extends": "eslint:recommended",
    // 预定义的全局变量
    "globals": {

    },
    "parserOptions": {
        // ECMAScript 的版本
        "ecmaVersion": 5,
        // 指定被检查的文件是什么扩展名的 可选项"script"和"module"
        "sourceType": "script",
        // 附加特性的对象
        "ecmaFeatures": {

        }
    },
    "rules": {

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
            'error',
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
		

    }
};