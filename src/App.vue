<template>
    <div @dragover.prevent @drop.prevent="addFile" class="drop-container">
        <div class="logo" v-if="!preview">
            <img alt="H5P logo" src="./assets/logo.png">
        </div>
        <div class="preview" v-if="preview">
            <H5PPreview v-bind:location="preview" />
        </div>
    </div>
</template>

<script>
    import H5PPreview from "./components/H5PPreview";

    const SERVER_HOST = 'http://localhost:8081';
    export default {
        name: 'App',
        data() {
            return {
                preview: ''
            };
        },
        methods: {
            addFile(event) {
                let droppedFiles = event.dataTransfer.files;
                if (!droppedFiles) return;
                let file = '';
                ([...droppedFiles]).forEach(f => {
                    file = f;
                });
                this.upload(file);
            },
            upload(file) {
                let formData = new FormData();
                formData.append('file', file);
                let that = this;
                this.clear();
                fetch(SERVER_HOST + '/upload', {
                    method: 'POST',
                    body: formData
                })
                    .then(() => {
                        that.update();
                    })
                    .catch(e => {
                        console.error(JSON.stringify(e.message));
                    });

            },
            update() {
                this.preview = SERVER_HOST + '/preview';
            },
            clear() {
                this.preview = '';
            }
        },
        components: {
            H5PPreview
        }
    }
</script>

<style>
    html, body, #app, .drop-container, .logo, .preview {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .logo, .preview {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
