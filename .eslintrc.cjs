module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        'sourceType': 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'tailwindcss'
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'tailwindcss/no-custom-classname': 'error',
    'tailwindcss/classnames-order': 'warn',
    '@typescript-eslint/no-unused-vars': "warn"
  }
};
