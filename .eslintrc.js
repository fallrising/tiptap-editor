module.exports = {
    extends: [
        'react-app',
        'react-app/jest'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        // Add any custom rules here
    }
};