import { Fade, Flex, Grid, GridItem } from "@chakra-ui/react";
import { MdOutlineArrowUpward } from "react-icons/md";
import useAuthStore from "../authStore";
import NewPost from "../components/newPost/NewPost";
import Profile from "../components/profile/Profile";

const AccountPage = () => {
  const { token } = useAuthStore();

  return (
    <>
      {token ? (
        <Fade in={!!token}>
          <Grid
            templateAreas={{
              base: `"main"`,
              lg: `"aside main"`,
              sm: `"aside" "main"`
            }}
            templateColumns={{
              base: "1fr",
              lg: ".6fr 1fr ",
            }}
          >

            <GridItem area="aside" paddingX={5}>
              <Profile/>
            </GridItem>

            <GridItem>
              <NewPost />
            </GridItem>
          </Grid>
        </Fade>
      ) : (
        <Flex
          className="up-arrow"
          fontSize={100}
          paddingRight={10}
          paddingTop={10}
          justifyContent={"right"}
        >
          <MdOutlineArrowUpward />
        </Flex>
      )}
    </>
  );
};

export default AccountPage;
