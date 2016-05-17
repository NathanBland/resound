<template lang='jade'>
.jumbotron
  h1 Uh Oh
  h2 We're really sorry
  
  p
    strong It looks like something got messed up. While we sort it out, try one of these:
  p
      a(v-link="'/login'") Login
      |  Or 
      a(v-link="'/signup'") Sign Up
</template>