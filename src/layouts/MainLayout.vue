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
          class="WAL__field col-grow q-mr-sm"
          style="max-width: 1000px"
          bg-color="white"
          bottom-slots
          v-model="search_text"
          label="请输入你的问题"
          counter
          rounded
          outlined
          @keyup.enter.native="sendMsg"
        >
          <template v-slot:after>
            <q-btn
              :disable="disable"
              round
              dense
              flat
              icon="send"
              @click="sendMsg"
            >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              发送问题给机器人
            </q-tooltip>
            </q-btn>
            <q-btn
              :disable="disable"
              round
              dense
              flat
              icon="close"
              @click="clearMsgs"
            >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              清空聊天记录
            </q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { sendQuestion } from "../api/chatbot/chatbot";
import moment from "moment";
import {dta} from "../utils/date_utils";
const bot_message_records="bot_message_records"
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
          datetime: moment().format(dta)
        },
      ],
    };
  },
  created(){
    let records = localStorage.getItem(bot_message_records)
    if(records&&records!="[]"){
      this.messages=JSON.parse(records)
      localStorage.removeItem(bot_message_records)
    }
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem(bot_message_records,JSON.stringify(this.messages))
    })
  },
  methods: {
    //发送问题
    async sendMsg() {
      if (!this.search_text||this.disable) {
        return;
      }
      this.disable = true;
      //讲自己的问题加入到msg集合中
      
      let text = this.search_text
      this.search_text = ""
      this.addMessage("me", true, text,moment().format(dta));
      await sendQuestion(text).then((res) => {
        //发送问题给机器人
        this.addMessage("bot", false, res.data,moment().format(dta));
        //清空输入框
      }).catch(()=>{
        this.addMessage("bot", false, "出错了！！！",moment().format(dta));
      })
      
      
      this.disable = false;
    },
    addMessage(name, sent, text,datetime) {
      this.messages.push({
        name: name,
        text: [text],
        sent: sent,
        datetime
      });
    },
    clearMsgs(){
      this.messages=[];
      localStorage.removeItem(bot_message_records)
    }
  },
};
</script>
<style lang="css">
.bg-white {
  background: #fff !important;
}
</style>
