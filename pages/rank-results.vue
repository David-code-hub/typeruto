<template>
  <div class="mt-16 max-w-lg">
    <div
      class="grid grid-cols-3 gap-5 items-center bg-neutral-800 px-4 py-4 rounded-xl"
    >
      <div class="col-span-1">
        <div class="overflow-hidden w-fit rounded-full group">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExend5ZTJuaHNjMjVtMXRsMG0wd2g1ZXkyYjd3MjlrdWtxeHFpdmE2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/141u78GarhcaRO/giphy.webp"
            class="h-24 w-24 object-cover rounded-full duration-300 group-hover:scale-125"
            alt="itachi avatar"
          />
        </div>
      </div>
      <div class="col-span-2 flex flex-col gap-2 text-sm">
        <p class="text-gray-400">
          <span> Rank : </span>
          <span class="font-semibold"> Missing-nin </span>
        </p>
        <p class="text-gray-400">
          <span> WPM : </span>
          <span class="font-semibold"> 94 </span>
        </p>
        <p class="text-gray-400">
          <span> Ninja : </span>
          <span class="font-semibold"> Itachi Uchiha </span>
        </p>
      </div>
    </div>
    <p
      class="text-gray-400 text-md mt-12 flex items-center gap-2 justify-center"
    >
      Press
      <span
        class="border border-gray-400 bg-slate-800 rounded-lg px-2 py-1 text-sm font-mono w-fit flex items-center"
      >
        Enter
      </span>
      to go back.
    </p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

onMounted(() => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") router.push("/");
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", () => {});
});
</script>

<style lang="scss" scoped></style>
