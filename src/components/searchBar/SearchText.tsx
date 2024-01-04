import { Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useSynthStore from "../../store";
import { MdOutlineSearch, MdOutlineSearchOff } from "react-icons/md";

const SearchText = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useSynthStore((s) => s.setSearchText);
  const [isSet, setIsSet] = useState(false)

  return (
    <>
      <InputGroup>
        <Input
          ref={ref}
          type="text"
          variant={"filled"}
          placeholder="Search..."
          _placeholder={{ color: "white", opacity: 0.7 }}
          width={"24rem"}
          onInput={() => {
            if (ref.current?.value === "") {
              setSearchText("");
              setIsSet(false)
            } else {
              setIsSet(false)
            }
          }}
        />
        {!isSet ? (
          <InputRightAddon
            as={Button}
            onClick={() => {
              if (ref.current) {
                setSearchText(ref.current.value);
                setIsSet(true)
              }
            }}
          >
            <MdOutlineSearch />
          </InputRightAddon>
        ) : (
          <InputRightAddon
            as={Button}
            onClick={() => {
              if (ref.current) {
                setSearchText("");
                ref.current.value = ""
                setIsSet(false)
              }
            }}
          >
            <MdOutlineSearchOff />
          </InputRightAddon>
        )}
      </InputGroup>
    </>
  );
};

export default SearchText;
