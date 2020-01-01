<template>
  <div class="max-w-md m-auto py-10">
    <h3 class="font-mono font-regular text-3xl mb-4">Сугалааны тохирол</h3>

    <hr class="border border-grey-light my-6" />
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
      <div class="text-red" v-if="error">{{ error }}</div>
      <h3 class="font-mono font-regular text-3xl mb-4">{{output}}</h3>
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
      output: '',
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
          this.output = this.lotteries.length
          this.phone_number = this.lotteries[0]['phone_number']
          this.censored_number = this.phone_number.slice(0, -2) + '**'
          this.setError(this.error, '')
        })
        .catch(error => { this.setError(error, 'Тохирол олдсонгүй'); this.requested = false })
    }
  }
}
</script>
