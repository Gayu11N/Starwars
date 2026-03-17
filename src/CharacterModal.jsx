export default function CharacterModal({character,onClose}){

  if(!character) return null;

  return(

    <div style={{
      position:"fixed",
      top:0,
      left:0,
      width:"100%",
      height:"100%",
      background:"rgba(0,0,0,0.5)"
    }}>

      <div style={{
        background:"#fff",
        margin:"100px auto",
        padding:"20px",
        width:"300px"
      }}>

        <h2>{character.name}</h2>

        <p>Height: {character.height} cm</p>

        <p>Mass: {character.mass} kg</p>

        <p>Birth Year: {character.birth_year}</p>

        <p>Films: {character.films.length}</p>

        <button onClick={onClose}>
          Close
        </button>

      </div>

    </div>

  )

}