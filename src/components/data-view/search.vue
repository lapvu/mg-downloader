<template>
<b-row align-h="end">
    <b-col cols="3">
        <b-form-input v-model="txt" type="text" placeholder="Tìm Tập" @keyup.native="search"></b-form-input>
    </b-col>
</b-row>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      txt: ""
    };
  },
  methods: {
    search: function() {
      this.$store.dispatch("search", this.txt);
    }
  }
};
</script>
