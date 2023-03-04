import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Tag,
  TagLabel,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { buyCoffee, getUser } from "./polygon/contract";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import getMatic from "./polygon/market";

export default function Buy(props) {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const [nCoffee, setNCoffe] = useState(1);

  const fetchBuyData = async () => {
    await getUser(id, setIsLoaded).then((data) => setData(data));
  };
  useEffect(() => {
    fetchBuyData();
  }, []);

  return (
    <Box h="100vh" bg="white">
      <VStack align="center" justify="center" spacing="12px" h="100%">
        <SkeletonCircle size="1xl" isLoaded={isLoaded} fadeDuration={1}>
          <Avatar
            size="xl"
            name="Dan Abrahmov"
            src="https://bafybeihsmdffb7jtaxqym6czgwgi3c7pxwavc67jv5xbnhqwvtqcuomf5y.ipfs.w3s.link/AVATAR.png"
          />
        </SkeletonCircle>
        <Popover>
          <Skeleton isLoaded={isLoaded} fadeDuration={1}>
            <PopoverTrigger>
              <Button colorScheme="orange" variant="outline">
                @Bio 😎 !!!
              </Button>
            </PopoverTrigger>
          </Skeleton>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Hello Guys !!</PopoverHeader>
            <PopoverBody>{data && data.bio}</PopoverBody>
          </PopoverContent>
        </Popover>

        <Skeleton isLoaded={isLoaded}>
          <Text fontSize="2xl" lineHeight="1.2" fontFamily="RomanBlack">
            #{data ? data.name : "ERR404"}
          </Text>
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
        <Tag size="lg" colorScheme="purple" borderRadius="full">
          <Avatar
            src="https://www.xdefi.io/wp-content/uploads/2022/05/logoeee.png"
            size="xs"
            name="0x123"
            ml={-2}
            mr={2}
          />
          <TagLabel
            cursor="pointer"
            textDecoration="underline"
            _hover={{ color: "black" }}
          >
            {id}
          </TagLabel>
        </Tag>
        </Skeleton>
        
        <HStack align="center" justify="center" spacing="1%" w="76%">
  
          <VStack
            w="46%"
            border=".1px solid rgba(0,0,0,.1)"
            p="1%"
            borderRadius="9px"
          >
            <Skeleton w="100%" isLoaded={isLoaded}>
              <HStack
                w="100%"
                bg="#f7f8ff"
                border="1px solid #9cb0ff"
                borderRadius="3px"
                p="2%"
                overflowX="scroll"
              >
                <Text fontSize="4xl">☕</Text>
                <Text fontSize="2xl" color="gray">
                  x
                </Text>
                {[1, 2, 3, 4, 5,6,7].map((e, key) => {
                  return (
                    <Box
                      key={key}
                      as="button"
                      minHeight="44px"
                      
                      minWidth="44px"
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      border="2px"
                      borderColor="#5f7fff"
                      borderRadius="100%"
                      fontSize="15px"
                      bg={e == nCoffee ? "#5f7fff" : "transparent"}
                      color={e == nCoffee ? "white" : "black"}
                      _active={{
                        bg: "  transparent",
                      }}
                      fontFamily="RomanBlack"
                      onClick={() => {
                        setNCoffe(e);
                      }}
                    >
                      {e}
                    </Box>
                  );
                })}
              </HStack>
            </Skeleton>

            <Skeleton  w="100%" isLoaded={isLoaded}>
              <Textarea
                focusBorderColor="gray"
                border="2px solid"
                placeholder="Hey 👋 say something nice !"
              />
              <Box
              marginTop="2%"
                w="100%"
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
                }}
                onClick = {async()=>{
                 await buyCoffee(id)
                }}
              >
                Support with { data && nCoffee * data.cofP }$
              </Box>
            </Skeleton>

          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}
