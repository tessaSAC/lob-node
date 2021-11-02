<script>
import { CBox, CButton, CFlex, CHeading, CStack, CText } from '@chakra-ui/vue-next'
const LOB_KEY = import.meta.env.VITE_LOB_KEY

export default {
  components: {
    CBox,
    CButton,
    CFlex,
    CHeading,
    CStack,
    CText
  },

  data: _ => ({
    addressList: [],
    nextPageUrl: '',
    previousPageUrl: ''
  }),

  methods: {
    getAddresses(url) {
      let endpoint = url ? url : 'https://api.lob.com/v1/addresses'
      fetch(`${url}/?limit=10`, {
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
              "description": "Harry - Home",
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
  <c-stack>
    <c-box :spacing="5" :p="5" shadow="md" border-width="1px">
      <c-button colorScheme="purple" class="addContact" variant="ghost">Add new contact</c-button>
    </c-box>
    <template v-if="addressList.length">
      <c-box
        v-for="{ id, description, name, company, address_line1, address_line2, address_city, address_state, address_zip, address_country } in addressList"
        :spacing="5"
        :p="5"
        shadow="md"
        border-width="1px"
      >
        <c-heading as="h2">{{ description }}</c-heading>
        <c-heading size="2" as="h3">{{ name }}</c-heading>
        <c-text :mt="4">{{ address_line1 }}</c-text>
        <c-text :mt="4">{{ address_line2 }}</c-text>
        <c-text :mt="4">{{ `${address_city}, ${address_state} ${address_zip}` }}</c-text>
        <c-text :mt="4">{{ address_country }}</c-text>

        <c-button class="buttonMail" colorScheme="green" variant="outline">
          Send&nbsp;
          <span class="emphasis">{{ description }}</span>
          &nbsp;a postcard!
        </c-button>
      </c-box>
    </template>
  </c-stack>
  <c-flex bg="gray.50" align="center" justify="space-between">
    <c-button
      v-if="previousPageUrl"
      colorScheme="blue"
      variant="ghost"
      @click="getAddresses(previousPageUrl)"
    >Previous Page</c-button>
    <c-button
      v-if="nextPageUrl"
      colorScheme="blue"
      variant="ghost"
      @click="getAddresses(nextPageUrl)"
    >Next Page</c-button>
  </c-flex>
</template>

<style lang="scss" scoped>
.addContact {
  border: none; // No docs for @chakra-ui/vue-next styles
  font-size: 1.2rem;
  color: darkgrey;
  text-decoration: pink underline;
}

h1,
h2,
h3 {
  margin-bottom: 0.4rem;
}

p {
  margin: 0;
}

.buttonMail {
  margin-top: 1rem;
  font-weight: 500;

  .emphasis {
    font-weight: 600;
    font-style: italic;
  }
}

.chakra-flex {
  margin-top: 0.5rem;
  padding: 0.5rem;
}
</style>
