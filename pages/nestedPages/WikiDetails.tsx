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

export default function WikiDetails({ route, navigation }) {
  const [result, setResult] = useState({});
  const [fontSize, setFontSize] = useState(14);
  const title = "Albert Einstein";
  //   setFontSize(14);

  // const trimVal = searchText.trim().toLowerCase();
  // const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${trimVal}`;
  // const response = await fetch(api);.
  useEffect(() => {
    async function fetchData() {
      //displays when opened
      try {
        const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&exintro=true`;
        const response = await fetch(api);

        const responseJSON = await Object.values(response.query.pages)[0];
        console.log(responseJSON);

        // setResult(responseJSON.query.pages);
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    fetchData();
  }, []);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image style={styles.photo} source={{ uri: icon }} /> */}
        <Text style={styles.name}>{title}</Text>
        {/* <Text style={styles.title}>{firm}</Text> */}
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>

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
          <Text style={styles.sectionTitle}>Occupation</Text>

          <View style={styles.sectionContent}>
            {/* <Text style={styles.sectionItem}>{occ}</Text> */}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>ABC Law Firm</Text>
              <Text style={styles.sectionItemDesc}>
                - Worked in the xyz company's law team and did lawstuff
              </Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>
                patent team, XYZ Company (2020-2021)
              </Text>
              <Text style={styles.sectionItemDesc}>
                - worked in Salman Khan's law team for his popular case
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
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
    fontSize: 14,
    fontWeight: "600",
  },
  sectionItemDesc: {
    fontSize: 14,
    color: "gray",
  },
});
