import React, { memo } from "react";

import DetailsEvol from "../DetailsEvol";

// Evolution chain tab
const SecondRoute = ({ pokemonData, pokemonAdditionalData, inputData }) => {
  return (
    <DetailsEvol
      data={{
        pokemonData,
        pokemonAdditionalData,
        inputData,
      }}
    />
  );
};

export default memo(SecondRoute);
