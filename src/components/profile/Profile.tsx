import { Grid, GridItem, Text } from "@chakra-ui/react";
import useAuthStore from "../../authStore";

const Profile = () => {
  const user = useAuthStore((s) => s.user);
  console.log(user);

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
          <Text fontSize={"6xl"} className="VCRFont">
            Sup {user}
          </Text>
        </GridItem>
        <GridItem pl="2" area={"nav"}>
          <Text fontSize={"xl"} className="VCRFont">
            My Uploads
          </Text>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <Text fontSize={"xl"} className="VCRFont">
            Whats new
          </Text>
        </GridItem>

      </Grid>
    </>
  );
};

export default Profile;
