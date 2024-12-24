<template>
  <div class="bg-neutral-900 h-screen relative overflow-hidden">
    <div class="bg-orange-400 w-20 h-20 blur-[6em] absolute"></div>
    <div class="py-7 px-4 mb-0 w-full">
      <div class="max-w-screen-lg flex justify-between items-center mx-auto">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-800 bg-clip-text text-transparent"
        >
          Typeruto
        </h1>

        <button
          class="text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 duration-300 hover:bg-neutral-800 p-2 rounded-full flex gap-1 items-center text-gray-200"
        >
          <Icon name="uil:sun" class="size-8" />
        </button>
      </div>
    </div>
    <!--hero section-->
    <div class="px-4 mx-auto text-center">
      <h1 class="font-semibold text-3xl text-gray-300 capitalize">
        What's your rank?
      </h1>
      <p class="text-md text-gray-400 mt-2">
        Test your typing speed with naruto quotes!
      </p>
      <div class="flex mt-4 items-center justify-center">
        <img
          src="@public/images/characters/naruto.jpg"
          class="h-10 w-10 rounded-full object-cover border border-white"
          alt="naruto anime character"
        />
        <img
          src="@public/images/characters/neji.jpg"
          class="h-10 w-10 rounded-full object-cover border border-white -ml-5"
          alt="naruto anime character"
        />
        <img
          src="@public/images/characters/nagato.jpg"
          class="h-10 w-10 rounded-full object-cover border border-white -ml-5"
          alt="naruto anime character"
        />
        <span class="text-gray-400 text-sm ml-2">40+ quotes</span>
      </div>
    </div>
    <div class="max-w-screen-lg px-4 flex flex-col items-center mx-auto mt-16">
      <Keyboard />
      <Attributions />
    </div>
  </div>
</template>
