<template>
  <div class="ring-container">
    <div class="circle"></div>
    <div class="ringring"></div>
  </div>
</template>

<script>
export default {
  name: 'PulseDot'
}
</script>

<style scoped>
.ring-container {
  position: relative;
}

.circle {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 5px;
}

.ringring {
  border: 3px solid red;
  border-radius: 30px;
  height: 25px;
  width: 25px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0.0;
}

@keyframes pulsate {
  0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
  50% {opacity: 1.0;}
  100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
}
</style>
