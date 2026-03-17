export default function Pagination({hasPrev,hasNext,onPrev,onNext}){

  return(

    <div style={{
      textAlign:"center",
      margin:"20px"
    }}>

      {hasPrev && <button onClick={onPrev}>Previous</button>}

      {hasNext && <button onClick={onNext}>Next</button>}

    </div>

  )

}