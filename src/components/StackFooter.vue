<script setup lang="ts">
function icon(name: string, theme?: 'light' | 'dark') {
  return `https://api.iconify.design/skill-icons:${name}${theme ? `-${theme}` : ''}.svg`
}

const logoCounter = ref(0)

const logos = [
  h('span', '❤️'),
  h('img', { src: icon('typescript') }),
  h('img', { src: icon('vite', 'dark') }),
  h('img', { src: icon('vuejs', 'dark') }),
  h('img', { src: icon('supabase', 'dark') }),
  h('img', { src: icon('postgresql', 'dark') }),
  h('img', { src: icon('github', 'dark') }),
]

useIntervalFn(
  () => (logoCounter.value = Math.round((logoCounter.value + 1) % logos.length)),
  5 * 1000,
)
</script>

<template>
  <div class="block">
    <div class="with">
      made with
    </div>
    <div class="logo">
      <transition name="slide-up" mode="out-in">
        <component :is="logos[logoCounter]" :key="logoCounter" />
      </transition>
    </div>
    <div class="with">
      by qcp
    </div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--inline-spacing);
}
.with {
  color: var(--text-color-secondary);
}
.logo {
  width: 1em;
  display: flex;
  align-items: center;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(1em);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-1em);
}
</style>
