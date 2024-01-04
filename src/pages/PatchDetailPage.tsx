import { Grid, GridItem } from "@chakra-ui/react";
import { useLocation, useParams } from "wouter";
import PatchDetail from "../components/patchDetail/PatchDetail";
import usePatch from "../hooks/usePatch";


const PatchDetailPage = () => {
  const { _id } = useParams();
  const { data: patch } = usePatch(_id!);
  // const [show, setShow] = useState(false);
  const [_location, setLocation] = useLocation();


  if (!_id) {
    setLocation("/");
  }

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
        sm: `"aside" "main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr 1fr",
      }}
    >
      <GridItem area="aside" paddingX={5}>
      </GridItem>

      <GridItem>
        <PatchDetail patch={patch}/>
      </GridItem>
    </Grid>
  );
};

export default PatchDetailPage;
