<template>
    <section>
        <b-container>
            <b-row>
                <b-col cols="6" v-for="(item,index) in Lst" :key="index" class="mb-3">
                    <b-card :bg-variant="item.color"
                        text-variant="white"
                        class="text-center">
                    <p class="card-text">{{item.name}}</p>
                </b-card>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>
<script>
export default {
  name: "ListWeb",
  data: function() {
    return {
      Lst: [
        { color: "primary", name: "thichtruyentranh.com" },
        { color: "success", name: "www.a3manga.com" },
        { color: "danger", name: "comicvn.net" },
        { color: "warning", name: "mangak.info" },
        { color: "info", name: "truyentranh.net" },
        { color: "secondary", name: "dammetruyen.com" }
      ]
    };
  }
};
</script>
<style scoped>
</style>

