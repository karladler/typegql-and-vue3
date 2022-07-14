<template>
  <div class="flex shadow mx-auto overflow-hidden p-8 flex-col max-w-md">
    <div class="bg-gray-50 p-4">
      <div class="">
        <label>
          <h3>Title</h3>
          <input type="text" v-model="recipe.title">
        </label>
        <label>
          <h3 class="mt-2">Description</h3>
          <textarea class="w-full" v-model="recipe.description" />
        </label>
      </div>
    </div>
    <div class="mt-4">
      <button class="btn primary mr-2" @click="addRecipe">Add Recipe</button>
      <router-link :to="{ name: 'recipes' }" class="btn">
        Cancel
      </router-link>
    </div>
    <div v-if="loading">loading...</div>
  </div>
</template>

<script setup lang='ts'>
import { useMutation } from '@vue/apollo-composable';
import { AddRecipeDocument } from '../generated/graphql'
import { ref } from 'vue';
import router from '@/router';

const { mutate, onDone, loading } = useMutation(AddRecipeDocument)

const recipe = ref({
  title: '',
  description: ''
});

const addRecipe = () => {
  mutate({
    title: recipe.value.title,
    description: recipe.value.description,
  });
}

onDone(() => router.push('recipes'));

</script>
