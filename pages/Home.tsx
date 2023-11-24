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

export default function HomeScreen({ navigation }) {
  const [result, setResult] = useState({});
  const [fontSize, SetFontSize] = useState(14);
  const [language, setLanguage] = useState("english");
  const [searchText, setSearchText] = useState("");
  // const trimVal = searchText.trim().toLowerCase();
  // const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${trimVal}`;
  // const response = await fetch(api);.

  async function fetchData(val) {
    const trimVal = encodeURIComponent(val.toLowerCase());
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
    await fetchData(e);
    console.log(result);
  };
  // const filteredData = optionList.filter((item) => {
  //   return item.name.toLowerCase().includes(searchText.toLowerCase());
  // });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: fontSize }}>
            Change Font:
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            SetFontSize(fontSize - 1);
          }}
          style={{ flex: 0, margin: 5 }}
        >
          {/* button kek also why comments being weird here */}
          <View
            style={{ padding: 10, backgroundColor: "blue", borderRadius: 10 }}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: fontSize }}
            >
              -1
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 0, margin: 5 }}
          onPress={() => {
            SetFontSize(fontSize + 1);
          }}
        >
          {/* button kek also why comments being weird here */}
          <View
            style={{ padding: 10, backgroundColor: "blue", borderRadius: 10 }}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: fontSize }}
            >
              +1
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (language === "english") {
              setLanguage("telugu");
            } else {
              setLanguage("english");
            }
          }}
          style={{ flex: 0, margin: 5 }}
        >
          {/* button kek also why comments being weird here */}
          <View
            style={{ padding: 10, backgroundColor: "blue", borderRadius: 10 }}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: fontSize }}
            >
              {language}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputs, { fontSize: fontSize }]}
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
            <TouchableOpacity
              key={item.pageid.toString()}
              onPress={() => {
                navigation.push("WikiDetails", [fontSize, item.title]);
              }}
              style={[styles.card]}
            >
              <View style={styles.cardContent}>
                <Text style={[styles.name, { fontSize: fontSize + 6 }]}>
                  {"Title: "}
                  {item ? item.title : "nothing found"}
                </Text>

                <HTMLView
                  style={{ marginLeft: 10 }}
                  value={`<p style="font-size:${fontSize}">${item.snippet}</p> `}
                />
              </View>
            </TouchableOpacity>
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
