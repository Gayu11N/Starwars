import { useState, useEffect } from "react";

export function useCharacters(){

  const [characters,setCharacters]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [page,setPage]=useState(1);

  const fetchCharacters = async()=>{

    try{

      setLoading(true);

      const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);

      const data = await res.json();

      setCharacters(data.results);

      setLoading(false);

    }catch(err){

      setError("Unable to load characters");

    }

  };

  useEffect(()=>{
    fetchCharacters();
  },[page]);

  return{
    characters,
    loading,
    error,
    goNext:()=>setPage(page+1),
    goPrev:()=>setPage(page-1),
    hasNext:true,
    hasPrev:page>1
  }

}