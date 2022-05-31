import React, {useState} from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SectionHeaders from '../../../components/SectionHeaders';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useToast } from 'react-native-toast-notifications';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

function AddCategoryModal({ isVisible, onPressCancel }) {
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState(null);

  // const { state, dispatch } = useContext(AppContext);

  const toast = useToast();
  const db = getFirestore();
  // const storage = getStorage();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setCover(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const filename = cover.substring(cover.lastIndexOf('/') + 1);
      console.log(filename);
  
      const storage = getStorage();
      const storageRef = ref(storage, `images/${filename}`);
      
      // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const image = await fetch(cover);
      const imageBlob = await image.blob();
  
      // 'file' comes from the Blob or File API
      let imageUploadInfo = await uploadBytes(storageRef, imageBlob);
  
      let imageUrl = await getDownloadURL(imageUploadInfo.ref);
      console.log('File available at', imageUrl);
      // setCover(imageUrl);
      return imageUrl;
    } catch (error) {
      console.log(error)
    }
  };

  const handleAddCategory = async () => {
    setLoading(true);
    try {

      const dbRef = doc(db, 'categories', categoryName);

      console.log('--------------------- db ref done');
      console.log(cover);
      const coverUrl = await uploadImage(cover);
      console.log('--------------------- uploadImage done');
      console.log(coverUrl);

      const data = {
        cover: coverUrl,
        categoryName,
        categoryDescription
      }
  
      // set user data in firestore
      let dataInfo = await setDoc(dbRef, data);
      console.log(dataInfo);
      setCategoryName(null);
      setCategoryDescription(null);
      setCover(null);
      toast.show('Category added successfull');
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
          <View style={{marginTop: hp(45), alignItems: 'flex-end', paddingHorizontal: wp(20)}}>
            <Ionicons name={'close'} size={wp(30)} color={colors.primaryLighter} />
          </View>
        </TouchableOpacity>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backBtnContainer}>
              <Ionicons name={'arrow-back'} color={colors.secondaryDarker} size={wp(30)} />
            </View>
          </TouchableOpacity> */}
          <View style={{marginLeft: wp(15)}}>
            <Text style={styles.title}>Add new category</Text>
            {/* <Text style={styles.description}>Browse all style categories.</Text> */}
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={{marginTop: hp(10)}}>
            <View>
              <SectionHeaders title={'Add category cover image'} subTitle={'Add cover image for the category'} />
              <View style={styles.content}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: cover}} style={styles.image} />
                  <LinearGradient colors={['#3E2A1D80', '#3E2A1Dee']} end={{ x: 0.5, y: 0.78 }}
                    style={[styles.image, {position: 'absolute', alignItems: 'center', justifyContent: 'center'}]}>
                      <TouchableOpacity onPress={pickImage}>
                        <Text style={{fontSize: wp(20), color: colors.secondary}}> + Add cover pictures</Text>
                      </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            <View style={{marginTop: hp(25)}}>
              <SectionHeaders title={'Category name'} subTitle={'This is the category name'} />
              <View style={styles.content}>
                <Input
                  backgroundColor={colors.mainBg+80}
                  onChangeText={(value) => setCategoryName(value)}
                  value={categoryName}
                  placeholder={'Enter category name'} />
              </View>
            </View>
            <View style={{marginTop: hp(25)}}>
              <SectionHeaders title={'Category Description'} subTitle={'Write a short category dscription'} />
              <View style={styles.content}>
                <Input
                  backgroundColor={colors.mainBg+80}
                  onChangeText={(value) => setCategoryDescription(value)}
                  value={categoryDescription}
                  placeholder={'Enter category description'} />
              </View>
            </View>
            <View style={[styles.content, {marginTop: hp(25), paddingBottom: hp(30)}]}>
              <Button dark title={'Add category'} onPress={handleAddCategory} loading={loading} />
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
    height: wp(300),
    width: wp(335),
    backgroundColor: colors.secondary,
  },
  image: {
    height: wp(300),
    width: wp(335),
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: hp(5)
  },
})

export default AddCategoryModal;