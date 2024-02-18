import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router }) {

    if (!__VUEPRESS_SSR__) {
      router.isReady().then(() => {

        const rudderScript = document.createElement('script')
        rudderScript.innerHTML = `
          rudderanalytics = window.rudderanalytics=[];
          for(var methods=["load","page","track","identify","reset"],i=0;i<methods.length;i++){var method=methods[i];rudderanalytics[method]=function(a){return function(){rudderanalytics.push([a].concat(Array.prototype.slice.call(arguments)))}}(method)}
          rudderanalytics.load(__RUDDER_WRITE_KEY__, __RUDDERSTACK_DATA_PLANE_URL__);
        `;
        document.head.appendChild(rudderScript)
        
        const rudderSDK = document.createElement('script')
          rudderSDK.src = `https://cdn.rudderlabs.com/rudder-analytics.min.js`
          rudderSDK.onload = function() { 
            rudderanalytics.page();

            router.afterEach(function (to) {
              rudderanalytics.page();
            })
          }
        document.head.appendChild(rudderSDK)

        const cookbookStyles = document.createElement('link');
        cookbookStyles.rel = 'stylesheet';
        cookbookStyles.href = `https://cookbook-docsbot-staging.vercel.app/docsbot.css`;
        document.head.prepend(cookbookStyles);

        const cookbookContainer = document.createElement('div');
        cookbookContainer.id = '__cookbook';
        cookbookContainer.setAttribute('data-api-key', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWNlNzUwZmZiMDBlZWUyNThjNmUxMjkiLCJpYXQiOjE3MDgwMjkxOTksImV4cCI6MjAyMzYwNTE5OX0.vrpJUZNG2jBFegOyENxgLJfStfyP7R1sQYE_I4XNo40");
        document.body.appendChild(cookbookContainer);

        const cookbookScript = document.createElement('script');
        cookbookScript.src = `https://cookbook-docsbot-staging.vercel.app/docsbot.min.js`;
        document.head.appendChild(cookbookScript);
      })
    }; 
  }
})