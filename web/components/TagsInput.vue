<template>
  <div class="relative">
    <div class="tags-input">
      <span class="tags-input-tag" v-for="tag in tags" :key="tag._id">
        <span>{{ tag.name }}</span>
        <button type="button" class="tags-input-remove" @click="removeTag(tag)">
          &times;
        </button>
      </span>

      <input
        v-model="newTag"
        class="tags-input-text"
        placeholder="Add tag..."
        @keyup="FilterTags"
        @onblur="
          {
            show = false;
          }
        "
      />
    </div>
    <div
      v-if="show"
      id="dropdown"
      class="absolute top-14 left-0 shadow bg-white w-full max-h-40 rounded overflow-y-auto"
    >
      <div class="flex flex-col w-full">
        <div
          v-for="(tag, index) in filteredTags"
          :key="index"
          class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
        >
          <div
            @click="addTag(tag)"
            class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-gray-400"
          >
            <div class="w-full items-center flex">
              <div class="mx-2 leading-6">{{ tag.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      newTag: "",
      tagList: [],
      filteredTags: [],
      show: false,
    };
  },
  async fetch() {
    await this.getTagList();
    this.filteredTags = this.tagList;
  },
  methods: {
    addTag(tag) {
      this.tags.push(tag);
      this.newTag = "";
      this.show = false;
    },

    removeTag(tag) {
      this.tags = this.tags.filter((t) => t !== tag);
    },

    async getTagList() {
      const res = await this.$axios.$get("/tag");
      if (res.code === 0) {
        this.tagList = res.data.tagList;
      }
    },

    FilterTags() {
      this.show = true;
      this.filteredTags = this.tagList.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.newTag.toLowerCase()) >= 0
        );
      });
    },
  },
};
</script>

<style scoped>
.tags-input {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-width: 1px;
  border-radius: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
}

.tags-input-tag {
  display: inline-flex;
  line-height: 1;
  align-items: center;
  font-size: 0.875rem;
  background-color: #bcdefa;
  color: #1c3d5a;
  border-radius: 0.25rem;
  user-select: none;
  padding: 0.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
}

.tags-input-tag:last-of-type {
  margin-right: 0;
}

.tags-input-remove {
  color: #2779bd;
  font-size: 1.125rem;
  line-height: 1;
}

.tags-input-remove:first-child {
  margin-right: 0.25rem;
}

.tags-input-remove:last-child {
  margin-left: 0.25rem;
}

.tags-input-remove:focus {
  outline: 0;
}

.tags-input-text {
  flex: 1;
  outline: 0;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
  min-width: 10rem;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>
