import { useEffect } from 'react';
import Card from '../card/card.component';
import './card-list.styles.css';
import { ChangeComponent } from '../../redux/lottie-redux/userAction';
import { useDispatch } from 'react-redux';

const CardList = ({ monsters }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(monsters);
    monsters.Length !== 0 && dispatch(ChangeComponent(false))
  },[monsters])
  return (

    
    <div className='card-list'>
    {monsters.map((monster) => {
      return <Card key={monster.id} monster={monster} />;
    })}
  </div>
  )
}
;

export default CardList;
