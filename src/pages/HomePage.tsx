import { Flex, Grid, GridItem, Show, VStack } from "@chakra-ui/react";
import SearchBar from "../components/searchBar/SearchBar";
import SynthGrid from "../components/synthGrid/SynthGrid";

const HomePage = () => {
  return (
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5}></GridItem>
        </Show>
        <GridItem paddingX={10}>
          <VStack>
          <SearchBar />
          <SynthGrid />
          </VStack>

        </GridItem>
      </Grid>
  );
};

export default HomePage;
