module.exports = {
  extends: ['@voiceflow/eslint-config/frontend', '@voiceflow/eslint-config'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['@voiceflow/eslint-config/typescript'],
    },
    {
      files: ['./src/redux/slices/*'],
      rules: {
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
      },
    },
    {
      files: ['./webpack.config.js'],
      rules: {
        'xss/no-mixed-html': 'off',
      },
    },
    {
      files: ['./craco.config.js', './postcss.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'global-require': 'off',
      },
    },
  ],
};
