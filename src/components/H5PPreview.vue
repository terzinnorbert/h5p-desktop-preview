<template>
    <div id="h5p-container"></div>
</template>

<script>
    const {H5P} = require('h5p-standalone');

    export default {
        props: {
            location: String
        },
        updated() {
            const el = document.getElementById('h5p-container');
            new H5P(el, this.location);
        },
        mounted: function () {
            if (this.location.length) {
                this.updated();
            }
        },
    }
</script>

<style>
    #h5p-container {
        width: 100%;
        padding: 15px;
    }
</style>