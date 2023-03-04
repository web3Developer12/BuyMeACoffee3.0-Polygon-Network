import { Box, HStack, VStack, Text, background, SkeletonCircle, Skeleton, SkeletonText } from "@chakra-ui/react";
import {
  BiHomeAlt,
  BiLinkExternal,
  BiBookHeart,
  BiBoltCircle,
  BiHome,
  BiHive,
  BiMoney,
  BiDockLeft,
  BiImageAlt,
  BiUser,
  BiMessageSquareDetail,
  BiShare,

} from "react-icons/bi";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, WrapItem } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import matic from "./assets/polygon-matic-logo.svg";
import { useState ,useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { getUser, setDonationSetting } from "./polygon/contract";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import { Input,InputGroup,InputLeftElement } from '@chakra-ui/react'

export default function Dashboard(props) {
  const [index, setIndex] = useState(0);

  const [scrollY, setScrollY] = useState(0);
  const ref                   = useRef(null);
  const [priceCoffee,setPriceCoffee] = useState(props.userData ? props.userData.cofP:5)
  const [thankMessage,setThankMessage] = useState('')

 
  function handleScroll() {
    setScrollY(ref.current.scrollTop);
    if(ref.current.scrollTop >= 0  && ref.current.scrollTop <= 309){
        setIndex(0)
    }
    if(ref.current.scrollTop >= 288 && ref.current.scrollTop <= 794){
        setIndex(2)
    }
    if(ref.current.scrollTop >= 794 && ref.current.scrollTop <= 994){
        setIndex(3)
    }
    if(ref.current.scrollTop >= 994 && ref.current.scrollTop <= 994*2){
        setIndex(4)
    }

  }

  useEffect(() => {

    if(ref.current){
      
      ref.current.addEventListener('scroll', handleScroll);

      return () => {
        if(ref.current){
          ref.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  });

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  
  const navigate = useNavigate()
  return (
    <Box h="86vh" paddingTop="1%">
      <Modal isCentered isOpen={!true} onClose={onClose}>
        {overlay}
          { 1 == 1 &&
          <ModalContent>
            <InputGroup>
          <Input type='tel' variant='outline' placeholder='Phone number' bg="transparent" focusBorderColor="#ffdd00"/>
        </InputGroup>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Custom backdrop filters!</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
          }
      </Modal>

      <HStack
        align="flex-start"
        justify="flex-start"
        marginInlineStart="8%"
        paddingInlineEnd="7%"
      >
        <VStack w="21% " align="flex-start" justifyContent="flex-start">
          <VStack align="flex-start" justifyContent="flex-start">
            <HStack
              bg={index == 0 ? `rgb(241, 196, 15,.1)` : ""}
              _hover={index != 0 && { background: "rgba(0,0,0,.1)" }}
              cursor="pointer"
              onClick={() => setIndex(0)}
              padding="8px"
              borderRadius="23px"
            >
              <Text
                fontSize="18px"
                color={index == 0 ? `rgb(241, 196, 15)` : ""}
              >
                <BiHomeAlt />
              </Text>
              <Text fontFamily="RomanBook">Home</Text>
            </HStack>

            <HStack
              bg={index == 1 ? `rgb(241, 196, 15,.1)` : ""}
              _hover={index != 1 && { background: "rgba(0,0,0,.1)" }}
              padding="8px"
              cursor="pointer"
              onClick={() => {
                setIndex(1)
                navigate(`/buy/${props.wallet}`,'blank')
              }}
              borderRadius="23px"
            >
              <Text
                fontSize="18px"
                color={index == 1 ? `rgb(241, 196, 15)` : ""}
              >
                <BiLinkExternal />
              </Text>
              <Text fontFamily="RomanBook">Page</Text>
            </HStack>
          </VStack>

          <VStack align="flex-start" justifyContent="flex-start">
            <Text color="gray" fontFamily="RomanAvenir">
              Monetize
            </Text>
            <HStack
              cursor="pointer"
              bg={index == 2 ? `rgb(241, 196, 15,.1)` : ""}
              _hover={index != 2 && { background: "rgba(0,0,0,.1)" }}
              padding="8px"
              borderRadius="23px"
              onClick={() => setIndex(2)}
            >
              <Text
                fontSize="18px"
                color={index == 2 ? `rgb(241, 196, 15)` : ""}
              >
                <BiBookHeart />
              </Text>
              <Text fontWeight="18px" fontFamily="RomanBook">
                Donations
              </Text>
            </HStack>
          </VStack>

          <VStack align="flex-start" justifyContent="flex-start">
            <Text color="gray" fontFamily="RomanAvenir">
              Settings
            </Text>
            <HStack
              cursor="pointer"
              bg={index == 3 ? `rgb(241, 196, 15,.1)` : ""}
              _hover={index != 3 && { background: "rgba(0,0,0,.1)" }}
              padding="8px"
              borderRadius="23px"
              onClick={() => setIndex(3)}
            >
              <Text
                fontSize="18px"
                color={index == 3 ? `rgb(241, 196, 15)` : ""}
              >
                <BiBoltCircle />
              </Text>
              <Text fontWeight="18px" fontFamily="RomanBook">
                Payouts
              </Text>
            </HStack>
            <HStack
              cursor="pointer"
              bg={index == 4 ? `rgb(241, 196, 15,.1)` : ""}
              _hover={index != 4 && { background: "rgba(0,0,0,.1)" }}
              padding="8px"
              borderRadius="23px"
              onClick={() => setIndex(4)}
            >
              <Text
                fontSize="18px"
                color={index == 4 ? `rgb(241, 196, 15)` : ""}
              >
                <BiHive />
              </Text>
              <Text fontWeight="18px" fontFamily="RomanBook">
                Settings
              </Text>
            </HStack>
            <HStack
              cursor="pointer"
              bg={index == 5 ? `rgb(241, 196, 15,.1)` : ""}
              _hover={index != 5 && { background: "rgba(0,0,0,.1)" }}
              padding="8px"
              borderRadius="23px"
              onClick={() => setIndex(5)}
            >
              <Text
                fontSize="18px"
                color={index == 5 ? `rgb(241, 196, 15)` : ""}
              >
                <BiUser />
              </Text>
              <Text fontWeight="18px" fontFamily="RomanBook">
                Account
              </Text>
            </HStack>
          </VStack>
        </VStack>

        <VStack
          w="100%"
          paddingBottom="12px"
          h="525px"
          spacing="2%"
          overflowX="hidden"
          overflowY="scroll"
          ref = {ref}
        > 
          
          <Box bg="white" w="100%" p="4%" boxShadow="base">
            <HStack spacing="3%">
              <SkeletonCircle size='14' fadeDuration={1} isLoaded={props.userDataLoaded}>
                <WrapItem>
                  <Avatar
                    size="lg"
                    name="Dan Abrahmov"
                    src="https://bafybeihsmdffb7jtaxqym6czgwgi3c7pxwavc67jv5xbnhqwvtqcuomf5y.ipfs.w3s.link/AVATAR.png"
                  />
                </WrapItem>
              </SkeletonCircle>

              <HStack justifyContent="space-between" w="100%">
                <VStack align="flex-start" justifyContent="center">

                  <Skeleton isLoaded={props.userDataLoaded}>
                    <Text fontSize="2xl" fontFamily="RomanBlack">
                      Hi, {props.userData ? props.userData.name:"ERROR 404"}
                    </Text>
                  </Skeleton>

                  <Skeleton isLoaded={props.userDataLoaded}>
                    <Text fontFamily="RomanBook">
                    {props.userData ? props.userData.link.substring(0,19)+"..."+ props.userData.link.slice(-6):"ERROR 404"}
                    </Text>
                  </Skeleton>

                </VStack>
                <Skeleton isLoaded={props.userDataLoaded}>
                  <Box
                    as={Button}
                    leftIcon={<BiShare/>}
                    height="44px"
                    lineHeight="1.2"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    border="1px"
                    px="22px"
                    borderRadius="23px"
                    fontSize="16px"
                    bg="black"
                    borderColor="transparent"
                    color="white"
                    _hover={{ bg: "black" }}
                    _active={{
                      bg: "black",
                      transform: "scale(0.98)",
                    }}
                    marginRight="12px"
                    fontFamily="RomanBlack"
                  >
                    Share page
                  </Box>
                </Skeleton>
              </HStack>
            </HStack>

            <Divider marginTop="2%" />

            <HStack  w="100%">
              <VStack  w="100%" align="flex-start" justify="flex-start" marginTop="3%">
                <Skeleton isLoaded={props.userDataLoaded}>
                <HStack spacing="5%" w="100%">
                  <Text fontSize="2xl" fontFamily="RomanBlack" >
                    Earnings
                  </Text>
                  <Tag size='lg' colorScheme='purple' borderRadius='full'>
                  <Avatar
                    src='https://www.xdefi.io/wp-content/uploads/2022/05/logoeee.png'
                    size='xs'
                    name='0x123'
                    ml={-2}
                    mr={2}
                    
                  />
                  <TagLabel cursor="pointer" textDecoration="underline" _hover={{color:"black"}}>0xF2a9838F38FA604cCC070</TagLabel>
                  </Tag>
                </HStack>
                </Skeleton>

                <HStack  w="100%">
                  <Skeleton isLoaded={props.userDataLoaded} w="80%">
                    <Text fontSize="5xl" fontFamily="RomanBlack" >
                      {props.userData && props.userData.balance}
                    </Text>
                  </Skeleton>
                </HStack>
              </VStack>
            </HStack>
          </Box>

          <Box bg="white" w="100%" p="4%" boxShadow="base">
            <HStack>
              <VStack
                align="flex-start"
                justify="flex-start"
                marginTop="3%"
                w="100%"
                spacing="2%"
              >
                <Skeleton isLoaded={props.userDataLoaded}>
                  <VStack
                    spacing="1%"
                    w="100%"
                    align="flex-start"
                    justify="flex-start"
                  >
                    <Text fontSize="xl" fontFamily="RomanBlack">
                      Price per coffee
                    </Text>
                    <Text color="gray" fontFamily="RomanBook">
                      Change the default price of a coffee to an amount of your
                      choice.
                    </Text>
                  </VStack>
                </Skeleton>

                <HStack w="100%">
                  {[1, 2, 3, 4, 5].map((e, key) => {
                    return (
                      <SkeletonCircle size="12" isLoaded={props.userDataLoaded} key={key}>
                      <Box
                        as="button"
                        height="44px"
                        width="44px"
                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                        border="2px"
                        borderRadius="23px"
                        fontSize="16px"
                        bg={e == priceCoffee ? "#f1c40f":"transparent"}
                        borderColor="#f1c40f"
                        color="black"
                        _hover={{ bg: "transparent" }}
                        _active={{
                          bg: "  transparent",
                        }}
                        fontFamily="RomanBook"
                        onClick={()=>{setPriceCoffee(e)}}
                      >
                        ${e}
                      </Box>
                      </SkeletonCircle>
                    );
                  })}
                </HStack>
                <Divider w="100%" />
                
                <Skeleton isLoaded={props.userDataLoaded}>
                  <VStack
                    spacing="1%"
                    w="100%"
                    align="flex-start"
                    justify="flex-start"
                  >
                    <Text fontSize="xl" fontFamily="RomanBlack">
                      Thank you message
                    </Text>
                    <Text color="gray" fontFamily="RomanBook">
                      This will be visible after the payment and in the receipt
                      email. Write a personable thank you message, and include any
                      rewards if you like.
                    </Text>
                  </VStack>
                

                <Textarea
                  placeholder="Thank you for the support! 🎉"
                  focusBorderColor="gray"
                  fontFamily="RomanBook"
                  value={thankMessage}
                  onChange={(e)=>setThankMessage(e.target.value)}
                />
                <Button
                  colorScheme="gray"
                  variant="outline"
                  w="100%"
                  fontFamily="RomanBlack"
                  onClick={async()=>{

                    await setDonationSetting(priceCoffee,thankMessage).then((v)=>{
                      setPriceCoffee(priceCoffee)
                      setThankMessage('')
                    })

                    await props.fetchUserData()


                  }}
                >
                  Save Changes
                </Button>
                </Skeleton>
              </VStack>
            </HStack>
          </Box>
          
          <Skeleton isLoaded={props.userDataLoaded} w="100%">
          <Box bg="white" w="100%" p="4%" boxShadow="base">
            <HStack>
              <VStack
                align="flex-start"
                justify="flex-start"
                marginTop="3%"
                w="100%"
                spacing="2%"
              >
                <VStack
                  spacing="1%"
                  w="100%"
                  align="flex-start"
                  justify="flex-start"
                >
                  <Text
                    fontSize="xl"
                    fontWeight="extrabold"
                    fontFamily="RomanBlack"
                  >
                    Payouts
                  </Text>
                  <Text color="gray" fontFamily="RomanBook">
                    Get paid with the polygon network automatically.
                  </Text>
                </VStack>

                <HStack
                  w="100%"
                  justify="space-between"
                  border=".1px solid rgba(0,0,0,.1)"
                  borderRadius="9px"
                  p="1%"
                >
                  <VStack align="flex-start" justify="flex-start">
                    <Text fontFamily="RomanBook">Outstanding Balance</Text>
                    <Text fontFamily="RomanBlack" fontSize="29px">
                      $0
                    </Text>
                  </VStack>
                  <Box
                    as="button"
                    height="44px"
                    lineHeight="1.2"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    border="1px"
                    px="18px"
                    borderRadius="23px"
                    fontSize="18px"
                    bg="black"
                    borderColor="transparent"
                    color="white"
                    fontFamily="RomanBlack"
                    _hover={{ bg: "black" }}
                    _active={{
                      bg: "gray",
                      transform: "scale(0.98)",
                    }}
                  >
                    withdraw
                  </Box>
                </HStack>
              </VStack>
            </HStack>
          </Box>
          </Skeleton>
          <Skeleton isLoaded={props.userDataLoaded} w="100%">
          
          <Box bg="white" w="100%" p="4%" boxShadow="base">
            <HStack>
              <VStack
                align="flex-start"
                justify="flex-start"
                marginTop="3%"
                w="100%"
                spacing="2%"
              >
                <VStack
                  spacing="1%"
                  w="100%"
                  align="flex-start"
                  justify="flex-start"
                >
                  <Text
                    fontSize="xl"
                    fontWeight="extrabold"
                    fontFamily="RomanBlack"
                  >
                    My Page Link
                  </Text>
                </VStack>

                <HStack
                  w="100%"
                  justify="space-between"
                  border=".1px solid rgba(0,0,0,.1)"
                  borderRadius="9px"
                  p="1%"
                >
                  <VStack align="flex-start" justify="flex-start">
                    <Text fontFamily="RomanBook">
                      buymeacoffee.com/0x19999947474788
                    </Text>
                  </VStack>
                  <Box
                    as="button"
                    height="44px"
                    lineHeight="1.2"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    border="1px"
                    px="18px"
                    borderRadius="23px"
                    fontSize="18px"
                    bg="rgba(0,0,0,.1)"
                    borderColor="transparent"
                    color="black"
                    fontFamily="RomanBlack"
                    _hover={{ bg: "rgba(0,0,0,.1)" }}
                    _active={{
                      bg: "rgba(0,0,0,.1)",
                      transform: "scale(0.98)",
                    }}
                  >
                    copy
                  </Box>
                </HStack>
              </VStack>
            </HStack>
          </Box>
          </Skeleton>
          <Skeleton isLoaded={props.userDataLoaded} w="100%">

          <Box
            bg="#fef6f6"
            w="100%"
            p="4%"
            boxShadow="base"
            border="1px solid #f6a6a6"
            borderRadius="4px"
          >
            <HStack>
              <VStack
                align="flex-start"
                justify="flex-start"
                marginTop="3%"
                w="100%"
                spacing="2%"
              >
                <VStack
                  spacing="1%"
                  w="100%"
                  align="flex-start"
                  justify="flex-start"
                >
                  <Text
                    fontSize="xl"
                    fontWeight="extrabold"
                    fontFamily="RomanBlack"
                  >
                    Disable Account
                  </Text>
                </VStack>

                <HStack w="100%" justify="space-between" borderRadius="9px">
                  <VStack align="flex-start" justify="flex-start" w="55%">
                    <Text fontFamily="RomanBook">
                      Your account will be temporarily deactivated and will not
                      be accessible publicly. You will be logged out in the
                      process, and the page will be re-activated when you login
                      again.
                    </Text>
                  </VStack>
                  <Box
                    as="button"
                    height="44px"
                    lineHeight="1.2"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    border="1px"
                    px="18px"
                    borderRadius="23px"
                    fontSize="18px"
                    bg="#ee5252"
                    borderColor="transparent"
                    color="white"
                    fontFamily="RomanBlack"
                    _hover={{ bg: "rgba(0,0,0,.1)" }}
                    _active={{
                      bg: "rgba(0,0,0,.1)",
                      transform: "scale(0.98)",
                    }}
                  >
                    Disable
                  </Box>
                </HStack>
              </VStack>
            </HStack>
          </Box>
          </Skeleton>

        </VStack>
      </HStack>
    </Box>
  );
}
