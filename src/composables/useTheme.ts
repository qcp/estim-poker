import { usePrimeVue } from 'primevue/config'

export function useTheme() {
  const Themes = {
    light: 'lara-light-blue',
    dark: 'lara-dark-blue',
  } as const

  const { changeTheme } = usePrimeVue()
  const [theme, toggleTheme] = useToggle<typeof Themes.light, typeof Themes.dark>(Themes.light, {
    truthyValue: Themes.light,
    falsyValue: Themes.dark,
  })

  watch(theme, (newTheme, oldTheme) => changeTheme(oldTheme, newTheme, 'theme-link'))

  const preferredColor = usePreferredColorScheme()

  watch(
    preferredColor,
    () => {
      if (preferredColor.value === 'light' && theme.value !== Themes.light) {
        theme.value = Themes.light
      }
      else if (preferredColor.value === 'dark' && theme.value !== Themes.dark) {
        theme.value = Themes.dark
      }
    },
    { immediate: true },
  )

  const themeIcon = computed(() => {
    switch (theme.value) {
      case Themes.light:
        return 'pi pi-sun'
      case Themes.dark:
        return 'pi pi-moon'
    }
  })

  return {
    theme,
    themeIcon,
    toggleTheme,
  }
}
