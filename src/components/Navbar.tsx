import { FC, Fragment } from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ToggleColorMode from "../utils/ToggleColorMode";
import { BookOpen, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bgcolor = useColorModeValue("green.400", "green.700");

  return (
    <Box bgColor={bgcolor} py="2">
      <Container maxW="container.xl">
        <HStack justify="space-between">
          <HStack>
            <BookOpen size={"32"} />
            <Text fontSize="4xl" fontWeight={"bold"}>
              Ikhlas
            </Text>
          </HStack>
          <HStack display={{ base: "none", md: "flex" }} fontWeight={"bold"}>
            <Links />
          </HStack>
          <HStack display={{ base: "none", md: "flex" }}>
            <Button colorScheme="green">Login</Button>
            <ToggleColorMode />
          </HStack>
          <Box display={{ base: "block", md: "none" }}>
            {isOpen ? (
              <X onClick={onToggle} size={"32"} />
            ) : (
              <Menu onClick={onToggle} size={"32"} />
            )}
          </Box>
        </HStack>
      </Container>
      <Collapse in={isOpen} animateOpacity>
        <VStack
          align={"flex-start"}
          ml="10"
          p="16px"
          fontWeight={"bold"}
          gap={"5"}
        >
          <Links />
          <ToggleColorMode />
          <Button colorScheme="green">Login</Button>
        </VStack>
      </Collapse>
    </Box>
  );
};

function Links() {
  return (
    <Fragment>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </Fragment>
  );
}

export default Navbar;
