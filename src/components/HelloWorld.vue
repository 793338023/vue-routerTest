<template>
  <div class="hello">
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      timer: null
    }
  },
  mounted(){
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  perspective: 100px; 
}
.item {
  background-color: #42b983;
  width: 100px;
  height: 100px;
  transform: matrix(0.5, 0.2, -0.5, 0.6, 100, 0);
  transform-origin: center;
}
</style>
