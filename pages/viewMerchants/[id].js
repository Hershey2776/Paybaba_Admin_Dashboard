import React from "react";
const { useState, useEffect } = React;
import { useRouter } from "next/router";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@chakra-ui/react";
import styles from "../../styles/Table.module.css";
import Head from "next/head";
import { FiTrash2, FiUser } from "react-icons/fi";
import { MdPageview } from "react-icons/md";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiSearch,
  FiBell,
} from "react-icons/fi";

const ViewMerchants = () => {
  const router = useRouter();
  const merchantId = router.query.id;
  const [merchants, setMerchant] = useState([]);
  const [upi, setUpi] = useState();
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [status, setStatus] = useState("");
  const [qr, setQr] = useState("");
  const [updated, setUpdated] = useState("");
  const [imgData, setImgData] = useState(null);
  const [cat, setCat] = useState("");

  const getmerch = async () => {
    const jwt_token = localStorage.getItem("admin");

    var myheaders = new Headers();
    myheaders.append(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
      "Access-Control-Allow-Credentials",
      "true"
    );
    myheaders.append("Content-Type", "application/json");
    const url = `http://localhost:5000/admin/getParticularMerchant?admin_jwt=${jwt_token}&merchantid=${merchantId}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    setMerchant(data?.data);
    setQr(data.data[0].qr);
    setStatus(data.data[0]?.status);
    setName(data.data[0]?.username);
    setEmail(data.data[0]?.email);
    setUpi(data.data[0]?.upi);
    setUpdated(data.data[0]?.updatedAt);
  };
  useEffect(() => {
    const jwt_token = localStorage.getItem("admin");
    if (router.isReady) {
      if (!jwt_token) {
        window.location.href = "/login";
      } else {
        getmerch();
      }
    }
  }, [router.isReady]);

  const updateMerch = async (e) => {
    e.preventDefault();
    const jwt_token = localStorage.getItem("admin");
    const updateurl = `http://localhost:5000/admin/updateMerch?admin_jwt=${jwt_token}&merchantid=${merchantId}&username=${username}&email=${email}&upiId=${upi}&qr=${qr}&status=${status}`;
    var myheaders = new Headers();
    myheaders.append(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
      "Access-Control-Allow-Credentials",
      "true"
    );

    var requestOptions = {
      method: "POST",
      headers: myheaders,
    };
    const response = await fetch(updateurl, requestOptions);
  };

  return (
    <>
      <Head>
        <title>Edit Merchant </title>
        <meta name="description" content="Orders Page" />
      </Head>

      <div className={styles.new}>
        <Flex
          className={styles.nav}
          h="100vh"
          flexDir="row"
          overflow="hidden"
          maxW="2000px"
        >
          <Flex
            w="15%"
            flexDir="column"
            alignItems="center"
            backgroundColor="#020202"
            color="#fff"
          >
            <Flex flexDir="column" justifyContent="space-between">
              <Flex flexDir="column" as="nav">
                <Heading
                  mt={50}
                  mb={100}
                  fontSize={20}
                  alignSelf="center"
                  letterSpacing="tight"
                >
                  PayBaba
                </Heading>
                <Flex
                  flexDir="column"
                  align="flex-start"
                  justifyContent="center"
                >
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon
                        as={FiHome}
                        fontSize="2xl"
                        className="active-icon"
                      />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/"
                    >
                      <Text className="active">Home</Text>
                    </Link>
                  </Flex>
                  {/* <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                  <Link display={["none", "none", "flex", "flex", "flex"]}>
                    <Icon as={FiPieChart} fontSize="2xl" />
                  </Link>
                  <Link
                    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]}
                  >
                    <Text className="active">Charts</Text>
                  </Link>
                </Flex> */}
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={FiDollarSign} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/allTrans"
                    >
                      <Text className="active">All Transactions</Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={FiDollarSign} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/logout"
                    >
                      <Text className="active">Merchant</Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={FiDollarSign} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/addMerch"
                    >
                      <Text className="active">Add Merchant</Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={FiDollarSign} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/logout"
                    >
                      <Text className="active">Logout</Text>
                    </Link>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                <Avatar my={2} src="avatar-1.jpg" />
                {/* <Text textAlign="center">{merchants}</Text> */}
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <div className={styles.newContainer}>
          <div className={styles.top}>
            <h1>Edit Details</h1>
          </div>

          <div className={styles.bottom}>
            <div className={styles.right}>
              <form className={styles.form}>
                <div className={styles.input}>
                  <label>Merchant Id</label>
                  <input
                    onChange={(e) => setId(e.target.value)}
                    type="text"
                    placeholder={merchants[0]?._id}
                    readOnly
                  />
                </div>
                <div className={styles.input}>
                  <label>User Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder={merchants[0]?.username}
                  />
                </div>
                <div className={styles.input}>
                  <label>Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder={merchants[0]?.email}
                  />
                </div>
                <div className={styles.input}>
                  <label>UPI Id</label>
                  <input
                    onChange={(e) => setUpi(e.target.value)}
                    type="text"
                    placeholder={merchants[0]?.upiId}
                  />
                </div>
                <div className={styles.input}>
                  <label>Status</label>
                  <input
                    onChange={(e) => setStatus(e.target.value)}
                    type="text"
                    placeholder={merchants[0]?.status}
                  />
                </div>
                <div className={styles.input}>
                  <label>Last login</label>
                  <Input
                    type="text"
                    placeholder={merchants[0]?.lastlogin}
                    readOnly
                  />
                </div>
                <div className={styles.input}>
                  <label>QR</label>
                  <input
                    onChange={(e) => setQr(e.target.value)}
                    type="text"
                    placeholder={qr}
                  />
                </div>
                <div className={styles.input}>
                  <label>Status</label>
                  <input
                    onChange={(e) => setStatus(e.target.value)}
                    type="text"
                    placeholder={merchants[0]?.status}
                  />
                </div>
                <div className={styles.input}>
                  <label>Updated At</label>
                  <Input
                    readOnly
                    type="text"
                    placeholder={merchants[0]?.updatedAt}
                  />
                </div>
                <div className={styles.input}>
                  {/* <FormControl sx={{ m: 1, minWidth: 280 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={cat}
                      label="Category"
                      onChange={(e) => setCat(e.target.value)}
                    >
                      {cats.map((v) => (
                        <MenuItem key={v._id} value={v}>
                          {v.categorytitle}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Choose Category</FormHelperText>
                  </FormControl> */}
                </div>
                <button onClick={(e) => updateMerch(e)}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewMerchants;
