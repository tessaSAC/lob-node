# App overview



## About the app

This web app covers usage of several of Lob's APIs and features, including its `postcards`, `addresses`, and `templates` endpoints.

Users can add and browse existing addresses in the [Address Book](https://postcard-designer.netlify.app/address-book) tab and create postcards to send them in [Postcard Designer](https://postcard-designer.netlify.app/postcard-designer).

You can check out the deployed app [here](https://postcard-designer.netlify.app).


## Technologies used

This app was built with [Vue.js 3](https://v3.vuejs.org), [Vue Router](https://router.vuejs.org), and [Vite](https://vitejs.dev), and leveraged [Chakra UI](https://vue.chakra-ui.com) to keep components as accessible as reasonably possible within the challenge's bounds.


## Challenges

Because Vite expects and/or transpiles all modules to be in the ESM format, using it engendered additional challenges including relying on the [undocumented
`next` version of Chakra](https://next.vue.chakra-ui.com) and forgoing the use of the [Lob "SDK"](https://docs.lob.com/#tag/SDKs-and-Tools).

It also seems like there may not be a way to programmatically show the user a preview of their new postcard without setting up webhooks or using hacky workarounds, because the PDF link is returned before the postcard has been generated.


Last but certainly not least, this assignment comprised a large number of tasks, requirements, and considerations, and instructions and key information was scattered across multiple places within the
[Dashboard](https://dashboard.lob.com),[API Docs](https://docs.lob.com), and
[Guides](https://www.lob.com/guides), leading to a disjointed developer experience, especially developing a client-side app without the SDK. In particular, the templating task was written about in an oddly non-technical way and key information was obscured by Lob's information architecture. Having an overview page within the app also seems like an unusual choice.



## Running the app

To run the app locally, clone the repo and in its directory, run
`npm i` to install the relevant libraries.

Then create a `.env.local` file in the project's top-level folder with the following variables [replacing with your own keys where appropriate](

```bash
# .env.local
VITE_LOB_KEY = your_test_key
VITE_POSTCARD_TEMPLATE_BACK = your_back_template_key
VITE_POSTCARD_TEMPLATE_FRONT_BEACH = your_front_beach_template_key
VITE_POSTCARD_TEMPLATE_FRONT_JUNGLE = your_front_jungle_template_key
```

(This guide presumes you already have your own
[postcard templates](https://www.lob.com/guides#html_and_merge) created.)


Finally, run
`npm run dev` and navigate to
[http://localhost:3000](http://localhost:3000) to see the app in action!
