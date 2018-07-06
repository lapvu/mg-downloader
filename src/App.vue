<template>
  <div id="app">
    <h1>mg downloader</h1>
    <formGroup/>
    <card v-if="!this.$store.state.loading && this.$store.state.data"></card>
    <ListWeb v-if="!this.$store.state.data"></ListWeb>
    <modal></modal>
    <loading></loading>
  </div>
</template>

<script>
import FormGroup from "./components/form-group";
import Loading from "./components/loading";
import Card from "./components/data-view/card";
import Modal from "./components/modal";
import ListWeb from "./components/list-web";
export default {
  name: "App",
  components: {
    FormGroup,
    Loading,
    Card,
    Modal,
    ListWeb
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  text-align: center;
}
h1 {
  text-transform: uppercase;
  font: bold;
}
</style>
