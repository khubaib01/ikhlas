import { FC, FormEvent, useRef } from "react";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import Api from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../store";

const Login: FC = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
    };
    const resp = await Api.post("/users/login", data);
    if (resp.data) {
      login(resp.data.token, resp.data.username);
      toast.success("Successfully logged in.");
      navigate("/");
    } else {
      toast.error("Something happened. please try again.");
    }
  };

  return (
    <Center>
      <Box
        p={6}
        mt={4}
        sx={{ border: "3px solid #16a34a", borderRadius: "7px" }}
        w={"350px"}
      >
        <Text align={"center"} fontSize={"4xl"} fontWeight={700}>
          Login Here
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                focusBorderColor="green.500"
                placeholder="username"
                ref={usernameRef}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                focusBorderColor="green.500"
                placeholder="password"
                ref={passwordRef}
                type="password"
              />
            </FormControl>
            <Button colorScheme="green" type="submit">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
