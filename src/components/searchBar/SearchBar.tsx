import { Flex } from "@chakra-ui/react";
import GenreMenu from "./GenreMenu";
import SearchText from "./SearchText";
import ProducerMenu from "./ProducerMenu";

const SearchBar = () => {
  return (
    <Flex gap={3}>
      <SearchText />
      <GenreMenu />
      <ProducerMenu/>
    </Flex>
  );
};

export default SearchBar;
