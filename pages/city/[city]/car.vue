<script setup>
const route = useRoute();
const { toTitleCase } = useUtilities();

const makeTitle = route.params.make ? toTitleCase(route.params.make) : 'Cars';
const cityTitle = toTitleCase(route.params.city);

useHead({
  title: `${makeTitle} in ${cityTitle}`,
});

definePageMeta({
  layout: 'custom',
});
</script>

<template>
  <div>
    <div
      class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w3/5"
    >
      <div class="mt-32 flex">
        <NuxtErrorBoundary>
          <CarSideBar />
          <NuxtPage />

          <template #error="{ error }">
            <div class="text-center mx-auto flex flex-col">
              <h1 class="text-5xl mb-4">Sorry, something went wrong</h1>
              <code>{{ error }}</code>
              <button
                class="text-white bg-blue-400 px-10 py-3 rounded mt-4"
                @click="error.value = null"
              >
                Go Back
              </button>
            </div>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>
