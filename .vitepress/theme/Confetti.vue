<script setup lang="ts">
import confetti from "canvas-confetti";

/* 纸屑 */
confetti({
  particleCount: 300,
  spread: 200,
  origin: { y: 0.4 },
});
</script>