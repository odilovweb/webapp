import React from "react";
import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams();
  return (
    <div>
      <Link to={`user/${id}`}>Goo</Link>
    </div>
  );
}

export default Home;
