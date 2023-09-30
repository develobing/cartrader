<script setup>
const route = useRoute();
const message = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const isDisableButton = computed(() => {
  for (const key in message.value) {
    if (!message.value[key]) {
      return true;
    }
  }
});

const errorMessage = ref('');
const successMessage = ref('');

const handleSubmit = async () => {
  try {
    const response = await $fetch(
      `/api/car/listings/${route.params.id}/message`,
      {
        method: 'POST',
        body: message.value,
      }
    );

    message.value = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
    successMessage.value = 'Message sent!';
    errorMessage.value = '';
  } catch (error) {
    console.log('handleSubmit() - error', error);
    errorMessage.value = error.statusMessage;
    successMessage.value = '';
  }
};
</script>

<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input
        type="text"
        class="border p-1"
        placeholder="Name"
        v-model="message.name"
      />
      <input
        type="text"
        class="border p-1"
        placeholder="Email"
        v-model="message.email"
      />
      <input
        type="text"
        class="border p-1"
        placeholder="Phone"
        v-model="message.phone"
      />
    </div>

    <div class="flex mt-4 w-[600px]">
      <textarea
        class="border p-1 w-full"
        placeholder="Message"
        v-model="message.message"
      >
      </textarea>
    </div>

    <button
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4"
      :class="{
        'opacity-50 cursor-not-allowed': isDisableButton,
      }"
      :disabled="isDisableButton"
      @click="handleSubmit"
    >
      Submit
    </button>

    <p v-if="errorMessage" class="text-red-400">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-400">{{ successMessage }}</p>
  </div>
</template>
