<template>
    <b-container>
        <b-card-group deck>
            <b-card
            border-variant="dark"
            align="center">
                <Search slot="header"></Search>
                <b-list-group :flush="true">
                    <b-list-group-item v-for="(item,index) in data" v-bind:key="index">{{item.name}}<b-form-checkbox plain  v-bind:value="index" v-model="checked"></b-form-checkbox></b-list-group-item>
                </b-list-group>
                <b-row slot="footer" align-h="start">
                    <b-col cols="4">
                      <b-form-select v-model="selected" @change="change_selected">
                        <option :value="1">Chọn Tập</option>
                        <option :value="2">Chọn Tất Cả</option>
                      </b-form-select>
                    </b-col>
                  <b-col cols="4"><b-button @click="download" :disabled="checked.length === 0  ? true : false"><i class="fas fa-download"></i> Tải Xuống</b-button></b-col>
                </b-row>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
import Search from "./search";
import { mapGetters } from "vuex";
export default {
  name: "Card",
  components: {
    Search
  },
  computed: mapGetters({
    data: "filter_data"
  }),
  data() {
    return {
      checked: [],
      selected: 1
    };
  },
  methods: {
    download: function() {
      this.$store.dispatch("download", this.checked);
    },
    change_selected: function() {
      if (this.selected != 2) {
        this.checked = [];
        this.$store.state.data.forEach((e, i) => {
          this.checked.push(i);
        });
      } else {
        this.checked = [];
      }
    }
  }
};
</script>
<style scoped>
.form-check {
  float: right;
}
.card-body {
  overflow-y: scroll;
  height: 350px;
}
/* width */
.card-body::-webkit-scrollbar {
  height: 20px;
  width: 10px;
}
/* Track */
.card-body::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 10px;
}

/* Handle */
.card-body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #504f4f;
}

/* Handle on hover */
.card-body::-webkit-scrollbar-thumb:hover {
  background: rgb(143, 161, 168);
}
</style>
