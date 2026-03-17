import { useState } from "react";
import { useCharacters } from "../hooks/use-swapi";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import Pagination from "../components/Pagination";

export default function Index() {

  const { characters, loading, error, goNext, goPrev, hasNext, hasPrev } =
    useCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div>

      <h1 style={{textAlign:"center"}}>
        Star Wars Character Explorer
      </h1>

      {loading && <p style={{textAlign:"center"}}>Loading...</p>}

      {error && <p style={{textAlign:"center"}}>{error}</p>}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
        gap:"20px",
        padding:"20px"
      }}>
        {characters.map((char,i)=>(
          <CharacterCard
            key={i}
            character={char}
            onClick={()=>setSelectedCharacter(char)}
          />
        ))}
      </div>

      <Pagination
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={goPrev}
        onNext={goNext}
      />

      <CharacterModal
        character={selectedCharacter}
        onClose={()=>setSelectedCharacter(null)}
      />

    </div>
  );
}