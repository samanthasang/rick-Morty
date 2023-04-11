import './card.styles.css';

const Card = ({ monster }) => {
  const { status, name, image } = monster;

  return (
    <div className='card-container'>
      <img
        alt={name}
        src={image}
      />
      <h2>{name}</h2>
      <h2>{status}</h2>
    </div>
  );
};

export default Card;
