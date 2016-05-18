<template lang='jade'>
.signUp
  h1 Login
  h2 Please sign in
  form
    .input-group
      span.input-group-addon Username
      input.form-input(type='text', name='username', v-model='username', placeholder='SlimJim')
    .input-group
      span.input-group-addon Password
      input.form-input(type='password', name='password', v-model='password', placeholder='****')
</template>

