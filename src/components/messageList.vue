<template lang='jade'>
  div.messageList(v-if='messages')
    .card.message(v-for='message in messages')
      .card-body
        .chip-sm
          figure.avatar.avatar-xl(data-initial='{{message.user | limitBy 2}}', style='background-color: #5764c6;')
          span.chip-name {{message.user}}
        span  {{message.msg}}
            
  div.empty(v-else)
    h1
      i.fa.fa-comments-o
    p.empty-title No messages in this chat
    p.empty-meta Start by sending a message or inviting people.
    button.btn.btn-primary Copy Link

</template>


<script>
  export default {
    props: ['messages'],
    watch: {
      messages: function (e) {
        console.log('this:', this)
        let msgs = document.querySelectorAll('.card-body')
        msgs[msgs.length - 1].scrollIntoView()
      }
    }
  }
</script>

<style scoped lang='sass'>
  .messageList
    overflow-y: auto
  .card
    margin: .5em
</style>
