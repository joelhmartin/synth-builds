import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import usePatches from "../../hooks/usePatches";
import { IoArrowBack, IoArrowDown } from "react-icons/io5";
import useSynthStore from "../../store";

const ProducerMenu = () => {
  const { data: patches, error, isLoading } = usePatches();
  const setProducer = useSynthStore(s => s.setProducer)

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            width={40}
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <IoArrowDown /> : <IoArrowBack />}
          >
            Producer
          </MenuButton>
          <MenuList height={200} overflow={"scroll"}>
          {patches?.filter((patch, index, self) => {
              return self.findIndex((p) => p.producer === patch.producer) === index
            }).map((patch) => (
              <MenuItem key={patch._id} onClick={() => setProducer(patch.producer)}>{patch.producer}</MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ProducerMenu;
