import antfu from '@antfu/eslint-config'

export default await antfu(
  { },
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    rules: {
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
      'vue/component-options-name-casing': ['error', 'kebab-case'],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'ts/consistent-type-definitions': ['error', 'type'],
      'curly': ['error', 'all'],
    },
  },
)
