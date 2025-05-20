<template>
  <div>
    <div class="w-full bg-neutral-800 p-7 rounded-2xl mt-10">
      <div
        class="grid grid-cols-3 gap-7 mb-3 items-center"
        v-for="rank in ninjaSpeedRanks"
        :key="rank.rank"
      >
        <div class="col-span-1">
          <p
            class="text-lg"
            :class="[
              rank.rank === 'S-Class'
                ? 'text-yellow-400 font-bold'
                : 'text-gray-300',
            ]"
          >
            {{ rank.rank }}
          </p>
        </div>

        <div>
          <p class="text-orange-400 text-base">{{ rank.speed }} wpm</p>
        </div>
        <div class="flex items-center justify-center">
          <img
            v-for="ninja in rank.ninjas"
            :key="ninja"
            :src="`/images/characters/${
              ninja?.split(' ')?.length || 0 > 1
                ? ninja.split(' ')[0].toLowerCase()
                : ninja?.toLowerCase()
            }.jpg`"
            class="h-10 w-10 rounded-full object-cover border border-white -ml-3"
            :alt="`${ninja} character`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
