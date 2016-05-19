<template lang='jade'>
  div.userList(:users v-if='users')
    .chip-sm(v-for='user in users')
      figure.avatar.avatar-xl(data-initial='{{user.user_id.username | limitBy 2}}')
      span.chip-name {{user.user_id.username}}
</template>


<script>
  export default {
    props: ['users']
  }
</script>

<style scoped lang='sass'>
  .userList
    margin: .5em
  .chip-sm
    background-color: darkgrey
    figure
      background-color: green
</style>
