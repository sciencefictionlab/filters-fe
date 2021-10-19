<template>
  <div>

    <section class="hero is-small is-primary has-text-centered">
      <div class="hero-body">
        <p class="title">
          Photo filter app
        </p>
      </div>
    </section>

    <section class="section has-text-centered">
      <div class="columns" style="margin-top: 5rem">
        <div class="column is-4">
          <div class="box bx-style" >
            <b-field>
              <b-upload v-model="file" style="cursor: pointer" @input="uploadFileAndSend">
                <section class="section">
                  <div class="content has-text-centered">
                    <p id="file">
                      <b-icon icon="upload" size="is-large"></b-icon>
                      {{ file.name }}
                    </p>
                    <h5>Drop your files here or click to upload <br> <br>
                      <span class="tag is-primary">Make background gray</span>
                    </h5>
                  </div>
                </section>
              </b-upload>
            </b-field>
          </div>
        </div>

        <div class="column">
          <div class="box bx-style" v-if="converted_image_url">
            <h3 class="title is-size-5">Preview

              <a
                v-bind:href="converted_image_url"
                target="_blank"
                class=" tag is-centered is-primary has-cursor-pointer">
                <span @click="downloadImage()">Download</span>
              </a>
            </h3>
            <img
              v-bind:src="converted_image_url"
              alt=""
              style="height: 20rem"/>
          </div>
        </div>
      </div>

      <hr class="divider has-background-grey-light">
    </section>

    <b-loading :is-full-page="true"  v-model="isLoading" :can-cancel="false"></b-loading>

  </div>
</template>

<script>
import _axios from "@/services/intercept";

export default {
  name: "Home",
  data() {
    return {
      file: {},
      isLoading: false,
      converted_image_url: ""
    };
  },
  methods: {
    uploadFileAndSend() {
      let formData = new FormData();
      formData.append("image", this.$data.file);

      this.$data.isLoading = true;
      _axios
        .post(process.env.VUE_APP_API_URL + "/image/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response) => {
          this.$data.converted_image_url = response.data.url;
          this.$data.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          this.$data.isLoading = false;
        });
    },

    downloadImage() {
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/scss/variables";

.bx-style{
 border: 2px solid $primary;
  background-color:#ebd1d163
}

</style>
