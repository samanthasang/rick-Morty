import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';
import axios from 'axios';
import * as animationData2 from "../src/assets/lottieFiles/anime3.json";
import Lottie from 'react-lottie';
import { ChangeComponent } from './redux/lottie-redux/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

const App = () => {
  const lottie = useSelector((state) => state.user.iconrender);
  const [monsters, setMonsters] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ChangeComponent(true))
    const getCountries = async () => {
      setMonsters([])
      console.log(page);
      let query = `{
            characters(page: `+ Number(page) + `) {
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
      const options = {
        method: 'POST',
        url: 'https://rickandmortyapi.com/graphql',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          query: query
        }
      };
      axios
        .request(options)
        .then((response) => setMonsters(response.data.data.characters.results)
        )
        .catch(function (error) {
          console.error(error);
        });
    };
    
  getCountries()
  }, [page]);

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

      <div style={{margin: "0 0 50px 0"}}>
        <Button className='btn_pre' onClick={()=> {page > 1 && setPage(page-1)}}>previous page</Button>
        <Button className='btn_next' onClick={()=> setPage(page+1)}>next page</Button>
      </div>
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
