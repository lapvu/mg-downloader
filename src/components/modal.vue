<template>
  <b-modal v-model="$store.state.show" hide-footer title="Đm chờ tý, Đang tải" centered no-close-on-backdrop no-close-on-esc hide-header-close size="sm"> 
      <div class="d-block text-center">
        <b-progress :max="100" show-progress animated>
           <b-progress-bar :value="percent" :label="percent.toFixed(0)+' %'">
          </b-progress-bar>
        </b-progress>
      </div>
      <br/>
      <p class="text-alert">* Đã tải là đéo hủy được đâu, đợi lâu quá thì tắt cmn đi cũng được *</p>
  </b-modal>
    
</template>

<script>
const ipc = window.require("electron").ipcRenderer;
import swal from "sweetalert2";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "Modal",
  computed: mapGetters({
    percent: "progress"
  }),
  created() {
    ipc.on("send-per", (e, args) => {
      this.$store.dispatch("pro_gress", args);
    });
  },
  updated() {
    if (this.percent.toFixed(0) == 100) {
      setTimeout(() => {
        this.$store.dispatch("hide_modal");
        swal({
          type: "success",
          text: "Tải xuống thành cmn công",
          width: "280px"
        });
      }, 300);
    }
  }
};
</script>
<style scoped>
.text-alert {
  color: red;
}
</style>

