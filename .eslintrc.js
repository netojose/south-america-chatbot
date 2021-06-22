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
  ],
};
