<template>
  <div class="home">
    <el-carousel height='532px' :interval='4000' :loop='true'>
      <el-carousel-item
        v-for='item in sliders'
        :key='item._id'
      >
        <img :src="item.url" class='slider-img'>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SET_SLIDER } from '../store/action-types';

export default {
  name: 'Home',

  computed: {
    ...mapState([ 'sliders' ]),
  },

  methods: {
    ...mapActions([ SET_SLIDER ]),
  },

  async created() {
    if (this.sliders.length) return;
    await this[SET_SLIDER]();
  },
}
</script>

<style lang="scss">
  .slider-img {
    width: 100%;
    height: 100%;
  }
</style>