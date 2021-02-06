module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    rules: {
      'no-use-before-define': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
      'import/no-unresolved': 'off',
      'import/extensions': ['.js', '.jsx', '.json', '.ts', '.tsx', '.ttf'],
    }
  }
};
