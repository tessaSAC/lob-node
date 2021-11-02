<script>
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbLink,
  CBreadcrumbSeparator,
} from "@chakra-ui/vue-next";
export default {
  name: "App",

  components: {
    CBreadcrumb,
    CBreadcrumbItem,
    CBreadcrumbLink,
    CBreadcrumbSeparator,
  }
};
</script>

<template>
  <c-breadcrumb :add-separator="false">
    <c-breadcrumb-item>
      <c-breadcrumb-link href="#">Breadcrumb 1</c-breadcrumb-link>
      <c-breadcrumb-separator color="tomato" font-size="10px" font-weight="bold" />
    </c-breadcrumb-item>
    <c-breadcrumb-item>
      <c-breadcrumb-link href="#">Breadcrumb 2</c-breadcrumb-link>
      <c-breadcrumb-separator color="firebrick" font-size="20px" />
    </c-breadcrumb-item>
    <c-breadcrumb-item isCurrentPage>
      <c-breadcrumb-link href="#">Breadcrumb 2</c-breadcrumb-link>
    </c-breadcrumb-item>
  </c-breadcrumb>

  <router-view />
</template>