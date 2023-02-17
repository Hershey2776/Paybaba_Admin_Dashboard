import React from "react";
const { useState, useEffect } = React;
import { useRouter } from "next/router";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import { Radio, RadioGroup } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Stack,
} from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
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
  FormControl,
  Select,
  SelectChangeEvent,
} from "@chakra-ui/react";
import styles from "../../styles/addTrans.module.css";
import Head from "next/head";
import { FiTrash2, FiUser } from "react-icons/fi";
import { MdPageview } from "react-icons/md";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiEye,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiSearch,
  FiBell,
} from "react-icons/fi";
import { IoIosPeople, IoIosLogOut } from "react-icons/io";

const ViewTrans = () => {
  const router = useRouter();
  const transactionid = router.query.id;
  const [transaction, setTransaction] = useState([]);
  const [utr, setUtr] = useState();
  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [bankNummer, setBankNumber] = useState("");
  const [updateBy, setUpdateBy] = useState("");
  const [status, setStatus] = useState("");
  const [transDate, setTransDate] = useState("");
  const [ss, setSs] = useState("");
  const [mobile, setMobile] = useState("");
  const [merchantId, setMerchantId] = useState("");
  let statusVal = "";

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);
  };
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
    const url = `https://api.paybaba.co/admin/getParticularTrans?admin_jwt=${jwt_token}&transactionid=${transactionid}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    setTransaction(data?.data);
    setUtr(data.data[0]?.utr);
    setStatus(data.data[0]?.status);
    setUpdateBy(data.data[0]?.updatedBy);
    setEmail(data.data[0]?.emailId);
    setBankNumber(data.data[0]?.bankConfirmationNumber);
    setId(data.data[0]?._id);
    setAmount(data.data[0]?.amount);
    setTransDate(data.data[0]?.transactionDate);
    setSs(data.screenshot);
    setMobile(data.data[0]?.mobileno);
    setMerchantId(data.data[0]?.merchantId);
    console.log(data);
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

  const updateTarns = async (e) => {
    e.preventDefault();
    const jwt_token = localStorage.getItem("admin");
    const updateurl = `https://api.paybaba.co/admin/updateTrans?admin_jwt=${jwt_token}&transactionid=${transactionid}&emailId=${email}&status=${status}&transactionDate=${transDate}&merchantId=${merchantId}&utr=${utr}&amount=${amount}&updatedBy=${updateBy}&mobileno=${mobile}&bankConfirmationNumber=${bankNummer}&_id=${id}&screenShot=${ss}`;
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

  const setStatusFunc = (e, statusval) => {
    e.preventDefault();
    setStatus(statusVal);
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
              <Flex flexDir="column" as="nav" className="nav_con">
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
                      <Icon
                        as={FiDollarSign}
                        fontSize="2xl"
                        className="active-icon"
                      />
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
                {/* <Text textAlign="center">{transaction}</Text> */}
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
              <form className={styles.form} onSubmit={updateTarns}>
                <div className={styles.input}>
                  <label>Transaction Id</label>
                  <input
                    onChange={(e) => setId(e.target.value)}
                    type="text"
                    placeholder={transaction[0]?._id}
                    readOnly
                  />
                </div>
                <div className={styles.input}>
                  <label>Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder={transaction[0]?.emailId}
                  />
                </div>
                <div className={styles.input}>
                  <label>Amount</label>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    placeholder={transaction[0]?.amount}
                    readOnly
                  />
                </div>
                <div className={styles.input}>
                  <label>UTR</label>
                  <input
                    onChange={(e) => setUtr(e.target.value)}
                    type="text"
                    placeholder={transaction[0]?.utr}
                    readOnly
                  />
                </div>
                <div
                  className={styles.input}
                  style={{ width: "50px !important" }}
                >
                  <RadioGroup onChange={setStatus} value={status}>
                    <Stack direction="row">
                      <Radio value="completed">Completed</Radio>
                      <Radio value="pending">Pending</Radio>
                    </Stack>
                  </RadioGroup>
                </div>
                {/* <Menu>
                  <MenuButton
                    // style={{ marginLeft: "10px" }}
                    px={12}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                    // _hover={{ bg: "#F32C48", color: "#efefef" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                  >
                    <span
                      style={{
                        display: "flex",
                        gap: "2px",
                        alignItems: "center",
                        marginLeft: "0px",
                      }}
                    >
                      Status <MdChevronRight />
                    </span>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={(e, statusVal) => setStatusFunc(e, "completed")}
                    >
                      Completed
                    </MenuItem>
                    <MenuItem
                      onClick={(e, statusVal) => setStatusFunc(e, "pending")}
                    >
                      Pending
                    </MenuItem>
                  </MenuList>
                </Menu> */}
                <div className={styles.input}>
                  <label>Transaction Date</label>
                  <Input
                    type="text"
                    placeholder={transaction[0]?.transactionDate}
                    readOnly
                  />
                </div>

                <div className={styles.input}>
                  <label>Updated By</label>
                  <Input
                    onChange={(e) => setUpdateBy(e.target.value)}
                    type="text"
                    placeholder={transaction[0]?.updatedBy}
                    required
                  />
                </div>
                <div className={styles.input}>
                  <label>Mobile No</label>
                  <Input type="text" placeholder={transaction[0]?.mobileno} />
                </div>
                <div className={styles.input}>
                  <label>ScreenShot</label>
                  <a colorScheme="gray" target="_blank" href={ss} size="sm">
                    <Icon as={FiEye} fontSize="20" />
                  </a>
                </div>
                <div className={styles.input}>
                  <label>Merchant Id</label>
                  <Input
                    type="text"
                    placeholder={transaction[0]?.merchantId}
                    readOnly
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
                <button className={styles.send} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewTrans;
