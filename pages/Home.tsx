import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import HTMLView from "react-native-htmlview";

export default function HomeScreen() {
  const [result, setResult] = useState({});
  const optionList = [
    {
      id: 1,
      color: "#999999",
      icon: "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
      name: "Dr.Cat",
      occ: " General Physician",
      firm: "Feline Hospital",
      education: ["AIIMS Delhi", "Catword Medical School"],
    },
    {
      id: 2,
      color: "#999999",
      icon: "https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg?w=2000",
      name: "Dr.Dog",
      occ: "Cardiologist",
      firm: "Canine Hospital",
      education: ["Brown Dog University"],
    },
  ];

  const [searchText, setSearchText] = useState("");
  // const trimVal = searchText.trim().toLowerCase();
  // const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${trimVal}`;
  // const response = await fetch(api);

  async function fetchData(val) {
    const trimVal = val.trim().toLowerCase();
    console.log(trimVal);
    if (trimVal.length > 0) {
      try {
        const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${trimVal}`;
        const response = await fetch(api);
        const responseJSON = await response.json();
        console.log(responseJSON);

        setResult(responseJSON.query.search);
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }

  const handleSearch = async (e) => {
    setSearchText(e);
    await fetchData(searchText);
    console.log(result);
  };
  // const filteredData = optionList.filter((item) => {
  //   return item.name.toLowerCase().includes(searchText.toLowerCase());
  // });

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Search for a wiki..."
            underlineColorAndroid="transparent"
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
      </View>

      <FlatList
        style={styles.notificationList}
        data={result}
        renderItem={({ item }) => {
          return (
            <View key={item.pageid.toString()} style={[styles.card]}>
              <View style={styles.cardContent}>
                <View
                  style={{
                    backgroundColor: "grey",
                    width: "100%",
                  }}
                >
                  <Text style={styles.name}>
                    {"Title: "}
                    {item ? item.title : "nothing found"}
                  </Text>
                </View>

                <HTMLView value={`<p>${item.snippet}</p>`} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  formContent: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 3,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",

    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "column",
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "auto",
  },
  occ: {
    fontSize: 16,
    marginLeft: 10,
    alignSelf: "auto",
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: "#eee",
    marginTop: 5,
  },
});
