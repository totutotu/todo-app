module.exports = {
    'env': {
        'browser': true,
        'amd': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        '@typescript-eslint',
    ],
    'rules': {
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        '@typescript-eslint/indent': ['error', 4, {
            'ignoredNodes': ['PropertyDefinition'],
        }],
        'comma-dangle': ['error', 'always-multiline'],
        'no-trailing-spaces': ['error'],
        '@typescript-eslint/no-unused-vars': 2,
    },
};