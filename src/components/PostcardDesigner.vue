<script>
import router from '../router'
import { v4 as uuidv4 } from 'uuid'

import {
  CBox,
  CButton,
  CHeading,
  CText
} from '@chakra-ui/vue-next'

export default {
  components: {
    CBox,
    CButton,
    CHeading,
    CText
  },

  props: ['ADDRESS_ENDPOINT', 'LOB_KEY', 'recipientAddressId'],

  data: _ => ({
    postcardBack: import.meta.env.VITE_POSTCARD_TEMPLATE_BACK,
    postcardFront_beach: import.meta.env.VITE_POSTCARD_TEMPLATE_FRONT_BEACH,
    postcardFront_jungle: import.meta.env.VITE_POSTCARD_TEMPLATE_FRONT_JUNGLE,
    idempotencyKey: uuidv4(),

    postcard: {
      message: '',
      image: '',
      fontSize: '',
      fontColor: '',
    },

    recipientAddress: {
      id: '',
      description: '',
      name: '',
      company: '',
      address_line1: '',
      address_line2: '',
      address_city: '',
      address_state: '',
      address_zip: '',
      address_country: ''
    }
  }),

  computed: {
    isPostcardReadyForPreview() {
      return !!(
        this.postcard.message &&
        this.postcard.image &&
        this.postcard.fontSize &&
        this.postcard.fontColor &&

        this.recipientAddress.description &&
        this.recipientAddress.name &&
        this.recipientAddress.address_line1 &&
        this.recipientAddress.address_city &&
        this.recipientAddress.address_state &&
        this.recipientAddress.address_zip &&
        this.recipientAddress.address_country
      )
    },

    postcardFrontDesign() {
      if (!this.postcard.image) return
      if (this.postcard.image.toLowerCase() === 'beach') return this.postcardFront_beach
      return this.postcardFront_jungle
    }
  },

  methods: {
    getAddress(id) {
      let endpoint = `${this.ADDRESS_ENDPOINT}/${id}`

      fetch(endpoint, {
        method: 'GET',
        headers: new Headers({
          "Authorization": `Basic ` + btoa(`${this.LOB_KEY}:`)
        }),
      }).then(response => {
        if (!response.ok) throw new Error(response.status)
        return response.json()
      }).then(({
        id,
        description,
        name,
        company,
        address_line1,
        address_line2,
        address_city,
        address_state,
        address_zip,
        address_country
      }) => {
        this.recipientAddress = {
          id,
          description,
          name,
          company,
          address_line1,
          address_line2,
          address_city,
          address_state,
          address_zip,
          address_country
        }
      })
    },

    goToAddressBook() {
      router.push({
        path: 'address-book',
      })
    },

    previewPostcard() {
      const postcardData = {
        description: 'Preview postcard',
        to: this.recipientAddressId,
        back: encodeURI(this.postcardBack),
        front: encodeURI(this.postcardFrontDesign),
        merge_variables: {
          name: this.recipientAddress.name,
          message: this.postcard.message,
          size: this.postcard.fontSize,
          color: this.postcard.fontColor,
        }
      }

      console.log(JSON.stringify(postcardData))

      fetch('https://api.lob.com/v1/postcards', {
        method: 'POST',
        headers: new Headers({
          // 'Access-Control-Allow-Origin': 'localhost:3000/*',
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(`${this.LOB_KEY}:`),
          // 'Idempotency-Key': this.idempotencyKey
        }),
        body: JSON.stringify(postcardData) // body data type must match "Content-Type" header
      }).then(response => {
        if (!response.ok) throw new Error(response.status)
        console.log('Postcard data sent to preview API!')

        return response.json()
      }).then(({ url }) => {
        console.log({ url })
        window.open(url) //TODO figure this out
      })
    },
  },

  created() {
    console.log(this.recipientAddressId)
    if (this.recipientAddressId) this.getAddress(this.recipientAddressId)
  },
}
</script>

<template>
  <form class="wrapper">
    <div class="box title">
      <c-heading as="h1">Postcard Designer</c-heading>
    </div>
    <div class="box message">
      <fieldset v-if="recipientAddress.id">
        <label for="postcard-message">
          <c-heading as="h2" size="2">Postcard message (required)</c-heading>
          <textarea v-model="postcard.message" id="postcard-message" required></textarea>
        </label>
      </fieldset>

      <c-heading v-else as="h2" size="2" color="red">Add a recipient to get started 👉</c-heading>
    </div>
    <div class="box address">
      <c-heading as="h2" size="2">Recipient address</c-heading>
      <template v-if="recipientAddress.id">
        <c-heading size="3" as="h3">{{ recipientAddress.name }}</c-heading>
        <c-text :mt="4">{{ recipientAddress.address_line1 }}</c-text>
        <c-text :mt="4">{{ recipientAddress.address_line2 }}</c-text>
        <c-text
          :mt="4"
        >{{ `${recipientAddress.address_city}, ${recipientAddress.address_state} ${recipientAddress.address_zip}` }}</c-text>
        <c-text :mt="4">{{ recipientAddress.address_country }}</c-text>

        <c-button
          class="buttonAddress"
          colorScheme="purple"
          variant="outline"
          @click="goToAddressBook"
        >Change recipient</c-button>
      </template>

      <!-- Programmatic style change doesn't work -->
      <c-button
        v-else
        class="buttonAddress"
        colorScheme="purple"
        variant="solid"
        @click="goToAddressBook"
      >Add recipient</c-button>
    </div>
    <div class="box design">
      <c-heading as="h2" size="2">Design options</c-heading>
      <fieldset :disabled="!recipientAddress.id">
        <label for="postcard-image">
          <c-heading size="3" as="h3">Postcard image</c-heading>
          <select v-model="postcard.image" id="postcard-image" required>
            <option disabled value>Select the postcard photo</option>
            <option>Beach</option>
            <option>Jungle</option>
          </select>
        </label>

        <label for="postcard-fontSize">
          <c-heading size="3" as="h3">Message font size</c-heading>
          <select v-model="postcard.fontSize" id="postcard-fontSize" required>
            <option disabled value>Select the message font size</option>
            <option>16px</option>
            <option>20px</option>
            <option>24px</option>
          </select>
        </label>

        <label for="postcard-fontColor">
          <c-heading size="3" as="h3">Message text color</c-heading>
          <select v-model="postcard.fontColor" id="postcard-fontColor" required>
            <option disabled value>Select the message text color</option>
            <option>Blue</option>
            <option>Red</option>
            <option>Green</option>
          </select>
        </label>
      </fieldset>
    </div>

    <c-button
      class="buttonPreviewPostcard"
      colorScheme="green"
      :disabled="!isPostcardReadyForPreview"
      type="submit"
      variant="solid"
      @click.prevent="previewPostcard"
    >Preview postcard</c-button>
  </form>
</template>

<style lang="scss" scoped>
h1 {
  margin: 1rem 0;
}

h2 {
  margin: 0.5rem 0 0.8rem;
}

h3 {
  margin: 1rem 0 0.3rem;
  font-size: 1.2rem;
}

fieldset {
  border: none;
}

label {
  display: flex;
  flex-direction: column;
}
textarea {
  margin-top: 0.5rem;
}

.wrapper {
  margin: 2rem;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [col1-start] 1fr [col2-start] 1fr [col2-end];
  grid-template-rows: [row1-start] auto [row2-start] auto [row3-start] auto [row3-end];
  background-color: #fff;
  color: #444;
}

.box {
  background-color: rgb(255, 228, 237);
  color: rgb(26, 80, 26);
  border-radius: 5px;
  padding: 10px 20px;
}

.title {
  grid-column: col1-start / col2-end;
  grid-row: row1-start;
}
.message {
  grid-column: col1-start / col2-start;
  grid-row: row2-start / row3-end;
}
.address {
  grid-column: col2-start;
  grid-row: row2-start / row3-start;

  p {
    margin: 0;
    margin-bottom: 0.2rem;
  }

  .buttonAddress {
    margin: 0.5rem 0;
  }
}
.design {
  grid-column: col2-start;
  grid-row: row3-start;
}
</style>
