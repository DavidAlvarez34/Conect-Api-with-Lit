import { LitElement, css, html } from 'lit'


export class MyElement extends LitElement {
  static get properties() {
    return {
      data:{type:Array},
    }
  }
  static get styles() {
    return css`
    body{
      background-color:#F7F7F8;
    }
    h1{
      text-align:center;
    }
    .card-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 16px;
    }
    .card {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 16px;
      transition: box-shadow 0.3s ease;
    }

    .card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .card h2 {
      margin: 0;
      font-size: 18px;
      color: #333;
      text-align:center;
      margin-bottom: 8px;
    }

    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .card p {
      margin: 0;
      color: #777;
      text-align:center;
    }
      
    `
  }

  constructor() {
    super()
    this.data = []
    
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',{
        method: "GET"
      });
      
      const jsonData = await response.json();
      console.log(jsonData.drinks)
      this.data = jsonData.drinks;
      
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  }
  render() {
     
    return html`
     <h1>The Cocktail</h1>
    <div class="card-container">

     
      ${this.data.map(drinks => html`
          <div class="card">
          <h2>${drinks.strGlass}</h2>
            <img src="${drinks.strDrinkThumb}" alt="${drinks.strDrinkThumb}">
            <p>${drinks.strCategory}</p>
          </div>
        `
      )}
    </div>
    `
  }

  
  
}

window.customElements.define('my-element', MyElement)
