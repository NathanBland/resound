<template lang='jade'>
.landing
  h1 Resound
  p
    strong Hey there. Thanks for visiting..
  p
      a(v-link="'/login'") Login
      |  Or 
      a(v-link="'/signup'") Sign Up
      | test 
      a(v-link="'/room/test'") Join Test Room
</template>