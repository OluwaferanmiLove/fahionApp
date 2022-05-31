import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SectionHeaders from '../../../components/SectionHeaders';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';
import { collection, doc, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore';
import { useToast } from 'react-native-toast-notifications';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { makeid } from '../../../util/util';

function AddStyleModal({ isVisible, onPressCancel }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [styleName, setStyleName] = useState(null);
  const [styleDescription, setStyleDescription] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [categories, setCategories] = useState([]);

  // const { state, dispatch } = useContext(AppContext);

  const toast = useToast();
  const db = getFirestore();
  // const storage = getStorage();

  const dbRef = collection(db, 'categories');

  useEffect(() => {
    const q = query(dbRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });

      let allCategories = data.map((item) => {
        return {value: item, label: item.categoryName};
      })

      setCategories(allCategories);
    },
    (error) => {
      console.log(error.message);
    });
    
    return () => unsubscribe();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      console.log(filename);

      const storage = getStorage();
      const storageRef = ref(storage, `images/${filename}`);

      // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const image = await fetch(uri);
      const imageBlob = await image.blob();

      // 'file' comes from the Blob or File API
      let imageUploadInfo = await uploadBytes(storageRef, imageBlob);

      let imageUrl = await getDownloadURL(imageUploadInfo.ref);
      console.log('File available at', imageUrl);
      // setImage(imageUrl);
      return imageUrl;
    } catch (error) {
      console.log(error)
    }
  };

  const handleAddStyle = async () => {
    setLoading(true);
    try {

      const dbRefStyles = doc(db, 'styles', makeid(32));

      console.log('--------------------- db ref done');
      console.log(image);
      const coverUrl = await uploadImage(image);
      console.log(coverUrl);
      console.log('--------------------- uploadImage done');

      const data = {
        image: coverUrl,
        images: [coverUrl],
        styleName,
        styleDescription,
        category: value,
      }

      // set user data in firestore
      let dataInfo = await setDoc(dbRefStyles, data);
      console.log(dataInfo);
      setStyleName(null);
      setStyleDescription(null);
      setImage(null);
      toast.show('Style added successfull');
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      hasBackdrop={false}
      // swipeDirection={'down'}
      // onSwipeComplete={onPressCancel}
      animationIn="slideInUp"
      style={{
        width: '100%',
        bottom: 0,
        margin: 0,
        height: '100%',
        backgroundColor: colors.secondary,

      }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={onPressCancel}>
          <View style={{ marginTop: hp(45), alignItems: 'flex-end', paddingHorizontal: wp(20) }}>
            <Ionicons name={'close'} size={wp(30)} color={colors.primaryLighter} />
          </View>
        </TouchableOpacity>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backBtnContainer}>
              <Ionicons name={'arrow-back'} color={colors.secondaryDarker} size={wp(30)} />
            </View>
          </TouchableOpacity> */}
          <View style={{ marginLeft: wp(15) }}>
            <Text style={styles.title}>Add new style</Text>
            {/* <Text style={styles.description}>Browse all style categories.</Text> */}
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginTop: hp(10) }}>
            <View>
              <SectionHeaders title={'Add Style image'} subTitle={'Add image for the style you are adding'} />
              <View style={styles.content}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <LinearGradient colors={['#3E2A1D80', '#3E2A1Dee']} end={{ x: 0.5, y: 0.78 }}
                    style={[styles.image, { position: 'absolute', alignItems: 'center', justifyContent: 'center' }]}>
                    <TouchableOpacity onPress={pickImage}>
                      <Text style={{ fontSize: wp(20), color: colors.secondary }}> + Add style image</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            <View style={{ marginTop: hp(25) }}>
              <SectionHeaders title={'Style name'} subTitle={'This is the style name'} />
              <View style={styles.content}>
                <Input
                  backgroundColor={colors.mainBg + 80}
                  onChangeText={(value) => setStyleName(value)}
                  value={styleName}
                  placeholder={'Enter style name'} />
              </View>
            </View>
            <View style={{ marginTop: hp(25) }}>
              <SectionHeaders title={'Style Description'} subTitle={'Write a short style dscription'} />
              <View style={styles.content}>
                <Input
                  backgroundColor={colors.mainBg + 80}
                  onChangeText={(value) => setStyleDescription(value)}
                  value={styleDescription}
                  placeholder={'Enter category description'} />
              </View>
            </View>
            <View style={{ marginTop: hp(25) }}>
              <SectionHeaders title={'Style Category'} subTitle={'Select the category the style belong to'} />
              <View style={styles.content}>
                {/* <View style={{width: '100%', marginTop: hp(20)}}> */}
                <DropDownPicker
                  open={open}
                  value={value}
                  items={categories}
                  style={{
                    backgroundColor: colors.mainBg + 80,
                    borderWidth: 0,
                    height: hp(55)
                  }}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setCategories}
                />
                {/* </View> */}
              </View>
            </View>

            <View style={[styles.content, { marginTop: hp(25), paddingBottom: hp(30) }]}>
              <Button dark title={'Add Style'} onPress={handleAddStyle} loading={loading} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    alignItems: 'center',
    // height: hp(220),
    width: wp(125),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(375),
  },
  backBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(45),
    width: wp(45),
    borderRadius: 9999,
    backgroundColor: colors.secondary
  },
  title: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(35),
    color: colors.primary,
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.secondaryDarker,
    marginTop: hp(4)
  },
  content: {
    marginHorizontal: wp(20),
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: wp(10),
    height: wp(500),
    width: wp(335),
    backgroundColor: colors.secondary,
  },
  image: {
    height: wp(500),
    width: wp(335),
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: hp(5)
  },
})

export default AddStyleModal;