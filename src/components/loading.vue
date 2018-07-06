<template>
    <div v-if="loading" class="loading">
      <div class="pre-load">
        <img src="../assets/loading.svg" alt="loading">
          <p>Càng nhiều chap load càng lâu</p>
      </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Loading",
  computed: mapGetters({
    loading: "set_loading"
  })
};
</script>
<style>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.pre-load {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
