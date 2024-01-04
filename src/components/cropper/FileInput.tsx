import { Box, Spacer, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import { TbDragDrop } from "react-icons/tb";

interface Props {
  onChange: (evnt: React.ChangeEvent<HTMLInputElement>) => void;
}


const FileInput = ({ onChange }: Props) => {

  const ref = useRef<HTMLInputElement>(null)

  return (
    <label
      htmlFor="dropzone-file"
      className="drop-zone"
    >
      <VStack >
        <div>
          <Box rounded={'lg'} width={'100%'} height={200} position={'relative'}>
            <Box position={'absolute'} top={'50%'} left={'50%'}>
            <TbDragDrop />
            </Box>
          </Box>
          

          <Text>
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </Text>
        </div>

        <Spacer />

        <input
          ref={ref}
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </VStack>
    </label>
  );
};

export default FileInput;
