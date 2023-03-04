import * as React from "react";
import {
  ChakraProvider,
  Text,
  Box,
  Flex,
  Input,
  VStack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import {
  connect_account_AU,
  fetch_account_AU,
  fetch_chain_ID,
} from "./polygon/wallet";
import { useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import "./App.css";
import storeFiles from "./polygon/ipfs";
import cam from "./assets/camera.svg";
import { completePage, fetchUserFlag, getUser } from "./polygon/contract";
import Dashboard from "./Dashboard";
import get_exchangeRates from "./polygon/market";
import Buy from "./Buy";

function Home(props) {
  return (
    <Box h="100vh">
      <Flex
        gridRowGap="4%"
        align="center"
        height="86%"
        justifyContent="center"
        flexDirection="column"
      >
        <Text
          textAlign="center"
          fontSize="6xl"
          lineHeight="1.2"
          fontFamily="RomanBlack"
        >
          A supporter is worth a<br />
          thousand followers.
        </Text>
        <Text textAlign="center" fontSize="2xl" fontFamily="RomanBook">
          Accept donations. Start a membership. Sell anything you like.
          <br />
          It’s easier than you think.
        </Text>

        <Flex
          borderRadius="43px"
          bg="white"
          p="12px"
          align="center"
          justifyContent="space-between"
          paddingInlineStart="2%"
          paddingInlineEnd="1%"
        >
          <Flex>
            <Text fontFamily="RomanBlack" fontSize="2xl" fontWeight="extrabold">
              buymeacoffee.com/
            </Text>
            <Input
              type="text"
              fontFamily="RomanBook"
              variant="unstyled"
              style={{ backgroundColor: "transparent", fontSize: "23px" }}
              placeholder="yourname"
            />
          </Flex>

          <Box
            as="button"
            height="48px"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px"
            px="22px"
            borderRadius="23px"
            fontSize="18px"
            bg="#ffdd00"
            borderColor="transparent"
            color="black"
            _hover={{ bg: "#ebedf0" }}
            _active={{
              bg: "  #ffdd00",
              transform: "scale(0.98)",
            }}
            fontFamily="RomanBlack"
          >
            Start page
          </Box>
        </Flex>

        <Text textAlign="center" fontSize="1xl" fontFamily="RomanBook">
          It’s free, and takes less than a minute.
        </Text>
      </Flex>
    </Box>
  );
}

function Complete(props) {
  const [avatar, setAvatar] = useState(undefined);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState(`buymeacoffee.com/${props.wallet}`);
  const [about, setAbout] = useState("");
  const [social, setSocial] = useState("");
  const [cid, setCid] = useState("");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState([]);

  const toast = useToast();

  const uploadAvatarToIpfs = async () => {
    if (avatar.type.includes("image")) {
      var reader = new FileReader();

      reader.readAsDataURL(avatar);

      reader.onload = function (e) {
        var image = new Image();

        image.src = e.target.result;

        image.onload = async function () {
          var height = this.height;
          var width = this.width;

          if (height == 100 && width == 100) {
            toast({
              position: "bottom-left",
              title: "Image Upload",
              description: "Uploading your avatar...",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            const cid = await storeFiles([avatar], props.refLoader);
            setCid(cid);
            setAvatarUrl(`https://${cid}.ipfs.w3s.link/${fileName}`);
          } else {
            toast({
              position: "bottom-left",
              title: "Image Upload",
              description: "Feel free to provide 100x100 image !",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        };
      };
    } else if (!avatar.type.includes("image")) {
      toast({
        position: "bottom-left",
        title: "Image Upload",
        description: "Feel free to provide image !",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="24px" paddingBottom="2%">
      <Text fontSize="3xl" lineHeight="1.2" fontWeight="extrabold">
        Complete your page
      </Text>
      <VStack spacing="14px">
        <Box
          onClick={() => {
            document.getElementById("file-input").click();
          }}
          className="file-avatar"
          p={cid == "" ? "35%" : "8%"}
          borderRadius="100%"
          border="2px dashed black"
          cursor="pointer"
        >
          {cid == "" ? (
            <img src={cam} width={22} />
          ) : (
            <img
              src={`https://${cid}.ipfs.w3s.link/${fileName}`}
              width="100%"
              style={{ borderRadius: "100%" }}
            />
          )}
        </Box>

        <Text
          fontSize="1xl"
          fontWeight="medium"
          marginTop="2%"
          cursor="pointer"
          onClick={async () => {
            await uploadAvatarToIpfs(avatar);
          }}
        >
          Add your photo
        </Text>
        <Input
          type="file"
          onChange={(e) => {
            setAvatar(e.target.files[0]);
            setFileName(e.target.files[0].name);
          }}
          id="file-input"
          style={{ display: "none" }}
        />
      </VStack>

      <VStack spacing="5%" width="31%">
        <FormControl isInvalid={errors.includes(0)}>
          <FormLabel>Name</FormLabel>

          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
            focusBorderColor="#ffdd00"
            border="2px solid"
          />
          {errors.includes(0) && (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={errors.includes(1)}>
          <FormLabel>Buy Me a Coffee link</FormLabel>
          <Input
            value={link}
            focusBorderColor="#ffdd00"
            type="text"
            placeholder="Link"
            border="2px solid"
            onChange={(e)=>{setLink(link)}}
          />

          {errors.includes(1) ? (
            <FormErrorMessage>Link is required.</FormErrorMessage>
          ) : (
            <FormHelperText>Feel free to provide unique link.</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={errors.includes(2)}>
          <FormLabel>About</FormLabel>
          <Textarea
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            value={about}
            focusBorderColor="#ffdd00"
            border="2px solid"
            placeholder="Hey 👋 I just created a page here. You can now buy me a coffee!"
          />
          {errors.includes(2) && (
            <FormErrorMessage>About is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={errors.includes(3)}>
          <FormLabel>Website or social link</FormLabel>
          <Input
            onChange={(e) => {
              setSocial(e.target.value);
            }}
            value={social}
            focusBorderColor="#ffdd00"
            type="text"
            placeholder="https://"
            border="2px solid"
          />
          {errors.includes(3) && (
            <FormErrorMessage>Social Link is required.</FormErrorMessage>
          )}
        </FormControl>

        <Box
          as="button"
          width="100%"
          height="44px"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          border="1px"
          px="22px"
          borderRadius="23px"
          fontSize="18px"
          fontWeight="semibold"
          bg="#ffdd00"
          borderColor="transparent"
          color="black"
          _hover={{ bg: "#ebedf0" }}
          _active={{
            bg: "  #ffdd00",
            transform: "scale(0.98)",
          }}
          onClick={async () => {
            setErrors([]);

            if (name.trim().length == 0) {
              setErrors([...errors, 0]);
              return;
            }
            if (link.trim().length == 0) {
              setErrors([...errors, 1]);
              return;
            }
            if (about.trim().length == 0) {
              setErrors([...errors, 2]);
              return;
            }
            if (social.trim().length == 0) {
              setErrors([...errors, 3]);
              return;
            }
            if (avatarUrl.trim().length == 0) {
              toast({
                position: "bottom-left",
                title: "Image Upload",
                description: "Please upload your avatar.",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              return;
            }
            props.refLoader.current.continuousStart();
            await completePage(avatarUrl, name, link, about, social);
            props.refLoader.current.complete();
            props.fetchFlagContract();
          }}
        >
          Continue
        </Box>
      </VStack>
    </VStack>
  );
}
function NoPage(){
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/')
  },[])
  return <></>
}
export default function App() {
  const toast = useToast();
  const [chainIdMumbai, setChainIdMumbai] = useState(undefined);
  const [wallet, setWallet] = useState("");
  const [onLogin, setOnLogin] = useState(false);
  const [flag, setFlag] = useState(undefined);
  const ref = useRef(null);
  const [userData,setUserData] = useState(null)
  const [userDataLoaded,setUserDataLoaded] = useState(false)

  const connectWallet = async () => {
    /**CONNECT USER ONLY WHEN IS NOT CONNECTED */
    await connect_account_AU().then((account) => setWallet(account));
  };

  const fetchFlagContract = async () => {
    /**CHECK IF USER PROFILE IS COMPLETE */
    await fetchUserFlag().then((v) => setFlag(v));
  };

  const fetchUserData = async()=>{
    if(wallet){
      await getUser(wallet,setUserDataLoaded).then((data)=>setUserData(data))
    }
  }

  useEffect(() => {
    if (ref.current != null) {
      ref.current.continuousStart();

      setTimeout(() => {
        ref.current.complete();
      }, 1000);
    }

    if (window.ethereum) {
      fetch_chain_ID().then((networkId) => setChainIdMumbai(networkId));
    }

  }, []);

  useEffect(() => {
    if (chainIdMumbai != undefined) {
      if (chainIdMumbai) {
        toast({
          position: "bottom-left",
          title: "Polygon Network",
          description: "You are Connected to the Polygon Mumbai !",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetch_account_AU().then((account) => {
          setWallet(account);
        });
      } else {
        toast({
          position: "bottom-left",
          title: "Polygon Network",
          description: "You aren't Connected to the Polygon Mumbai !",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [chainIdMumbai]);

  useEffect(() => {
    if (wallet && wallet.trim().length > 0) {
      fetchFlagContract();
      fetchUserData()
    }
  }, [wallet]);

  return (
    <ChakraProvider>
      <LoadingBar color="#ffdd00" ref={ref} />
      <Box bg="whitesmoke" width="100%" h="100%">
        <BrowserRouter>
          
          <Routes>
            <Route
              element={
                <>
                <Navbar
                  flag={flag}
                  connectWallet={connectWallet}
                  wallet={wallet}
                  onLogin={onLogin}
                />
                <Home
                  fetchFlagContract={fetchFlagContract}
                  connectWallet={connectWallet}
                  wallet={wallet}
                  onLogin={onLogin}
                />
                </>
              }
              path="/"
            />
            <Route
              element={
              <>
               <Navbar
                  flag={flag}
                  connectWallet={connectWallet}
                  wallet={wallet}
                  onLogin={onLogin}
                />
                <Complete refLoader={ref} wallet={wallet} />
              </>
            }
              path="/complete-your-page"
            />
            <Route element={
              <>
              <Navbar
                  flag={flag}
                  connectWallet={connectWallet}
                  wallet={wallet}
                  onLogin={onLogin}
                />
                <Dashboard refLoader={ref} userDataLoaded={userDataLoaded} wallet={wallet} fetchUserData={fetchUserData} userData={userData} setUserData={setUserData}/>
              </>
            } path="/dashboard" />
            <Route exact element={<Buy />} path="/buy/:id" />
            <Route exact element={<NoPage/>} path="*" />

          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}
