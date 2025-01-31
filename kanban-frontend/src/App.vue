<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const scrollY = ref(0); // Track scroll position
const lastScrollY = ref(0);
const isScrollingUp = ref(true);

const handleScroll = () => {
  const currentScroll = window.scrollY;

  // Check if user is scrolling up or down
  isScrollingUp.value = currentScroll < lastScrollY.value;

  // Save current scroll position
  lastScrollY.value = currentScroll;

  // Apply constraints to prevent header moving too far
  scrollY.value = Math.max(0, Math.min(100, currentScroll));
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="header" :style="{ transform: `translateY(-${scrollY}px)` }">
    <div class="header-left">
      <!-- Logo and Title -->
      <div class="logo-title">
        <h1>Kanban Board Online!</h1>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav>
      <RouterLink to="/">Register</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/board">Board</RouterLink>
    </nav>
  </header>

  <!-- Render the Board -->
  <RouterView />
</template>

<style scoped>
/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8); /* Slight transparency */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

/* Left Section (Logo + Access) */
.header-left {
  display: flex;
  flex-direction: column;
}

/* Logo and Title */
.logo-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

h1 {
  font-size: 50px;
  color: #dc2d27;
  margin: 0;
}

/* Navigation */
nav {
  font-size: 20px;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #dc2d27;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
