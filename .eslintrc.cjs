const { resolve } = require('path');
module.exports = {
    // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
    // This option interrupts the configuration hierarchy at this file
    // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
    root: true,
    ignorePatterns: ['node_modules', 'dist'],

    // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
    // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
    // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
    parserOptions: {
        extraFileExtensions: [ '.vue' ],
        parser: '@typescript-eslint/parser',
        project: resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2021,
        sourceType: 'module',
    },

    env: {
        browser: true,
        // es2021: true,
        node: true,
        // 'vue/setup-compiler-macros': true
    },

    // Rules order is important, please avoid shuffling them
    extends: [
        // Base ESLint recommended rules
        'eslint:recommended',

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
        // ESLint typescript rules
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',


        // Uncomment any of the lines below to choose desired strictness,
        // but leave only one uncommented!
        // See https://eslint.vuejs.org/rules/#available-rules
        'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
        // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
        'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

        // 'standard',
        'typescript',

    ],

    plugins: [
        // required to apply rules which need type information
        '@typescript-eslint',

        // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
        // required to lint *.vue files
        'vue'

    ],

    globals: {
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        __statics: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
        process: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly'
    },

    // add your custom rules here
    rules: {
        'prefer-promise-reject-errors': 'off',

        // TypeScript
        'quotes': ['warn', 'single', { avoidEscape: true }],
        'semi': ['error', 'always'],
        'space-before-function-paren': 'off',
        'prefer-regex-literals': 'off',
        'no-undef': 'off',
        'no-empty': 'off',
        'no-unused-vars': 'off',
        'vue/no-mutating-props': 'warn',
        'vue/no-v-model-argument': 'off',
        'vue/no-v-html': 'off',
        'vue/no-v-for-template-key': 'off',
        'vue/max-attributes-per-line': ['error', {
            'singleline': 5,
            'multiline': 1,
        }],
        'vue/singleline-html-element-content-newline': ['error', {
            'ignoreWhenNoAttributes': true,
            'ignoreWhenEmpty': true,
            'ignores': [
                'pre',
                'textarea',
                'input',
                'div',
                'span',
                'p',
                'toco-link',
            ],
        }],
        'vue/multi-word-component-names': ['error', {
            'ignores': [
                'Error404',
                'Index',
            ],
        }],
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false,
            },
        ],
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        "@typescript-eslint/no-redundant-type-constituents": "off",
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        // '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-extra-semi': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'import/namespace': 'off',
        'import/named': 'off',
        // 'space-before-function-paren': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
    },
}
