<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const logout = async () => {
  try {
    // 1. Sign out utilizing the supabase client
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // 2. Sign out manually
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: { event: 'SIGNED_OUT', session: null },
    });

    // user.value = null;
  } catch (error) {
    console.log('logout() - error', error);
  }
};
</script>

<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink class="text-3xl font-mono" to="/">Cartrader</NuxtLink>

    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings" class="mr-5">Profile</NuxtLink>
      <p class="cursor-pointer" @click="logout">Logout</p>
    </div>

    <NuxtLink v-else to="/login">Login</NuxtLink>
  </header>
</template>
