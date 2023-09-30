<script setup>
const route = useRoute();
const { data: cars } = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.params.make,
});

watch(
  () => {
    return route.query;
  },
  () => window.location.reload()
);
</script>

<template>
  <div>
    <CarCards v-if="cars.length > 0" :cars="cars" />
    <div v-else>
      <h3 class="text-center text-2xl">No cars found</h3>
    </div>
  </div>
</template>
