import { Flex, Grid, GridItem } from "@chakra-ui/react";
import GenreMenu from "./GenreMenu";
import SearchText from "./SearchText";
import ProducerMenu from "./ProducerMenu";

const SearchBar = () => {
  return (
    <Grid
      templateAreas={{
        base: `"text" "dropdown"`,
        lg: `"text dropdown"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr 250px",
      }}
    >
      <GridItem>
        <SearchText />
      </GridItem>
      <GridItem py={{sm: 4, lg: 0}}>
        <Flex pl={{sm: 0, lg: 4}} gap={3}>
          <GenreMenu />
          <ProducerMenu />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default SearchBar;
