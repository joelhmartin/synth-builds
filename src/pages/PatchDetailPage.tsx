import { useState } from "react";
import { useLocation, useParams } from "wouter";
import usePatch from "../hooks/usePatch";
import { Fade, Grid, GridItem } from "@chakra-ui/react";
import Profile from "../components/profile/Profile";
import PatchDetail from "../components/patchDetail/PatchDetail";


const PatchDetailPage = () => {
  const { _id } = useParams();
  const { data: patch } = usePatch(_id!);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useLocation();

  const handleToggle = () => setShow(!show);

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
