<script>
const LOB_KEY = import.meta.env.VITE_LOB_KEY

export default {
  data: _ => ({
    addressList: []
  }),

  methods: {
    getAddresses() {
      fetch('https://api.lob.com/v1/addresses/?limit=2', {
        headers: new Headers({
          "Authorization": `Basic ` + btoa(`${LOB_KEY}:`)
        }),
      }).then(response => {
        if (!response.ok) throw new Error(response.status);
        this.addressList = {
          "data": [
            {
              "id": "adr_e68217bd744d65c8",
              "description": "Harry - Office",
              "name": "HARRY ZHANG",
              "company": "LOB",
              "phone": "5555555555",
              "email": "harry@lob.com",
              "address_line1": "210 KING ST STE 6100",
              "address_line2": null,
              "address_city": "SAN FRANCISCO",
              "address_state": "CA",
              "address_zip": "94107-1741",
              "address_country": "UNITED STATES",
              "metadata": {},
              "date_created": "2019-08-12T00:16:00.361Z",
              "date_modified": "2019-08-12T00:16:00.361Z",
              "object": "address"
            },
            {
              "id": "adr_asdi2y3riuasasoi",
              "description": "Harry - Office",
              "name": "Harry Zhang",
              "company": "Lob",
              "phone": "5555555555",
              "email": "harry@lob.com",
              "metadata": {},
              "address_line1": "370 WATER ST",
              "address_line2": "",
              "address_city": "SUMMERSIDE",
              "address_state": "PRINCE EDWARD ISLAND",
              "address_zip": "C1N 1C4",
              "address_country": "CANADA",
              "date_created": "2019-09-20T00:14:00.361Z",
              "date_modified": "2019-09-20T00:14:00.361Z",
              "object": "address"
            }
          ],
          "object": "list",
          "next_url": "https://api.lob.com/v1/addresses?limit=2&after=eyJkYXRlT2Zmc2V0IjoiMjAxOS0wOC0wN1QyMTo1OTo0Ni43NjRaIiwiaWRPZmZzZXQiOiJhZHJfODMwYmYwZWFiZGFhYTQwOSJ9",
          "previous_url": null,
          "count": 2
        }.data

        // return response.json();
      })
    }
  },

  created() {
    this.getAddresses()
  }
}
</script>

<template>
  <h1>Address Book</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
