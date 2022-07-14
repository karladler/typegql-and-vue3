<template>
  <div v-if="loading">Loading ... </div>
  <div v-if="error">Error: {{ error }}</div>
  <div v-if="result && result.recipe">
    <div class="flex shadow max-w-md mx-auto overflow-hidden p-8 flex-wrap">
      <div class="m-2 bg-gray-50 p-4 w-full">
        <h2 class="font-semibold">
          {{ result.recipe.title }}
        </h2>
        <div class="mt-2">
          Author Name: {{ result.recipe.author.nickname }}
        </div>
        <div class="mt-4">
          Author Mail: {{ result.recipe.author.email }}
        </div>
        <div class="mt-4">
          {{ result.recipe.description || 'N/A' }}
        </div>
        <div class="justify-center flex mt-4">
          <star-rating :show-rating="false" :rating="rating" :star-size="20" @update:rating="setRating" :increment="0.5" />
        </div>
        <div class="text-center text-xs text-gray-400 mt-1" v-if="rating">{{ rating.toFixed(4) }}</div>
      </div>
      <router-link :to="{ name: 'recipes' }" class="btn mt-4">
        Back to Recipes
      </router-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GetRecipeDocument, RateRecipeDocument } from '../generated/graphql'
import StarRating from 'vue-star-rating';
import { meanBy } from 'lodash';
import { computed } from 'vue';

const props = defineProps({
  id: String,
})

const { result, error, loading } = useQuery(GetRecipeDocument, {
  id: parseInt(props?.id || ''),
});

const rating = computed(() => {
  const avg = meanBy(result.value?.recipe?.ratings, 'value');
  return !isNaN(avg) ? avg : undefined;
});

const { mutate } = useMutation(RateRecipeDocument)

const setRating = (value: number) => {
  mutate({
    id: parseInt(props.id || ''),
    rating: Math.round(value)
  });
}

</script>
