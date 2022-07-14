<template>
  <div v-if="loading">Loading ... </div>
  <div v-if="error">Error: {{ error }}</div>
  <div v-if="result && result.recipes">
    <div class="flex shadow container mx-auto overflow-hidden p-8 flex-wrap">

      <div v-for="recipe in result.recipes" :key="recipe.id" class="m-2 bg-gray-50">
        <router-link :to="{ name: 'recipe', params: { id: recipe.id } }">
          <div class="p-4">
            <h2 class="font-semibold">
              {{ recipe.title }}
            </h2>
            {{ recipe.author.email }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useQuery } from '@vue/apollo-composable';
import { GetRecipesDocument } from '../generated/graphql'

const { result, error, loading, refetch } = useQuery(GetRecipesDocument, {});

refetch(); // refecth on each component mount
</script>
