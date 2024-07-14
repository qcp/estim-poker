/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-recommended-vue'],
    },
  ],
}
