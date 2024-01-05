import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Spacer,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MutableRefObject, useRef } from "react";
import Patch from "../../entities/patch";
import { Link } from "wouter";

interface Props {
  patch: Patch;
}

function SynthDrawer({ patch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>;

  return (
    <>
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
        View Patch
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'md'}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{patch.song}</DrawerHeader>

          <DrawerBody py={20} >
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <Text>Genre: {patch.genre}</Text>
              <Text>Producer: {patch.producer}</Text>
              <Text>Synth: {patch.synth}</Text>
              <Spacer />
            </VStack>
            {patch.description && (
              <>
                <Heading as="h3" size="md">
                  Description
                </Heading>
                <Divider orientation="horizontal" />
                <Text>{patch.description}</Text>
              </>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Link to={"/patches/" + patch._id}>
              <Button colorScheme="blue">Check it out</Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SynthDrawer;
