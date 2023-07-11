import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function MyFilesList({ files }) {
  // %2FIMG_D95D0D005367-1.jpeg?alt=media&token=9c31ce78-e5b3-4419-9af4-c16fec4d9443
  const Item = ({ name }) => {
    const [url, setURL] = useState();
    const blurhash =
      "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

    useEffect(() => {
      getDownloadURL(ref(getStorage(), `/images/${name}`)).then((_url) => {
        setURL(_url);
      });
    }, [name]);

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.image_container}>
        <Image
          source={url}
          style={styles.image}
          contentFit="contain"
          placeholder={blurhash}
        />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={files}
      renderItem={({ item }) => <Item name={item.name} />}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  image_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  image: {
    flex: 1,
    width: Dimensions.get('screen').width - 32,
    height: 224,
    backgroundColor: "#0553",
  },
});
