export function useTheme() {
  const isDark = useDark({
    selector: 'html',
    valueDark: 'theme-dark',
  })
  const toggleDark = useToggle(isDark)

  const theme = computed(() => isDark.value ? 'dark' : 'light')
  const themeIcon = computed(() => isDark.value ? 'pi pi-moon' : 'pi pi-sun')

  const toggleTheme = (theme?: 'dark' | 'light') => {
    switch (theme) {
      case 'dark': return toggleDark(true)
      case 'light': return toggleDark(false)
      default: return toggleDark()
    }
  }

  const prefered = usePreferredColorScheme()
  watch(
    () => prefered.value,
    () => {
      if (prefered.value === 'dark') {
        toggleTheme('dark')
      }
      else if (prefered.value === 'light') {
        toggleTheme('light')
      }
    },
    // { immediate: true },
  )

  return {
    theme,
    themeIcon,
    toggleTheme,
  }
}
