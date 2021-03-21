import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const List = (props) => {
  const [filterItem, setFilterItem] = useState([...props.items]);

  const filterAll = (e) => {
    const currentItem = [...props.items];
    setFilterItem(
      currentItem.filter((item) => {
        const itemStr = String(item);
        return itemStr.startsWith(e.target.value);
      })
    );
  };

  return (
    <>
      <input onChange={filterAll}></input>
      <ul>
        {filterItem.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </>
  );
};

export default function Home() {
  const arrList = ["hello", "world", "hi", 1, 2, 3];
  return (
    <div className={styles.container}>
      <h1> Hello World</h1>
      <List items={arrList} />
    </div>
  );
}
