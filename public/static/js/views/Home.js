import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params){
        super(params);
        this.setTitle('Home');
    }

    async getHtml() {
        return `
        <h1>Welcome to our SPA</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto soluta numquam repellendus eum nostrum laudantium, praesentium quis perferendis facere nulla dignissimos. Aut dolorum qui officiis blanditiis laboriosam voluptatem numquam cupiditate</p>
        <a href="/brands" data-link>See all brands</a>
        `;
    }

}