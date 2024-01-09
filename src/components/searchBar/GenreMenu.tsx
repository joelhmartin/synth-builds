import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import usePatches from "../../hooks/usePatches";
import { IoArrowBack, IoArrowDown } from "react-icons/io5";
import useSynthStore from "../../store";
import { useRef } from "react";

const GenreMenu = () => {
  const { data } = usePatches();
  const setGenre = useSynthStore(s => s.setGenre)
  const ref = useRef<HTMLElement>()

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            ref={ref}
            width={40}
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <IoArrowDown /> : <IoArrowBack />}
          >
            Genre
          </MenuButton>
          <MenuList height={200} overflow={"scroll"}>
            {data?.filter((patch, index, self) => {
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
