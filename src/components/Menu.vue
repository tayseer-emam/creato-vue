<template>
  <div>
    <div class="burger-menu cursor-pointer z-10" :class="{ 'open': show }" @click="toggleMenu">
      <span v-for="bar of 3" :key="bar"></span>
    </div>
    <transition name="slide">
      <aside v-if="show" class="font-montserrat absolute top-0 left-0 md:right-0 md:left-auto bg-gray-900 bg-opacity-75 w-full h-full flex justify-center pt-24 text-white">
        <nav class="menu">
          <ul>
            <li v-for="item of items" :key="item.name">
              <a class="cursor-pointer block mb-6" @click="emitChange(item.id)">{{ item.name }}</a>
            </li>
          </ul>
        </nav>
      </aside>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Menu',

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    show: false,
  }),

  methods: {
    toggleMenu() {
      this.show = !this.show;
    },
    emitChange(id) {
      this.show = false;
      setTimeout(() => {
        this.$emit('item-change', id);
      }, 500);
    },
  },
}
</script>

<style scoped lang="scss">
  .burger-menu {
    width: 20px;
    height: 9px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    z-index: 1;
  }
  .burger-menu span {
    display: block;
    width: 100%;
    height: 1px;
    background-color: #333;
    position: absolute;
    left: 0;
    transition: .25s ease-in-out;
  }
  .burger-menu span:nth-child(1) {
    top: 0px;
  }
  .burger-menu span:nth-child(2) {
    top: 4px;
  }
  .burger-menu span:nth-child(3) {
    top: 8px;
  }
  .burger-menu.open span {
    background: #ffffff;
  }
  .burger-menu.open span:nth-child(1) {
    top: 4px;
    transform: rotate(135deg);
  }
  .burger-menu.open span:nth-child(2) {
    opacity: 0;
    left: -10px;
  }
  .burger-menu.open span:nth-child(3) {
    top: 4px;
    transform: rotate(-135deg);
  }
</style>