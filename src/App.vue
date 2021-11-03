<script>
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbLink,
  CBreadcrumbSeparator,
} from "@chakra-ui/vue-next"

export default {
  name: "App",

  components: {
    CBreadcrumb,
    CBreadcrumbItem,
    CBreadcrumbLink,
    CBreadcrumbSeparator,
  },

  data: _ => ({
    ADDRESS_ENDPOINT: 'https://api.lob.com/v1/addresses',
    LOB_KEY: import.meta.env.VITE_LOB_KEY,
    POSTCARD_BACK: import.meta.env.VITE_POSTCARD_TEMPLATE_BACK,
    POSTCARD_FRONT_BEACH: import.meta.env.VITE_POSTCARD_TEMPLATE_FRONT_BEACH,
    POSTCARD_FRONT_JUNGLE: import.meta.env.VITE_POSTCARD_TEMPLATE_FRONT_JUNGLE,
    currentPage: 'PostcardDesigner',
    recipientAddressId: {},
  }),

  methods: {
    isCurrentPage(pageName) {
      return this.currentPage === pageName
    },
    isAddressBookActive() {
      return this.isCurrentPage('AddressBook')
    },
    isOverviewActive() {
      return this.isCurrentPage('AppOverview')
    },
    isPostcardActive() {
      return this.isCurrentPage('PostcardDesigner')
    }
  },

  watch: {
    $route(to, from) {
      if (to?.params?.id) this.recipientAddressId = to.params.id
      else this.recipientAddressId = ''
    }
  }
}
</script>

<template>
  <c-breadcrumb>
    <c-breadcrumb-item :isCurrentPage="isOverviewActive()">
      <c-breadcrumb-link as="router-link" to="/">App Overview</c-breadcrumb-link>
    </c-breadcrumb-item>
    <c-breadcrumb-item :isCurrentPage="isPostcardActive()">
      <c-breadcrumb-link as="router-link" to="/postcard-designer">Postcard Designer</c-breadcrumb-link>
    </c-breadcrumb-item>
    <c-breadcrumb-item :isCurrentPage="isAddressBookActive()">
      <c-breadcrumb-link as="router-link" to="/address-book">Address Book</c-breadcrumb-link>
    </c-breadcrumb-item>
  </c-breadcrumb>

  <router-view
    :ADDRESS_ENDPOINT="ADDRESS_ENDPOINT"
    :LOB_KEY="LOB_KEY"
    :POSTCARD_BACK="POSTCARD_BACK"
    :POSTCARD_FRONT_BEACH="POSTCARD_FRONT_BEACH"
    :POSTCARD_FRONT_JUNGLE="POSTCARD_FRONT_JUNGLE"
    :recipientAddressId="recipientAddressId"
  />
</template>

<style lang="scss">
.chakra-breadcrumb__link {
  color: rgb(67, 97, 153);
}

.router-link-active {
  color: rgb(0, 195, 255);
  font-weight: 630;
  text-decoration: underline;
}
</style>