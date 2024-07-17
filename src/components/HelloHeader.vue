<template>
  <div class="header">
    <h1 class="header-title">
      <span class="header-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 48 48">
          <g class="card" fill="none" stroke-linejoin="round" stroke-width="4" stroke="var(--p-text-color)">
            <path d="M42 4H12v40h30V4Z" />
            <path stroke-linecap="round" d="M4 11.79L12 10v34L4 11.79Z" clip-rule="evenodd" />
            <path stroke="var(--p-primary-color)" d="m27 18l-5 6l5 6l5-6l-5-6Z" />
            <path stroke-linecap="round" d="M18 10v4m18 20v4" />
          </g>
        </svg>
      </span>
      <span>Estim Pocker</span>
    </h1>
    <span class="header-description">Simple tool for estimate tasks in your team</span>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
}

.header-icon {
  vertical-align: middle;
}

.header-title {
  margin: 0;
  font-size: 4em;
  text-align: center;
}

.header-description {
  font-size: 1.5em;
  text-align: center;
  text-wrap: balance;
}
</style>
