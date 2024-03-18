<template>
    <div class="webgl">
        <canvas ref="canvas" class="canvas"></canvas>
        <div ref="container"></div>
    </div>
</template>

<script setup>
import Experience from './Experience/Experience.js'
import { ref } from 'vue';
import { onMounted } from 'vue';

const canvas = ref(null);
const container = ref(null);

onMounted(() => {
    let experience = ref(null);
    experience = new Experience(
        canvas.value,
        container.value
    );

})


</script>

<style scoped>
.webgl {
    overflow: clip;
}

.canvas {
    overflow: clip;
    z-index: 0;
}
</style>
