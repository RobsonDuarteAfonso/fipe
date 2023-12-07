import Home from "./views/Home.js"
import Brands from "./views/Brands.js"
import Brand from "./views/Brand.js"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")+ "$")

const getParams = match => {
    const values = match.isMatch.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(isMatch =>isMatch[1])
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

const router = async () => {
    const routes = [
        { path: "/", view: Home},
        { path: "/brands", view: Brands},
        { path: "/brand/:id", view: Brand},
    ]
    
   const potentialMatches = routes.map(route => {
    return {
        route: route,
        isMatch: location.pathname.match(pathToRegex(route.path))
    }
   })

   let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

   if(!match) {
    match = {
        route: routes[0],
        isMatch: [location.pathname]
    }
   }
   
  const view = new match.route.view(getParams(match))

  document.querySelector("#app").innerHTML = await view.getHtml()
}

const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    }) 
    router();
});