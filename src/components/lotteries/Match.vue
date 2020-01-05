<template>
  <div class="max-w-md m-auto py-10">
    <loading :active.sync="isl_loading"
        :can-cancel="false"
        :is-full-page="true"
        :color="'#3be8b0'"
        :backgroundColor="'#f1f2f3'"></loading>
    <h3 class="font-mono font-regular text-3xl mb-4">Сугалааны тохирол</h3>
    <hr class="border border-grey-light my-6" />
    <div class="flex flex-row justify-center my-6">
        <div class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6 rounded h-16">
            {{digitArr[0]}}
        </div>
        <div class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6 rounded h-16">
            {{digitArr[1]}}
        </div>
        <div class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6 rounded h-16">
            {{digitArr[2]}}
        </div>
        <div class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6 rounded h-16">
            {{digitArr[3]}}
        </div>
        <div class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6 rounded h-16">
            {{digitArr[4]}}
        </div>
        <div class="text-center text-3xl border-black border-solid border-2 px-4 py-2 m-2 w-1/6 rounded h-16">
            {{digitArr[5]}}
        </div>
    </div>
    <div class="flex justify-center">
        <button v-on:click="match" class="font-sans font-bold py-2 px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-1/4 py-4 text-white items-center justify-center">
            Шалгаруулах
        </button>
    </div>
    <hr class="border border-grey-light my-6" />
    <div class="flex justify-center">
        <table class="border-separate border-2 w-full">
            <thead>
                <tr>
                    <th class="border px-4 py-2">Сугалааны дугаар</th>
                    <th class="border px-4 py-2">Хэрэглэгч</th>
                    <th class="border px-4 py-2">Утас</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lottery) in matches" :key="lottery.lottery_number" :lottery="lottery">
                    <td class="border px-4 py-2">
                        <p class="block flex font-mono font-semibold flex items-center">
                            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 24 24" width="24" height="24"><title>record vinyl</title><path d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" ></path></svg>
                            {{lottery.lottery_number}}
                        </p>
                    </td>
                    <td class="border px-4 py-2">{{lottery.fullname}}</td>
                    <td class="border px-4 py-2">{{lottery.phone_number}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Match',
  created () {
    document.title = 'Сугалааны тохирол'
    this.getLotteries()
  },
  data () {
    return {
      requested: null,
      isl_loading: true,
      isi_loading: false,
      digitArr: [null, null, null, null, null, null],
      lotteries: [],
      matches: [],
      item: [],
      is_final: false,
      error: ''
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    async match (e) {
      e.preventDefault()
      if (this.matches.length >= 5) {
        this.$swal({
          title: 'Тохиролын тоо дууссан байна',
          icon: 'warning',
          confirmButtonText: 'За'
        })
      } else {
        const min = 1
        const max = this.lotteries.length
        let matched = Math.round(Math.random() * (max - min) + min) - 1
        console.log(matched)
        this.digitArr = ('' + this.lotteries[matched].lottery_number).split('')
        await this.setMatch(this.lotteries[matched])
        this.lotteries.splice(matched, 1)
      }
    },
    setMatch (lottery) {
      let item = this.items.find(it => it.phone_number === lottery.phone_number)
      console.log(item)
      this.matches.push({
        lottery_number: lottery.lottery_number,
        phone_number: lottery.phone_number,
        fullname: item.surname.concat('.', item.name)
      })
    },
    getLotteries () {
      this.isl_loading = true
      this.$http.secured.get('/api/v1/lotteries')
        .then(response => {
          this.lotteries = response.data
          this.requested = true
          this.isl_loading = false
        })
        .catch(error => {
          this.setError(error, 'Хүсэлтэд алдаа гарлаа')
          this.requested = false
          this.isl_loading = false
        })
      this.isi_loading = true
      this.$http.secured.get('/api/v1/items')
        .then(response => {
          this.items = response.data
          this.requested = true
          this.isi_loading = false
        })
        .catch(error => {
          this.setError(error, 'Хүсэлтэд алдаа гарлаа')
          this.requested = false
          this.isi_loading = false
        })
    }
  }
}
</script>
