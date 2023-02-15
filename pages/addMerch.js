import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Input } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import styles from "../styles/addMerch.module.css";
import { Select } from "@chakra-ui/react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdMenu,
  MdLogout,
} from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
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
import { IoIosPeople, IoIosLogOut, IoIosPersonAdd } from "react-icons/io";
import { useLayoutEffect } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";

const AddMerch = () => {
  const [merchants, setMerchant] = useState([]);
  const [upi, setUpi] = useState();
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [status, setStatus] = useState("");
  const [qr, setQr] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const router = useRouter();

  // const addMerch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const jwt_token = localStorage.getItem("admin");
  //     const updateurl = `http://localhost:5000/admin/addMerch?admin_jwt=${jwt_token}&username=${username}&email=${email}&upiId=${upi}&qr=${qr}&status=${status}&password=${password}`;
  //     var myheaders = new Headers();
  //     myheaders.append(
  //       "Access-Control-Allow-Origin",
  //       "*",
  //       "Access-Control-Allow-Origin",
  //       "http://localhost:3000",
  //       "Access-Control-Allow-Credentials",
  //       "true"
  //     );

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myheaders,
  //     };
  //     const response = await fetch(updateurl, requestOptions);
  //   } catch (e) {
  //     toast.error(e, {
  //       position: "top-center",
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt_token = localStorage.getItem("admin");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);
      await axios.post(
        `http://localhost:5000/admin/addMerch?admin_jwt=${jwt_token}&username=${username}&email=${email}&upiId=${upi}&qr=${qr}&status=${status}&password=${password}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  const getStatusData = async (e) => {
    e.preventDefault();

    setData(e.tartget.value);
  };

  return (
    <>
      <Head>
        <title>Add Merchant </title>
        <meta name="description" content="Orders Page" />
      </Head>

      <div className={styles.new}>
        <Flex
          className={styles.nav}
          h="100vh"
          flexDir="row"
          overflow="hidden"
          // maxW="2000px"
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
                      <Icon as={FiHome} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/"
                    >
                      <Text className="active">Home</Text>
                    </Link>
                  </Flex>

                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={FiDollarSign} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/allTrans"
                    >
                      <Text className="active">All Merchants</Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon as={IoIosPeople} fontSize="2xl" />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/merchant"
                    >
                      <Text className="active">Merchant</Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon
                        as={IoIosPersonAdd}
                        fontSize="2xl"
                        className="active-icon"
                      />
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
                      <Icon as={IoIosLogOut} fontSize="2xl" />
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
            <h1>Add Details</h1>
          </div>

          <div className={styles.bottom}>
            <div className={styles.right}>
              <form
                action="/images"
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className={styles.form}
              >
                <div className={styles.input}>
                  <label>User Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Joe Doe"
                    required
                  />
                </div>
                <div className={styles.input}>
                  <label>Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div className={styles.input}>
                  <label>UPI Id</label>
                  <input
                    onChange={(e) => setUpi(e.target.value)}
                    type="text"
                    placeholder="example@upi"
                  />
                </div>
                <div
                  className={styles.input}
                  style={{ width: "50px !important" }}
                >
                  <Select
                    placeholder="Select option"
                    icon={<MdChevronRight style={{ left: "40px" }} />}
                    p="0px"
                  >
                    <option value="1">1</option>
                    <option value="0">0</option>
                  </Select>
                </div>
                <div className={styles.input}>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    accept="image/*"
                  ></input>
                </div>
                <div className={styles.input}>
                  <label>Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    required
                  />
                </div>

                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMerch;
