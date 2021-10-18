<template>
  <div>
    <section class="section has-text-centered">
      <h1 class="title is-size-3 has-text-centered mt-5">
        This is a filter app.
      </h1>

      <b-field style="margin-top: 5rem">
        <div class="box">
          <b-upload v-model="file" style="cursor: pointer">
            <section class="section">
              <div class="content has-text-centered">
                <p id="file">
                  <b-icon icon="upload" size="is-large"></b-icon>
                  {{ file.name }}
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </div>
      </b-field>
      <a class="button is-primary is-centered">
        <span @click="uploadFileAndSend">click to apply filter</span>
      </a>

      <div class="box mt-5" v-if="converted_image_url">
        <h3 class="title is-size-5">Filter applied--</h3>
        <img
          v-bind:src="converted_image_url"
          alt=""
          style="width: 20rem; height: 20rem"
        />

        <br /><br />
        <a
          v-bind:href="converted_image_url"
          target="_blank"
          class="button is-primary is-centered"
        >
          <span @click="downloadImage()">Download image</span>
        </a>
      </div>
    </section>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
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
      converted_image_url: "",
    };
  },
  methods: {
    uploadFileAndSend() {
      let formData = new FormData();
      formData.append("image", this.$data.file);

      this.$data.isLoading = true;
      _axios
        .post(process.env.VUE_APP_API_URL + "/image/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          this.$data.isLoading = false;
          this.$data.converted_image_url = response.data.url;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          this.$data.isLoading = false;
        });
    },

    downloadImage() {},
  },
};
</script>
