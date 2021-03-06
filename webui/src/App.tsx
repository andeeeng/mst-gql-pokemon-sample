import React from "react";
import { useQuery } from "./models";
import { observer } from "mobx-react";

interface IPokemon {
  name: any;
  id: any;
  number: any;
  maxCP: any;
  image: any;
  attacks: any;
}
const Pokemon = (props: IPokemon) => {
  const { name, id, number, maxCP, image, attacks } = props;
  return (
    <div
      style={{ border: "1px solid tomato", width: 200, margin: 5, padding: 5 }}
    >
      <h5>{number}</h5>
      <img src={image} style={{ height: 100 }}></img>
      <p>
        {name}, {maxCP}
      </p>
    </div>
  );
};

const App = () => {
  const { data, loading, error } = useQuery((store) => {
    return store.requestPokemons({ first: 999 });
  });

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
  if (loading) {
    return (
      <div style={{ margin: 10 }}>
        <h3>loading...</h3>{" "}
      </div>
    );
  }

  console.log("data from App", data);

  return (
    <div style={{ margin: 10 }}>
      <h1>Pokedex</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.pokemons.map((p) => {
          return (
            <Pokemon
              name={p.name}
              id={p.id}
              number={p.number}
              maxCP={p.maxCP}
              image={p.image}
              attacks={p.attacks}
            ></Pokemon>
          );
        })}
      </div>
    </div>
  );
};

export default observer(App);
