<template>
  <div class="login-container">
    <div class="login-box">
      <h2>REGISTER</h2>
      <input v-model="username" placeholder="USERNAME" class="input-field" />
      <input v-model="password" type="password" placeholder="PASSWORD" class="input-field" />
      <div class="button-group">
        <button @click="login" class="login-btn">Register</button>
        <button @click="register" class="register-btn">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { username: '', password: '' };
  },
  methods: {
    async login() {
      try {
        this.$router.push('/board');
      } catch (error) {
        alert('Login failed');
      }
    },
    register() {
      this.$router.push('/register'); // Redirect to register page
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* Ensure full width */
}

.login-box {
  background-color: #666;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  width: 450px; /* Set a fixed width to center properly */
}

h2 {
  font-size: 50px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-field {
  width: 400px;
  padding: 12px;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  text-align: center;
  font-size: 30px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.login-btn {
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background-color: #17a54d;
}

.register-btn {
  background-color: #E63946; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.register-btn:hover {
  background-color: #c52836;
}
</style>
