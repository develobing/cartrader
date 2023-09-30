<script setup>
definePageMeta({
  layout: 'custom',
});

const supabase = useSupabaseClient();

const login = async () => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.log('login() - error', error);
  }
};
</script>

<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Login</h1>

    <button class="bg-red-500 p-3 rounded text-white font-bold" @click="login">
      Login with Google
    </button>
  </div>
</template>
