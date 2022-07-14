<template>
  <nav class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/recipes">Recipes</router-link> |
    <router-link to="/add-recipe">Add Recipe</router-link>
  </nav>
  <router-view />
</template>

<style lang="pcss">
.nav {
  @apply p-4;

  & a {
    @apply font-semibold text-blue-900;

    &.router-link-exact-active {
      @apply text-blue-500;
    }
  }
}
</style>
