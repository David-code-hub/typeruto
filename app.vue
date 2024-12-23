<template>
  <div class="bg-neutral-900 h-screen relative overflow-hidden">
    <div class="bg-green-300 w-20 h-20 blur-[6em] absolute"></div>
    <div class="py-7 px-4 mb-0 w-full">
      <div class="max-w-screen-lg flex justify-between items-center mx-auto">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-green-300 to-green-800 bg-clip-text text-transparent"
        >
          Typeru
        </h1>

        <button
          class="text-sm focus:outline-none focus:ring-1 focus:ring-green-300 duration-300 hover:bg-neutral-800 p-2 rounded-full flex gap-1 items-center text-gray-200"
        >
          <Icon name="uil:sun" class="size-8" />
        </button>
      </div>
    </div>
    <div class="max-w-screen-lg px-4 flex flex-col items-center mx-auto mt-16">
      <Keyboard />
      <Attributions />
    </div>
  </div>
</template>
