import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import usePatches from "../../hooks/usePatches";
import { IoArrowBack, IoArrowDown } from "react-icons/io5";
import useSynthStore from "../../store";

const GenreMenu = () => {
  const { data: patches } = usePatches();
  const setGenre = useSynthStore(s => s.setGenre)

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
            Genre
          </MenuButton>
          <MenuList height={200} overflow={"scroll"}>
            {patches?.filter((patch, index, self) => {
              return self.findIndex((p) => p.genre === patch.genre) === index
            }).map((patch) => (
              <MenuItem key={patch._id} onClick={() => setGenre(patch.genre)}>{patch.genre}</MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default GenreMenu;
