<template>
      <b-container>
                <b-form-group
                id="fieldset1"
                :invalid-feedback="invalidFeedback"
                :state="state"
                >
                    <b-form-input v-model.trim="link" @keyup.native="sendLink" :state="state"  placeholder="Enter your link here" required></b-form-input>
                </b-form-group>
    </b-container>
</template>

<script>
export default {
  name: "FormGroup",
  computed: {
    state() {
      if (this.link.length > 1) {
        return this.link.match(this.parent) ? true : false;
      }
    },
    invalidFeedback() {
      if (!this.link.match(this.parent) && this.link.length > 1) {
        return "Đéo hỗ trợ link này !";
      }
    }
  },
  data() {
    return {
      link: "",
      parent: /^http(s|):\/\/(comicvn\.net\/truyen-tranh-online|www\.a3manga\.com|mangak\.info|truyentranh\.net|truyentranhtuan\.com|thichtruyentranh\.com|dammetruyen\.com)\/[\w|\-|\/\.]{2,}/g
    };
  },
  methods: {
    sendLink(e) {
      if (e.which === 13 && this.link.match(this.parent)) {
        this.$store.dispatch("send_link", this.link);
      }
    }
  }
};
</script>
<style>
</style>
