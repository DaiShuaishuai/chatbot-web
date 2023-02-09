<template>
  <q-layout view="lHh Lpr lFf" ref="main">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> ChatBot </q-toolbar-title>

        <div>version v0.1</div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2" ref="content">
      <router-view :messages="messages" :disable="disable" />
    </q-page-container>
    <q-footer elevated class="no-shadow" ref="footer">
      <q-toolbar
        class="bg-grey-3 text-black no-shadow row justify-center q-pt-md q-pb-sm"
      >
        <q-input
          :disable="disable"
          class="WAL__field col-grow q-mr-sm"
          style="max-width: 1000px"
          bg-color="white"
          bottom-slots
          v-model="search_text"
          label="请输入你的问题"
          counter
          rounded
          outlined
        >
          <template v-slot:after>
            <q-btn
              :disable="disable"
              round
              dense
              flat
              icon="send"
              @click="sendMsg"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { sendQuestion } from "../api/chatbot/chatbot";
export default {
  name: "MainLayout",
  data() {
    return {
      search_text: "",
      disable: false,
      messages: [
        {
          name: "bot",
          text: ["请告诉我你的问题"],
          sent: false,
        },
      ],
    };
  },
  methods: {
    //发送问题
    async sendMsg() {
      if (!this.search_text) {
        return;
      }
      this.disable = true;
      //讲自己的问题加入到msg集合中

      this.addMessage("me", true, this.search_text);
      await sendQuestion(this.search_text).then((res) => {
        //发送问题给机器人
        this.addMessage("bot", true, res.data);

        //清空输入框
        this.search_text = "";
        this.disable = false;
      });
    },
    addMessage(name, sent, text) {
      this.messages.push({
        name: name,
        text: [text],
        sent: sent,
      });
    },
  },
};
</script>
<style lang="css">
.bg-white {
  background: #fff !important;
}
</style>
