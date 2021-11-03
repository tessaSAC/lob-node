<script>
import router from '../router'

import {
  CBox,
  CButton,
  CFlex,
  CHeading,
  CStack,
  CText
} from '@chakra-ui/vue-next'

export default {
  components: {
    CBox,
    CButton,
    CFlex,
    CHeading,
    CStack,
    CText
  },

  props: ['ADDRESS_ENDPOINT', 'LOB_KEY'],

  data: _ => ({
    addressList: [],
    isAddContactFormOpen: false,
    nextPageUrl: '',
    previousPageUrl: '',

    newContact: {
      description: '',
      name: '',
      address_line1: '',
      address_line2: '',
      address_city: '',
      address_state: '',
      address_zip: '',
      address_country: ''
    }
  }),

  computed: {
    isNewAddressValid() {
      return !!(this.newContact.description &&
        this.newContact.name &&
        this.newContact.address_line1 &&
        this.newContact.address_city &&
        this.newContact.address_state &&
        this.newContact.address_zip &&
        this.newContact.address_country)
    },
  },

  methods: {
    addNewContact() {
      fetch(this.ADDRESS_ENDPOINT, {
        method: 'POST',
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: new Headers({
          'Content-Type': 'application/json',
          "Authorization": `Basic ` + btoa(`${this.LOB_KEY}:`)
        }),
        body: JSON.stringify(this.newContact) // body data type must match "Content-Type" header
      }).then(response => {
        if (!response.ok) throw new Error(response.status)
        console.log('Addy added!')
        this.isAddContactFormOpen = false
        for (const key in this.newContact) {
          this.newContact[key] = ''
        }
      })
    },

    getAddresses(url) {
      let endpoint = url ? url : this.ADDRESS_ENDPOINT
      console.log({ endpoint })

      fetch(endpoint, {
        method: 'GET',
        headers: new Headers({
          "Authorization": `Basic ` + btoa(`${this.LOB_KEY}:`)
        }),
      }).then(response => {
        if (!response.ok) throw new Error(response.status)
        return response.json()
      }).then(({ data, next_url, previous_url }) => {
        console.log({ data, next_url, previous_url })
        this.addressList = data
        this.nextPageUrl = next_url
        this.previousPageUrl = previous_url
      })
    },

    openAddContactForm() {
      this.isAddContactFormOpen = true
    },

    sendPostcard(id) {
      router.push({
        name: 'PostcardDesigner',
        params: { id },
      })
    }
  },

  created() {
    this.getAddresses()
  }
}
</script>

<template>
  <c-heading as="h1">Address Book</c-heading>
  <c-stack>
    <c-box :spacing="5" :p="5" shadow="md" border-width="1px" @click="openAddContactForm">
      <c-button
        v-if="!isAddContactFormOpen"
        colorScheme="purple"
        class="openContactFormButton"
        variant="ghost"
        @click="openAddContactForm"
      >Add new contact</c-button>

      <form v-else>
        <c-flex class="form" bg="gray.50" direction="column">
          <label for="contact-description">
            Description
            <input
              v-model="newContact.description"
              id="contact-description"
              name="contact-description"
              required
              type="text"
            />
          </label>

          <label for="contact-name">
            Name
            <input
              v-model="newContact.name"
              id="contact-name"
              name="contact-name"
              required
              type="text"
            />
          </label>

          <label for="address_line1">
            Address line 1
            <input
              v-model="newContact.address_line1"
              id="address_line1"
              name="address_line1"
              required
              type="text"
            />
          </label>

          <label for="address_line2">
            Address line 2 (optional)
            <input
              v-model="newContact.address_line2"
              id="address_line2"
              name="address_line2"
              type="text"
            />
          </label>

          <label for="address_city">
            City
            <input
              v-model="newContact.address_city"
              id="address_city"
              name="address_city"
              required
              type="text"
            />
          </label>

          <label for="address_state">
            State
            <input
              v-model="newContact.address_state"
              id="address_state"
              name="address_state"
              required
              type="text"
            />
          </label>

          <label for="address_zip">
            Zip code
            <input
              v-model="newContact.address_zip"
              id="address_zip"
              name="address_zip"
              required
              type="text"
            />
          </label>

          <label for="address_country">
            Country
            <input
              v-model="newContact.address_country"
              id="address_country"
              name="address_country"
              required
              type="text"
            />
          </label>

          <c-button
            class="addContactButton"
            colorScheme="green"
            :disabled="!isNewAddressValid"
            type="submit"
            @click.prevent="addNewContact"
          >Add new contact</c-button>
        </c-flex>
      </form>
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

        <c-button
          class="buttonMail"
          colorScheme="green"
          variant="outline"
          @click="sendPostcard(id)"
        >
          Send&nbsp;
          <span class="emphasis">{{ description }}</span>
          &nbsp;a postcard!
        </c-button>
      </c-box>
    </template>
  </c-stack>
  <c-flex v-if="previousPageUrl || nextPageUrl" bg="gray.50" align="center" justify="space-between">
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
.chakra-flex.form {
  margin-top: 0;
  padding: 1rem;
}
label {
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  // max-width: 500px;
}

.openContactFormButton {
  border: none; // No docs for @chakra-ui/vue-next styles
  font-size: 1.2rem;
  color: darkgrey;
  text-decoration: pink underline;
}

.addContactButton {
  margin-top: 0.5rem;
  max-width: 300px;
  align-self: flex-end;
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
