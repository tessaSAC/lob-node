<script>
import {
  CHeading,
  CText,
} from '@chakra-ui/vue-next'

export default {
  components: {
    CHeading,
    CText,
  },
}
</script>

<template>
  <c-heading as="h1">App overview</c-heading>
  <c-heading as="h2" size="2">About the app</c-heading>
  <c-text :mt="4">
    This web app covers usage of several of Lob's APIs and features, including its
    <code>postcards</code>,
    <code>addresses</code>, and
    <code>templates</code> endpoints.
  </c-text>

  <c-text :mt="4">
    Users can add and browse existing addresses in the
    <router-link to="/address-book">Address Book</router-link>&nbsp;tab and create postcards to send them in
    <router-link to="/postcard-designer">Postcard Designer</router-link>.
  </c-text>

  <c-text :mt="4">
    You can check out the deployed app
    <a href="https://postcard-designer.netlify.app">here</a>.
  </c-text>

  <c-heading as="h2" size="2">Technologies used</c-heading>
  <c-text :mt="4">
    This app was built with
    <a href="https://v3.vuejs.org" target="_blank">Vue.js 3</a>,
    <a href="https://router.vuejs.org" target="_blank">Vue Router</a>, and
    <a href="https://vitejs.dev" target="_blank">Vite</a>, and leveraged
    <a href="https://vue.chakra-ui.com" target="_blank">Chakra UI</a> to keep components as accessible as reasonably possible within the challenge's bounds.
  </c-text>

  <c-heading as="h2" size="2">Challenges</c-heading>
  <c-text :mt="4">
    Because Vite expects and/or transpiles all modules to be in the ESM format, using it engendered additional challenges including relying on the
    <a
      href="https://next.vue.chakra-ui.com"
      target="_blank"
    >
      undocumented
      <code>next</code> version of Chakra
    </a> and forgoing the use of the
    <a
      href="https://docs.lob.com/#tag/SDKs-and-Tools"
      target="_blank"
    >Lob "SDK"</a>.
  </c-text>

  <c-text
    :mt="4"
  >It also seems like there may not be a way to programmatically show the user a preview of their new postcard without setting up webhooks or using hacky workarounds, because the PDF link is returned before the postcard has been generated.</c-text>

  <c-text :mt="4">
    Last but certainly not least, this assignment comprised a large number of tasks, requirements, and considerations, and instructions and key information was scattered across multiple places within the
    <a
      href="https://dashboard.lob.com"
      target="_blank"
    >Dashboard</a>,
    <a href="https://docs.lob.com" target="_blank">API Docs</a>, and
    <a href="https://www.lob.com/guides" target="_blank">Guides</a>, leading to a disjointed developer experience, especially developing a client-side app without the SDK. In particular, the templating task was written about in an oddly non-technical way and key information was obscured by Lob's information architecture. Having an overview page within the app also seems like an unusual choice.
  </c-text>

  <c-heading as="h2" size="2">Running the app</c-heading>

  <c-text :mt="4">
    To run the app locally, clone the repo and in its directory, run
    <code>npm i</code> to install the relevant libraries.
  </c-text>

  <c-text :mt="4">
    Then create a
    <code>.env.local</code> file in the project's top-level folder with the following variables (replacing with your own keys where appropriate):
    <pre><code>
    # .env.local
    VITE_LOB_KEY = your_test_key
    VITE_POSTCARD_TEMPLATE_BACK = your_back_template_key
    VITE_POSTCARD_TEMPLATE_FRONT_BEACH = your_front_beach_template_key
    VITE_POSTCARD_TEMPLATE_FRONT_JUNGLE = your_front_jungle_template_key
    </code></pre>(This guide presumes you already have your own
    <a
      href="https://www.lob.com/guides#html_and_merge"
      target="_blank"
    >postcard templates</a> created.)
  </c-text>

  <c-text :mt="4">
    Finally, run
    <code>npm run dev</code> and navigate to
    <a href="http://localhost:3000">http://localhost:3000</a> to see the app in action!
  </c-text>
</template>

<style scoped>
h1 {
  margin: 3rem 0 0;
}

h2 {
  margin-top: 2.5rem;
}

a {
  color: #42b983;
}
</style>
