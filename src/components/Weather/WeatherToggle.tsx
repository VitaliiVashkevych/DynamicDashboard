import React from "react";

interface Props {
  handleShowMore: () => void;
  isToday: boolean;
}

export const WeatherToggle: React.FC<Props> = ({ handleShowMore, isToday }) => { 
  return (
    <button
        onClick={handleShowMore}
      className="rounded border border-zinc-950 bg-slate-200 mt-3 hover:bg-slate-300"
      style={{
        width: '25%'
      }}
      >
        {isToday ? "Show more" : "Show less"}
      </button>
  )
}