<script setup>
const { cars } = useCars();

const favorite = useLocalStorage('favorite', {});
console.log('favorite.value', favorite.value);
const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value[id] = true;
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};
</script>

<template>
  <div class="w-full">
    <CarCard
      v-for="car in cars"
      :key="car.id"
      :car="car"
      :favored="car.id in favorite"
      @favor="handleFavorite"
    />
  </div>
</template>
