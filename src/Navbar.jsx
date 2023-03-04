import {  Box, Flex } from "@chakra-ui/react";
import icon from "./assets/icon.svg";
import { Button,} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";



export default function Navbar(props) {
  const buttonState = () => {
    if (props.wallet != undefined) {
      if (props.wallet.trim().length == 0) {
        return "Connect";
      } else {
        return (
          props.wallet.trim().substring(0, 4) +
          "..." +
          props.wallet.trim().slice(-4)
        );
      }
    } else {
      return "Connect";
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <Box>
      <Flex align="center" justify="center" bg="transparent">
        <Flex
          align="center"
          justifyContent="space-between"
          bg={path != "/" ? "whitesmoke" : "white"}
          w="89%"
          borderRadius="33px"
          p="12px"
          marginTop="1.4%"
          paddingInlineEnd="1%"
          paddingInlineStart="2%"
        >
          <Flex align="center" gridColumnGap="3%">
            <img
              src={icon}
              width={33}
              onClick={() => {
                navigate("/");
              }}
            />
            {path == "/" && (
              <>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  fontFamily="RomanBook"
                >
                  Faq
                </Button>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  fontFamily="RomanBook"
                >
                  Explore Creators
                </Button>
              </>
            )}
          </Flex>

          <Box>
            {path == "/" && (
              <Box
                as="button"
                height="44px"
                lineHeight="1.2"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                border="1px"
                px="22px"
                borderRadius="23px"
                fontSize="18px"
                bg="transparent"
                borderColor="transparent"
                color="black"
                _hover={{ bg: "#ebedf0" }}
                _active={{
                  bg: "  transparent",
                  transform: "scale(0.98)",
                }}
                marginRight="12px"
                fontFamily="RomanBook"
                onClick={() => {
                  if (props.flag != undefined && props.flag == false) {
                    navigate("/complete-your-page");
                  } else {
                    navigate("/dashboard");
                  }
                }}
              >
                {props.wallet != undefined && props.wallet.trim().length == 0
                  ? "Register"
                  : "Dashboard"}
              </Box>
            )}
            <Box
              as="button"
              height="44px"
              lineHeight="1.2"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              border="1px"
              px="22px"
              borderRadius="23px"
              fontSize="18px"
              bg="#ffdd00"
              borderColor="transparent"
              color="black"
              fontFamily="RomanBlack"
              _hover={{ bg: "#ebedf0" }}
              _active={{
                bg: "  #ffdd00",
                transform: "scale(0.98)",
              }}
              onClick={() => {
                props.connectWallet();
              }}
            >
              {buttonState()}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
