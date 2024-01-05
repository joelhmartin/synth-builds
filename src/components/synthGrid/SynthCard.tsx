import { useState } from "react";
import Patch from "../../entities/patch";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import SynthDrawer from "./SynthDrawer";
import {
  Flex,
  IconButton,
  Image,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  AspectRatio,
  Heading,
} from "@chakra-ui/react";

interface Props {
  patch: Patch;
}

const SynthCard = ({ patch }: Props) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      <Card>
        <CardHeader height={"6rem"}>
          <Heading>{patch.song}</Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio>
            <Image
              borderRadius={"lg"}
              src={patch.file}
              boxSize="300px"
              objectFit="cover"
              alt={patch.synth}
              cursor="pointer"
              filter={isSaved ? "grayscale(0)" : "grayscale(100%)"}
              _hover={{ filter: "grayscale(0)" }}
            />
          </AspectRatio>

          <Flex paddingTop={4} justify="space-between">
            <Center>
              <Text>{patch.synth}</Text>
            </Center>
            <IconButton
              icon={isSaved ? <BsBookmarkCheckFill /> : <BsBookmarkCheck />}
              onClick={() => setIsSaved(!isSaved)}
              aria-label="Bookmark"
            />
          </Flex>
          <Text paddingBottom={2}>{patch.genre}</Text>
          <Text>{patch.producer}</Text>
        </CardBody>

        <CardFooter>
          <SynthDrawer patch={patch} />
        </CardFooter>
      </Card>
    </>
  );
};

export default SynthCard;
