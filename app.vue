<template>
  <div class="max-w-screen-lg flex flex-col items-center mx-auto mt-20">
    <div class="mb-10 flex justify-between w-full items-center">
      <h1 class="font-bold text-3xl flex gap-2">
        <Icon name="simple-line-icons:speedometer" class="size-8" />

        Typeru
      </h1>

      <a
        href="https://github.com/David-code-hub/type_speed_test"
        target="_blank"
        class="text-sm duration-300 hover:bg-gray-100 p-2 rounded-full flex gap-1 items-center"
      >
        <Icon name="simple-icons:github" class="size-6" />
      </a>
    </div>
    <Keyboard />
  </div>
</template>
