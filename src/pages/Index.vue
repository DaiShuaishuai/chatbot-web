<template>
  <q-page class="row box">
    <q-scroll-area
      ref="scrollArea"
      class="row justify-center"
      style="width: 100%; max-width: 100%"
    >
      <div class="justify-center row">
        <div
          class="col-xs-11 col-sm-10 col-md-9 col-lg-8 col-xl-7"
          v-for="(message, index) in messages"
          :key="index"
        >
          <q-chat-message
            style="white-space: pre-wrap"
            :text="message.text"
            :name="message.name"
            :sent="message.sent"
            :stamp="fromNow(message.datetime)"
          />
        </div>
        <div class="col-xs-11 col-sm-10 col-md-9 col-lg-8 col-xl-7" v-show="disable">
          <q-chat-message name="bot">
            <q-spinner-dots size="2rem" />
          </q-chat-message>
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, -10]"
          >
            机器人真在努力思考
          </q-tooltip>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { dta, fromNow } from "../utils/date_utils";
export default {
  props: ["messages", "disable"],
  watch: {
    messages: function (val) {
      //当消息集合变动时 滚动到容器底部
      this.$refs.scrollArea.setScrollPosition("vertical", 9999999, 300);
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs.scrollArea.setScrollPosition("vertical", 9999999, 300);
  },

  methods: {
    fromNow(date) {
      return fromNow(date, dta);
    }
  }
};
</script>
