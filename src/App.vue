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
    currentPage: 'PostcardDesigner',
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
  }
};
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

  <router-view />
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