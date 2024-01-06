import { Fade, SimpleGrid } from "@chakra-ui/react";
import usePatches from "../../hooks/usePatches";
import SynthCard from "./SynthCard";
import SynthCardContainer from "./SynthCardContainer";
import SynthCardSkeleton from "./SynthCardSkeleton";

const SynthGrid = () => {
  const { data, error, isLoading } = usePatches();

  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <h1>{error.message}</h1>;

  return (
    <Fade in={!isLoading}>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        paddingTop="30px"
        height={'100%'}
      >
        <>
          {isLoading &&
            skeletons.map((skeleton) => {
              <SynthCardContainer key={skeleton}>
                <SynthCardSkeleton />
              </SynthCardContainer>;
            })}

          {data?.map((patch) => (
            <SynthCardContainer key={patch._id}>
              <SynthCard patch={patch} />
            </SynthCardContainer>
          ))}
        </>
      </SimpleGrid>
    </Fade>
  );
};

export default SynthGrid;
