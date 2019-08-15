<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Сугалааны мэдээлэл шалгах</h3>

    <form @submit.prevent="getLottery">
      <div class="mb-6">
        <input
          type="text"
          id="record_title"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="8 оронтой утасны дугаар оруулна уу"
          v-model="queryLottery.phone_number">
      </div>

      <input type="submit" value="шалгах" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 text-white items-center justify-center">
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <p>Нийт сугалааны тоо: {{ lotteries.length }}</p>
      <li class="py-4" v-for="(lottery, index) in lotteries" :key="lottery.phone_number" :lottery="lottery">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex justify-between flex-wrap pr-4">
          <p class="block flex font-mono font-semibold flex items-center">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 24 24" width="24" height="24"><title>record vinyl</title><path d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" ></path></svg>
            {{ index + 1 }} &mdash; {{ lottery.lottery_number }}
          </p>
        </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Lotteries',
  data () {
    return {
      queryLottery: [],
      lotteries: [],
      error: ''
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getLottery () {
      this.$http.secured.get('/api/v1/lotteries/' + this.queryLottery.phone_number)
        .then(response => { this.lotteries = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  }
}
</script>
