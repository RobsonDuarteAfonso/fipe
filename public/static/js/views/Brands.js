import AbstractView from "./AbstractView.js"

export default class extends AbstractView {

    constructor(params){
        super(params)
        this.setTitle('Brands')
    }

    async getHtml() {

        async function getData(url) {
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/static/data/brands.json')

        let listBrands = "<ul>"
        for(let i in data) {
            listBrands +=`<li><a href="/brand/${data[i]['codigo']}" data-link>${data[i]['nome']}</a></li>`
        }
        listBrands +="</ul>"
            
        return `
        <h1>Brands</h1>
        ${listBrands}
        `
    }
}