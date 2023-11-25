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
  ScrollView,
} from "react-native";
import axios from "axios";
import HTMLView from "react-native-htmlview";
export default function WikiDetails({ route, navigation }) {
  const [result, setResult] = useState({});
  const [fontSize, setFontSize] = useState(route.params[0]);
  const [summary, setSummary] = useState("");
  const title = route.params[1];
  const language = route.params[2];
  const isDarkMode = route.params[3];


  //   setFontSize(14);

  // const trimVal = searchText.trim().toLowerCase();
  // const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${trimVal}`;
  // const response = await fetch(api);.
  function extractTextInCurlyBraces(inputString) {
    const regex = /\{(.*?)\}/; // Regular expression to match text inside curly braces
    const match = regex.exec(inputString);
    if (match && match.length > 1) {
      return match[1].trim(); // Extracted text inside curly braces
    }
    return null; // Return null if no match is found
  }

  const getChatbotResponse = async (userInput) => {
    //said response function lol
    console.log(`userinput: ${userInput}`);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `User: give me a summary of: ${userInput} in write the summary inside { } in less than 140 tokens and nothing else.\n`,
          max_tokens: 150,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              // "Bearer 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", // said api do not copy this is secret lmao
          },
        }
      );

      return [
        /*gives an id to each response tried making it serial but didnt work so some dude said to do this*/
        {
          _id: Math.round(Math.random() * 1000000),
          text: `summary bot: ${response.data.choices[0].text.trim()}`,
          createdAt: new Date(),
        },
      ];
    } catch (error) {
      //error handling that some guy on yt said to add cause ai can cause errors *[acts shocked]*
      console.error(error); //some random shit cause f errors
      return [];
    }
  };

  useEffect(() => {
    async function fetchData() {
      //displays when opened
      try {
        if (language === "english") {
          const response = await axios.get(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&exintro=true`
          );
          const page = await Object.values(response.data.query.pages)[0];
          chatbot(page.extract);
          console.log(page);
          setResult(page.extract);
        } else {
          const response = await axios.get(
            `https://te.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&exintro=true`
          );
          const page = await Object.values(response.data.query.pages)[0];
          setSummary(page.extract);
        }
        // setResult(responseJSON.query.pages);
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    fetchData();
  }, []);
  async function chatbot(result) {
    const response2 = await getChatbotResponse(result);
    console.log(response2[0].text);
    const summaryOutput = extractTextInCurlyBraces(response2[0].text);

    setSummary(summaryOutput);
    console.log(summary);
  }
  //   async function fetchData(val) {

  //       try {
  //         const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${title}`;
  //         const response = await fetch(api);
  //         const responseJSON = await response.json();
  //         console.log(responseJSON);

  //         setResult(responseJSON.query.search);
  //       } catch (error) {
  //         console.log(error);
  //         return [];
  //     }
  //   }

  //
  // const filteredData = optionList.filter((item) => {
  //   return item.name.toLowerCase().includes(searchText.toLowerCase());
  // });
  const html = StyleSheet.create({
    p: {
      fontSize: fontSize, // make links coloured pink
    },
  });
  return (
    <ScrollView style={[styles.container, { fontSize: fontSize + 10, backgroundColor:isDarkMode?'#0f0f0f':'#eee', color:isDarkMode?'black':'white'}]}>
      <View style={[styles.header, {color:isDarkMode?'white':'black'}]}>
        {/* <Image style={styles.photo} source={{ uri: icon }} /> */}
        <Text style={[styles.name, {color:isDarkMode?'white':'black'}]}>{title}</Text>
        {/* <Text style={styles.title}>{firm}</Text> */}
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 6,color:isDarkMode?'white':'black' }]}>
            About:
          </Text>

          {/* <View style={styles.sectionContent}>
            {education.map((event, i) => {
              return (
                <View key={i}>
                  <Text style={styles.sectionItem}>{event}</Text>
                </View>
              );
            })}
          </View> */}
        </View>
        <View style={styles.section}>
          {/* <Text style={[styles.sectionItemTitle, { fontSize: fontSize }]}>
            {summary}
          </Text> */}
          {language === "english" ? (
            <Text style={[styles.sectionItemTitle, { fontSize: fontSize, color:isDarkMode?'white':'black' }]}>
              {summary}
            </Text>
          ) : (
            <HTMLView
              stylesheet={html}
              style={{ marginLeft: 10 }}
              value={`${summary}`}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    color: "gray",
  },
  body: {},
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  sectionContent: {
    marginTop: 8,
  },
  sectionItem: {
    marginVertical: 4,
  },
  sectionItemTitle: {
    fontWeight: "600",
  },
  sectionItemDesc: {
    fontSize: 14,
    color: "gray",
  },
});
