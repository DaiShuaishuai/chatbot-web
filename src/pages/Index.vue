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
            :name="message.name"
            :sent="message.sent"
            :stamp="fromNow(message.datetime)"
            :bg-color="message.sent ? 'green-7' : 'white'"
          >
            <div
              v-if="message.sent"
              :style="{ 'max-width': width * 0.8 + 'px' }"
            >
              {{ message.text }}
            </div>
            <div
              v-else
              class="markdown-body"
              :style="{ 'max-width': width * 0.8 + 'px' }"
              v-html="markdownToHtml(message.text)"
            ></div>
          </q-chat-message>
        </div>
        <div
          class="col-xs-11 col-sm-10 col-md-9 col-lg-8 col-xl-7"
          v-show="disable"
        >
          <q-chat-message name="bot" bg-color="white">
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
import { marked } from "marked"; //解析markdown
import "github-markdown-css";
export default {
  props: ["messages", "disable"],
  watch: {
    messages: function (val) {
      //当消息集合变动时 滚动到容器底部
      this.$refs.scrollArea.setScrollPosition("vertical", 9999999, 300);
    },
    width(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.width = val;
        this.timer = true;
        const that = this;
        setTimeout(function () {
          that.timer = false;
        }, 10);
      }
    }
  },
  data() {
    return { width: document.body.clientWidth };
  },
  mounted() {
    this.$refs.scrollArea.setScrollPosition("vertical", 9999999, 300);
    //设置机器人消息最大宽度
    window.onresize = () =>
      (() => {
        window.screenWidth = document.body.clientWidth;
        this.width = window.screenWidth;
      })();
  },
  methods: {
    markdownToHtml(text) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true, //默认为true。 允许 Git Hub标准的markdown.
        tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
        breaks: false, //默认为false。 允许回车换行。该选项要求 gfm 为true。
        pedantic: false, //默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
        sanitize: false, //对输出进行过滤（清理）
        smartLists: true,
        smartypants: false //使用更为时髦的标点，比如在引用语法中加入破折号。
      });
      return marked(text);
    },
    fromNow(date) {
      return fromNow(date, dta);
    }
  }
};
</script>
