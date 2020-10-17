<template>
  <main class="xl:container mx-auto flex flex-col-reverse md:flex-row justify-between md:mt-24">
    <div class="w-1/12" aria-hidden="true"></div>

    <section class="mt-16 px-3 md:m-0 md:p-0 flex flex-col justify-between relative villa-info md:w-4/12">
      <transition name="fade" mode="out-in">
        <span class="text-xs" :key="activeSlide.id">{{ activeSlide.location }}</span>
      </transition>

      <div>
        <transition-group tag="h1" class="font-montserrat h-64 z-10 text-5xl md:text-6xl mt-8 md:mt-0 relative" :name="slideMode">
          <span
            v-for="(slide, i) of slides"
            v-show="i === activeIndex"
            class="block absolute"
            :key="slide.id"
          >
            {{ slide.name }}
          </span>
        </transition-group>

        <div class="flex justify-center items-center switch-btns">
          <button
            class="px-6 uppercase text-xs tracking-widest switch-btn prev focus:outline-none"
            :class="{ 'opacity-50 cursor-auto': !activeIndex }"
            :disabled="!activeIndex"
            @click="slide('prev')"
          >
            <span class="py-5 inline-block relative">Prev.</span>
          </button>
          <button
            class="px-6 uppercase text-xs tracking-widest switch-btn focus:outline-none"
            :class="{ 'opacity-50 cursor-auto': isLastSlide }"
            :disabled="isLastSlide"
            @click="slide('next')"
          >
            <span class="py-5 inline-block relative">Next</span>
          </button>
          <span class="absolute block border-b border-gray-300 border-solid right-0 w-1/3"></span>
        </div>
      </div>

      <div class="self-start flex items-center mt-10 md:mt-0">
        <transition name="fade" mode="out-in">
          <span :key="activeIndex" class="text-gray-900 text-opacity-50 text-2xl">{{ numberToString(activeIndex + 1) }}</span>
        </transition>
        <span class="border-gray-300 border-r border-solid duration-500 ease-in-out h-12 md:mx-10 mx-6 rotate-45 transform transition" :class="!activeIndex ? 'rotate-45' : '-rotate-45'"></span>
        <span class="text-gray-900 text-opacity-50 text-2xl">{{ numberToString(this.slides.length) }}</span>
      </div>
    </section>

    <section class="md:w-5/12">
      <div class="relative img-slider overflow-hidden pointer-events-none md:pointer-events-auto">
        <transition-group tag="div" class="h-full flex relative" :name="slideMode">
          <img
            v-for="(slide, i) of slides"
            :key="slide.id"
            v-show="i === activeIndex"
            :src="`img/slider/${slide.image}`"
            class="slide absolute object-cover h-full hover:transition duration-500"
            :class="isLastSlide ? 'origin-bottom' : 'origin-bottom-center'"
            :alt="activeSlide.name"
          >
        </transition-group>
        <div class="pl-3 pt-10 md:pl-0 absolute bg-white bottom-0 details-box w-1/2 md:w-1/3">
          <a class="uppercase tracking-widest text-xs" href="#!">
            Details
            <span class="icon icon-arrow ml-4 transition duration-500 ease-in-out"></span>
          </a>
        </div>
      </div>
    </section>
  
    <header class="flex p-3 md:p-0 md:flex-col justify-between items-center md:w-2/12">
      
      <Menu :items="slides" @item-change="changeSlide" />
  
      <img src="img/logo.png" alt="Creato Logo">
  
      <nav class="social">
        <a
          v-for="(link, index) of socialLinks"
          :key="link"
          :class="{ 'mr-3 md:mb-6 md:mr-0 md:block': index !== socialLinks.length - 1 }"
          href="#"
        >
          <span class="icon" :class="`icon-${link}`"></span>
        </a>
      </nav>
    </header>
  </main>
</template>

<script>
import Menu from './components/Menu';
import slides from './data.json';

export default {
  name: 'App',
  
  data: () => ({
    slides: slides,
    activeSlide: slides[0],
    activeIndex: 0,
    socialLinks: [
      'linkedin',
      'instagram',
      'youtube'
    ],
    slideMode: 'slide-right',
  }),

  computed: {
    isLastSlide() {
      return this.slides.length - 1 === this.activeIndex;
    },
  },

  methods: {
    slide(type) {
      switch(type) {
        case 'next':
          this.slideMode = 'slide-right';
          this.activeIndex++;
          break;
        case 'prev':
          this.slideMode = 'slide-left';
          this.activeIndex--;
          break;
      }
      this.activeSlide = this.slides[this.activeIndex];
    },
    changeSlide(id) {
      const index = this.slides.findIndex(slide => slide.id === id);
      this.activeIndex = index;
      this.activeSlide = this.slides[index];
    },
    numberToString(number) {
      return number.toString().length < 2 ? `0${number}` : number;
    },
  },

  components: {
    Menu,
  },
}
</script>
