/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    '@stylistic/stylelint-config',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-recommended-vue'],
    },
  ],
}
