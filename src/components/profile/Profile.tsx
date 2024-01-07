import { Grid, GridItem, Text } from "@chakra-ui/react";
import useAuthStore from "../../authStore";

const Profile = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"`}
  
        gridTemplateRows={"200px 1fr 30px"}
        gridTemplateColumns={"200px 1fr"}
        h="70vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"}>
          <Text fontSize={"6xl"}>
            Sup {user}
          </Text>
        </GridItem>
        <GridItem pl="2" area={"nav"}>
          <Text fontSize={"xl"}>
            My Uploads
          </Text>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <Text fontSize={"xl"}>
            Whats new
          </Text>
        </GridItem>

      </Grid>
    </>
  );
};

export default Profile;
