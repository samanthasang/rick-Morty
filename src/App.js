import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';
import axios from 'axios';
import * as animationData2 from "../src/assets/lottieFiles/anime3.json";
import Lottie from 'react-lottie';
import { ChangeComponent } from './redux/lottie-redux/userAction';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const lottie = useSelector((state) => state.user.iconrender);
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const options = {
        method: 'POST',
        url: 'https://rickandmortyapi.com/graphql',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          query: `{
            characters(page: 2, filter: { name: "rick" }) {
              info {
                count
              }
              results {
                id
                name
                status
                image
              }
            }
            location(id: 1) {
              id
            }
            episodesByIds(ids: [1, 2]) {
              id
            }
          }`
        }
      };
      axios
        .request(options)
        .then((response) => setMonsters(response.data.data.characters.results)
          // const res = response.data; // Response received from the API
          // console.log(response.data);
          // setMonsters(response.data)
        )
        .catch(function (error) {
          console.error(error);
        });
    };
    
  getCountries()
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((response) => response.json())
    //   .then((users) => setMonsters(users));
  }, []);

  // load the animation asset
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  return (
    <div className='App'>
      <h1 className='app-title'>Rick&Morty Rolodex</h1>

     {lottie && <div className='anime-loading'>
        <Lottie
          options={defaultOptions2}
          onContextMenu={(event) => event.preventDefault()}
          />
      </div>}
     {monsters && <CardList monsters={monsters} />}
    </div>
  );
};

export default App;
