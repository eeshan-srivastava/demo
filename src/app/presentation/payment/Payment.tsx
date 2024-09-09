import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import normDimens from '../../../resources/dimens/normDimens';
import colorCode from '../../../resources/colors/colorCode';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import FastImage from 'react-native-fast-image';
import { demoApi } from '../../../data/network/apis';
import { RideItemBean } from '../bean/RideItemBean';
import LinearGradient from 'react-native-linear-gradient';
import ColorUtils from '../../../resources/colors/ColorUtils';
import TextView from '../widgets/textView/TextView';
import ImageView from '../widgets/imageView/ImageView';
import { ImageResizeMode } from '../widgets/imageView/ImageUtils';
import imageFile from '../../../resources/images/imageFile';
import mainJson from '../../../data/json/mainJson';
import { cloneDeep } from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackPressUtils from '../../../utils/BackPressUtils';
import LottieView from 'lottie-react-native';

interface Props {}

interface Route {
    params: {
        source?: string;
        subTotal: number;
    };
}

enum PaymentState {
    CHECKOUT,
    SUCCESS,
    FAILURE,
    PRINT
}

const Payment = () => {
    const route = useRoute() as Route;
    const subTotal = route.params.subTotal;

    const navigation: any = useNavigation();

    const [paymentState, setPaymentState] = useState<PaymentState>(PaymentState.CHECKOUT)

    useEffect(() => {}, []);

    const onBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
        return () => BackHandler.removeEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
    }, []);

    const onBackPresssed = () => {
        onBackPress();
    };

    function getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const onContinueCheckout = () =>{
       if(getRandomNumber(1,100)%2===0){
            setPaymentState(PaymentState.SUCCESS)
       }else{
            setPaymentState(PaymentState.FAILURE)
       }
    }

    const onCancelCheckout = () =>{
        onBackPresssed()
    }

    const onContinueToPrint = () => {
        setPaymentState(PaymentState.PRINT)
    }

    const onBackToRides = () =>{
        onBackPresssed()
    }

    const onBackFromPaymentFailed = () =>{
        onBackPresssed()
    }

    return (
        <View style={styles.container1}>
            <LinearGradient
                colors={[
                    ColorUtils.getAlphaColor({
                        colorCode: '#f0f8ff',
                        opacityPercent: 100,
                    }),
                    ColorUtils.getAlphaColor({
                        colorCode: '#c3e4f7',
                        opacityPercent: 100,
                    }),
                ]}
                style={styles.container2}
                locations={[0, 0.5]}
            />
            <View style={styles.container3}>
                {
                    paymentState===PaymentState.CHECKOUT?(
                        <View style={styles.container4}>
                             <LottieView source={imageFile.GIF_CREDIT_CARD} autoPlay loop style={styles.container5}/>
                             <TextView style={styles.text1} fontWeight={FontWeight._700}>
                                {'PAY WITH CARD'}
                            </TextView>
                            <TextView style={styles.text2} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                                {'Please Tap, Swipe or Insert Your Card'}
                            </TextView>
                            <View style={styles.container6}>
                                <View style={styles.container7}>
                                    <TextView style={styles.text3} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                                        {'Subtotal'}
                                    </TextView>
                                    <TextView style={styles.text4} fontWeight={FontWeight._500} extraLineHeight={normFonts.FONT_8}>
                                        {`$${subTotal.toFixed(2)}`}
                                    </TextView>
                                </View>
                                <View style={styles.container8}>
                                    <TextView style={styles.text3} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                                        {'Tax'}
                                    </TextView>
                                    <TextView style={styles.text4} fontWeight={FontWeight._500} extraLineHeight={normFonts.FONT_8}>
                                        {`$10.00`}
                                    </TextView>
                                </View>
                                <View style={styles.container9}>
                                    <TextView style={styles.text5} fontWeight={FontWeight._600} extraLineHeight={normFonts.FONT_8}>
                                        {'Total'}
                                    </TextView>
                                    <TextView style={styles.text5} fontWeight={FontWeight._600} extraLineHeight={normFonts.FONT_8}>
                                        {`$${(subTotal+10).toFixed(2)}`}
                                    </TextView>
                                </View>
                            </View>
                            <View style={styles.container10}>
                                <TouchableOpacity activeOpacity={0.7} onPress={onCancelCheckout}>
                                <View style={styles.container11}>
                                    <TextView style={styles.text6} fontWeight={FontWeight._500}>
                                            {'Cancel'}
                                        </TextView>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} onPress={onContinueCheckout}>
                                <View style={styles.container12}>
                                <TextView style={styles.text7} fontWeight={FontWeight._500}>
                                        {'Continue'}
                                    </TextView>
                                </View>
                                </TouchableOpacity>
                                
                                
                            </View>
                        </View>
                    ):null
                }
                {
                    paymentState===PaymentState.SUCCESS?(
                        <View style={styles.container4}>
                       <LottieView source={imageFile.GIF_PAYMENT_SUCCESS} autoPlay loop style={styles.container5}/>
                        <TextView style={styles.text1} fontWeight={FontWeight._700}>
                           {'THANK YOU'}
                       </TextView>
                       <TextView style={styles.text2} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                           {'Your Payment is Successful'}
                       </TextView>
                       <View style={styles.container6}>
                           <View style={styles.container7}>
                               <TextView style={styles.text3} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                                   {'Subtotal'}
                               </TextView>
                               <TextView style={styles.text4} fontWeight={FontWeight._500} extraLineHeight={normFonts.FONT_8}>
                                   {`$${subTotal.toFixed(2)}`}
                               </TextView>
                           </View>
                           <View style={styles.container8}>
                               <TextView style={styles.text3} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                                   {'Tax'}
                               </TextView>
                               <TextView style={styles.text4} fontWeight={FontWeight._500} extraLineHeight={normFonts.FONT_8}>
                                   {`$10.00`}
                               </TextView>
                           </View>
                           <View style={styles.container9}>
                               <TextView style={styles.text5} fontWeight={FontWeight._600} extraLineHeight={normFonts.FONT_8}>
                                   {'Total'}
                               </TextView>
                               <TextView style={styles.text5} fontWeight={FontWeight._600} extraLineHeight={normFonts.FONT_8}>
                                   {`$${(subTotal+10).toFixed(2)}`}
                               </TextView>
                           </View>
                       </View>
                       <View style={styles.container10}>
                           <TouchableOpacity activeOpacity={0.7} onPress={onContinueToPrint}>
                           <View style={styles.container12}>
                           <TextView style={styles.text7} fontWeight={FontWeight._500}>
                                   {'Continue'}
                               </TextView>
                           </View>
                           </TouchableOpacity>
                           
                           
                       </View>
                   </View>
                    ):null
                }
                {
                    paymentState===PaymentState.FAILURE?(
                        <View style={styles.container4}>
                        <ImageView source={imageFile.IC_CROSS} style={styles.container50}/>
                        <TextView style={styles.text10} fontWeight={FontWeight._700}>
                           {'PAYMENT FAILED'}
                       </TextView>
                       <TextView style={styles.text2} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                           {'Please Try Again'}
                       </TextView>
                       
                       <View style={styles.container10}>
                          
                           <TouchableOpacity activeOpacity={0.7} onPress={onBackFromPaymentFailed}>
                           <View style={styles.container12}>
                           <TextView style={styles.text7} fontWeight={FontWeight._500}>
                                   {'Go Back'}
                               </TextView>
                           </View>
                           </TouchableOpacity>
                           
                           
                       </View>
                   </View>
                    ):null
                }
                {
                    paymentState===PaymentState.PRINT?(
                        <View style={styles.container4}>
                        <LottieView source={imageFile.GIF_PRINT} autoPlay loop style={styles.container5}/>
                        <TextView style={styles.text1} fontWeight={FontWeight._700}>
                           {'ENJOY YOUR RIDES!'}
                       </TextView>
                       <TextView style={styles.text2} fontWeight={FontWeight._400} extraLineHeight={normFonts.FONT_8}>
                           {'Please Pickup Your Printed Tickets'}
                       </TextView>
                       
                       <View style={styles.container10}>
                           
                           <TouchableOpacity activeOpacity={0.7} onPress={onBackToRides}>
                           <View style={styles.container12}>
                           <TextView style={styles.text7} fontWeight={FontWeight._500}>
                                   {'Go Back'}
                               </TextView>
                           </View>
                           </TouchableOpacity>
                           
                           
                       </View>
                   </View>
                    ):null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
    },
    container2: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
    },
    container3: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height:'100%',
        position:'absolute'
    },
    container4: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    container5:{
        width:normDimens.DIMEN_200, height: normDimens.DIMEN_160
    },
    container50:{
        width:normDimens.DIMEN_100, height: normDimens.DIMEN_100
    },
    text1: {
        fontSize: normFonts.FONT_24,
        alignSelf: 'center',
        color:'#00357B',
        marginTop: normDimens.DIMEN_16
    },
    text10: {
        fontSize: normFonts.FONT_24,
        alignSelf: 'center',
        color:'#00357B',
        marginTop: normDimens.DIMEN_100
    },
    text2: {
        fontSize: normFonts.FONT_14,
        alignSelf: 'center',
        color:'#001737',
        marginTop: normDimens.DIMEN_16,
        maxWidth: normDimens.DIMEN_200,
        textAlign:'center',
    },
    container6:{
        display: 'flex',
        flexDirection:'column',
        width: normDimens.DIMEN_320,
        height: normDimens.DIMEN_100,
        backgroundColor: 'white',
        borderRadius: normDimens.DIMEN_8,
        marginTop: normDimens.DIMEN_20
    },
    container7:{
        display: 'flex',
        flexDirection:'row',
        width: '100%',
        height: normDimens.DIMEN_20,
        justifyContent:'space-between',
        paddingLeft: normDimens.DIMEN_16,
        paddingRight: normDimens.DIMEN_16,
        marginTop: normDimens.DIMEN_12
    },
    container8:{
        display: 'flex',
        flexDirection:'row',
        width: '100%',
        height: normDimens.DIMEN_20,
        justifyContent:'space-between',
        paddingLeft: normDimens.DIMEN_16,
        paddingRight: normDimens.DIMEN_16,
        marginTop: normDimens.DIMEN_4
    },
    container9:{
        display: 'flex',
        flexDirection:'row',
        width: '100%',
        height: normDimens.DIMEN_40,
        justifyContent:'space-between',
        paddingLeft: normDimens.DIMEN_16,
        paddingRight: normDimens.DIMEN_16,
        marginTop: normDimens.DIMEN_4
    },
    text3: {
        fontSize: normFonts.FONT_12,
        alignSelf: 'center',
        color:'#001737',
    },
    text4: {
        fontSize: normFonts.FONT_12,
        alignSelf: 'center',
        color:'#001737',
    },
    text5: {
        fontSize: normFonts.FONT_15,
        alignSelf: 'center',
        color:'#001737',
    },
    container10:{
        display: 'flex',
        flexDirection:'row',
        height: normDimens.DIMEN_40,
        marginTop: normDimens.DIMEN_120
    },
    container11:{
        display: 'flex',
        flexDirection:'column',
        height: normDimens.DIMEN_40,
        width: normDimens.DIMEN_120,
        borderColor: '#001737',
        borderRadius: normDimens.DIMEN_8,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:normDimens.DIMEN_1,
        marginEnd: normDimens.DIMEN_16
    },
    container12:{
        display: 'flex',
        flexDirection:'column',
        width: normDimens.DIMEN_120,
        height: normDimens.DIMEN_40,
        backgroundColor: '#001737',
        borderRadius: normDimens.DIMEN_8,
        justifyContent:'center',
        alignItems:'center',
    },
    text6: {
        fontSize: normFonts.FONT_16,
        alignSelf: 'center',
        color:'#001737',
        marginTop: normDimens.DIMEN_2
    },
    text7: {
        fontSize: normFonts.FONT_16,
        alignSelf: 'center',
        color:'white',
        marginTop: normDimens.DIMEN_2
    },
});

export default Payment;
