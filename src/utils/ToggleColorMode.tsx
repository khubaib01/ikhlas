import { FC } from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "lucide-react";

const ToggleColorMode: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      colorScheme="green"
      aria-label="toggle color mode"
    />
  );
};

export default ToggleColorMode;
