import AbstractView from "./AbstractView.js"

export default class extends AbstractView {

    constructor(params){
        super(params)
        this.setTitle('Brand')
    }

    async getHtml() {

        async function getData(url) {
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/static/data/brands.json')

        const brand_id = this.params.id

        const brand = data.find(item => item.codigo === brand_id)
 
        return `
        <h1>${brand.codigo}</h1>
        <p>${brand.nome}</p>
        <a href="/brands" data-link>Retour</a>
        `
    }
}