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
        //  ECMAScript 的版本
        "ecmaVersion": 5,
        // 指定被检查的文件是什么扩展名的 可选项"script"和"module"
        "sourceType": "script",
        // 附加特性的对象
        "ecmaFeatures": {

        }
    },
    "rules": {
       
    }
};