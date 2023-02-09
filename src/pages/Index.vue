<template>
  <q-page class="q-pa-md row box">
    <q-scroll-area
      ref="scrollArea"
      class="row justify-center"
      style="width: 100%; max-width: 100%"
    >
      <div class="justify-center row">
        <div
          style="width: 100%; max-width: 51%"
          v-for="(message, index) in messages"
          :key="index"
        >
          <q-chat-message
            style="white-space: pre-wrap;"
            :text="message.text"
            :name="message.name"
            :sent="message.sent"
          />
        </div>
        <div style="width: 100%; max-width: 51%" v-show="disable">
          <q-chat-message :text='text' :name="name"/>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
export default {
  props: ["messages", "disable"],
  watch: {
    messages: function (val) {
      //当消息集合变动时 滚动到容器底部
      this.$refs.scrollArea.setScrollPosition("vertical", 9999999, 300);
    },
  },
  data(){
    return{
      text:['请稍等...'],
      name:"bot"
    }
  },
  
  methods: {},
};
</script>
