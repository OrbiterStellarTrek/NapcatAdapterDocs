<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from "canvas-confetti";

onMounted(() => {
  /* 纸屑 */
  confetti({
    particleCount: 300,
    spread: 200,
    origin: { y: 0.4 },
  });
})
</script>