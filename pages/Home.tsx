import * as React from "react";
import { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [result, setResult] = useState({});
  const [fontSize, SetFontSize] = useState(14);
  const [language, setLanguage] = useState("english");
  const [searchText, setSearchText] = useState("");
  // const trimVal = searchText.trim().toLowerCase();
  // const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${trimVal}`;
  // const response = await fetch(api);.
  useEffect(() => {
    getFontSize();
    getLanguage();
  }, []);

  const getFontSize = async () => {
    try {
      const value = await AsyncStorage.getItem("fontSize");
      if (value !== null) {
        SetFontSize(parseInt(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem("Language");
      if (value !== null) {
        setLanguage(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function getTeluguTitle(englishTitle) {
    try {
      const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks&titles=${encodeURIComponent(
        englishTitle
      )}&lllang=te`;
      const response = await fetch(api);
      const responseJSON = await response.json();

      // Check if the response contains the pages
      if (responseJSON.query && responseJSON.query.pages) {
        // Get the first page (there should be only one)
        const page = Object.values(responseJSON.query.pages)[0];

        // Check if langlinks property exists
        if (page.langlinks && page.langlinks.length > 0) {
          // Get the Telugu title
          const teluguTitle = page.langlinks[0]["*"];
          console.log(teluguTitle);
          return teluguTitle;
        }
      }
    } catch (error) {
      console.log(error);
    }

    // Return null if there's an error or no Telugu title found
    return null;
  }
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

  const storeFontSize = async (value) => {
    try {
      await AsyncStorage.setItem("fontSize", String(value));
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  const storeLanguage = async (value) => {
    try {
      await AsyncStorage.setItem("Language", value);
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  async function fetchDataTelugu(val) {
    const trimVal = encodeURIComponent(val.toLowerCase());
    console.log(trimVal);
    if (trimVal.length > 0) {
      try {
        const api = `https://te.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${trimVal}`;
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
    if (language === "english" || language === "RomanTelugu") {
      setSearchText(e);
      await fetchData(e);
    } else {
      setSearchText(e);
      await fetchDataTelugu(e);
    }
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
            storeFontSize(String(fontSize));
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
            storeFontSize(String(fontSize));
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
              storeLanguage("telugu");
            } else if (language === "telugu") {
              setLanguage("RomanTelugu");
              storeLanguage("RomanTelugu");
            } else if (language === "RomanTelugu") {
              setLanguage("english");
              storeLanguage("english");
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
              onPress={async () => {
                let title = item.title;
                if (language === "RomanTelugu") {
                  title = await getTeluguTitle(item.title);
                }

                navigation.push("WikiDetails", [fontSize, title, language]);
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
