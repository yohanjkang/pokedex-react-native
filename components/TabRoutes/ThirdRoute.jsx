import React, { memo } from "react";

import DetailsAtt from "../DetailsAtt";

// Type effectiveness tab
const ThirdRoute = ({ pokemonData, pokemonAdditionalData, inputData }) => {
  return (
    <DetailsAtt
      data={{
        pokemonData,
        pokemonAdditionalData,
        inputData,
      }}
    />
  );
};

export default memo(ThirdRoute);
