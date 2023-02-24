import {
  AccountBalanceOutlined,
  KeyboardArrowUpOutlined,
  MonetizationOnOutlined,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React from "react";
import styles from "../../styles/widgets.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Widgets = ({ type }) => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [merchCount, setMerchCount] = useState("");
  const [transactions, setTransactions] = useState("");

  const getAmount = async () => {
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
    const url = `https://api.paybaba.co/admin/totalAmount?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setAmount(data?.amount);
  };

  const getmerchCount = async () => {
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
    const url = `https://api.paybaba.co/admin/merchCount?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setMerchCount(data?.merchants);
  };

  const getTransCount = async () => {
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
    const url = `https://api.paybaba.co/admin/transCount?admin_jwt=${jwt_token}`;
    var requestOptions = {
      method: "GET",
      headers: myheaders,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTransactions(data?.transaction);
  };

  useEffect(() => {
    const jwt_token = localStorage.getItem("admin");
    if (router.isReady) {
      getAmount();
      getmerchCount();
      getTransCount();
    }
  }, [router.isReady]);

  let data = {};
  let val = 0;
  let transaction = 0;
  const diff = 10;
  switch (type) {
    default:
      break;
    case "user":
      data = {
        title: "Merchants",
        val: merchCount,
        isMoney: false,
        link: "View all Merchants",
        href: "/merchant",
        icon: (
          <PersonOutlineOutlined
            className={styles.icon}
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          ></PersonOutlineOutlined>
        ),
      };
      break;
    case "order":
      data = {
        title: "Transactions",
        isMoney: false,
        val: transactions,
        link: "View all transactions",
        href: "/allTrans",
        icon: (
          <ShoppingCartOutlined
            className={styles.icon}
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          ></ShoppingCartOutlined>
        ),
      };
      break;
    case "earning":
      data = {
        title: "Earnings",
        val: amount,

        isMoney: true,
        // link: "View net Earnings",
        // href: "/earning",
        icon: (
          <MonetizationOnOutlined
            className={styles.icon}
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          ></MonetizationOnOutlined>
        ),
      };
      break;
    case "balance":
      data = {
        title: "Products",
        isMoney: false,
        link: "Show products",
        href: "/products",
        icon: (
          <AccountBalanceOutlined
            className={styles.icon}
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          ></AccountBalanceOutlined>
        ),
      };
      break;
  }
  return (
    <div className={styles.widgets}>
      <div className={styles.left}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.counter}>
          {data.isMoney && "INR"} {data?.val}
        </span>
        <a
          href={data.href}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span className={styles.link}>{data.link}</span>
        </a>
      </div>
      <div className={styles.right}>
        <div className={[styles.percentage, styles.positive].join(" ")}>
          {/* <KeyboardArrowUpOutlined></KeyboardArrowUpOutlined> {diff}% */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
