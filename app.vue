<template>
  <div class="bg-neutral-900 h-screen">
    <div class="bg-green-300 w-20 h-20 blur-[6em] absolute"></div>

    <!-- <div
      class="bottom-0 right-0 bg-green-300 w-11 h-11 blur-[3em] absolute"
    ></div> -->
    <div class="py-4 px-4 mb-10 w-full">
      <div class="max-w-screen-lg flex justify-between items-center mx-auto">
        <h1 class="font-bold text-2xl flex gap-2 text-gray-200">
          <Icon name="simple-line-icons:fire" class="size-8 text-green-300" />

          Typeru
        </h1>
        <a
          href="https://github.com/David-code-hub/type_speed_test"
          target="_blank"
          class="text-sm duration-300 hover:bg-neutral-900 p-2 rounded-full flex gap-1 items-center text-gray-200"
        >
          <Icon name="simple-icons:github" class="size-6" />
        </a>
      </div>
    </div>
    <div class="max-w-screen-lg px-4 flex flex-col items-center mx-auto mt-20">
      <Keyboard />
      <Attributions />
    </div>
  </div>
</template>
