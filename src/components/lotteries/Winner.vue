<template>
  <div class="max-w-md m-auto py-10">
    <h3 class="font-mono font-regular text-3xl mb-4">Сугалааны тохирол</h3>

    <hr class="border border-grey-light my-6" />
    <div class="text-red" v-if="error">{{ error }}</div>

    <form @submit.prevent="getCandidate">
      <div class="flex flex-row justify-center border-black">
        <input maxlength="1" pattern="([1234567890])\w{0}" v-model.number = "digitArr[0]" class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6">
        <input maxlength="1" pattern="([1234567890])\w{0}" v-model.number = "digitArr[1]" class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6">
        <input maxlength="1" pattern="([1234567890])\w{0}" v-model.number = "digitArr[2]" class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6">
        <input maxlength="1" pattern="([1234567890])\w{0}" v-model.number = "digitArr[3]" class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6">
        <input maxlength="1" pattern="([1234567890])\w{0}" v-model.number = "digitArr[4]" class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6">
        <input maxlength="1" pattern="([1234567890])\w{0}" v-model.number = "digitArr[5]" class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6">
      </div>
      <div class="flex justify-center py-4">
        <input type="submit" value="шалгах" class="font-sans font-bold py-2 px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-1/4 py-4 text-white items-center justify-center">
      </div>
      <hr class="border border-grey-light my-6" />
      <strong>Боломжит оролцогчдын тоо:</strong>
      <h3 class="font-mono font-regular text-3xl mb-4">{{lotteries.length}}</h3>

      <ul class="list-reset mt-4" v-if="lotteries.length <= 10">
        <p style="color:red;" v-if="lotteries.length == 0 && requested">Сугалаа олдсонгүй</p>
        <li class="py-4" v-for="(lottery, index) in lotteries" :key="lottery.lottery_number" :lottery="lottery">
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

      <strong v-if="is_final">Азтан:</strong>
      <h3 v-if="is_final" class="font-mono font-regular text-3xl mb-4">{{censored_number}}</h3>
    </form>
  </div>
</template>

<style lang="scss">
  @import "../../assets/css/winner.css";
</style>

<script>
export default {
  name: 'Winner',
  created () {
    document.title = 'Сугалааны азтан шалгаруулах'
  },
  data () {
    return {
      requested: null,
      digitArr: [null, null, null, null, null, null],
      lotteries: [],
      phone_number: '',
      censored_number: '',
      is_final: false,
      error: ''
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getCandidate (e) {
      e.preventDefault()
      var tmpDigits = ''
      this.digitArr.forEach(function (element) {
        if (element !== '' && element !== null) {
          tmpDigits += element
        }
      })
      if (tmpDigits.length === 6) {
        this.is_final = true
      }
      this.$http.secured.get('/api/v1/candidates/' + tmpDigits)
        .then(response => {
          this.lotteries = response.data
          this.requested = true
          this.phone_number = this.lotteries[0]['phone_number']
          this.censored_number = this.phone_number.slice(0, -2) + '**'
          this.setError(this.error, '')
        })
        .catch(error => { this.setError(error, 'Сугалааны мэдээллийг хүлээн авч чадсангүй!'); this.requested = false })
    }
  }
}
</script>
