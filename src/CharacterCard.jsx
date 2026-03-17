export default function CharacterCard({character,onClick}){

  const image=`https://picsum.photos/200?random=${character.name}`;

  return(

    <div
      onClick={onClick}
      style={{
        border:"1px solid #ccc",
        padding:"10px",
        cursor:"pointer",
        textAlign:"center"
      }}
    >

      <img
        src={image}
        alt={character.name}
        style={{width:"100%"}}
      />

      <h3>{character.name}</h3>

    </div>

  )

}