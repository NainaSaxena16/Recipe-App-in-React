import { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
  const APP_ID = '33bc36dc';
  const APP_KEY = 'f6e8017ec38def9e49c58a5190bc8155';

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('icecream')

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = response.json()
    return data
  }

  useEffect(() => {
    getRecipes()
   .then(data=>{
    console.log(data.hits)
    setRecipes(data.hits)})
  }, [search])

  return (
    <div className="App">
      <form className='search-form' onSubmit={e=>{e.preventDefault()
      setSearch(query)
      setQuery('')
      }}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} className="search-bar" />
        <button type="submit" className='search-button'>Search</button>
      </form>
      <div className="recipes">
        {recipes.map((item,idx)=> <Recipe title={item.recipe.label} calories={item.recipe.calories} img={item.recipe.image} ing={item.recipe.ingredients} key={idx}/>)}
      </div>
    </div>
  );
}

export default App