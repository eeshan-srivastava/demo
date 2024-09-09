import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import BackPressUtils from '../../../utils/BackPressUtils';
import ImageView from '../widgets/imageView/ImageView';
import imageFile from '../../../resources/images/imageFile';
import { ImageResizeMode } from '../widgets/imageView/ImageUtils';
import LinearGradient from 'react-native-linear-gradient';
import ColorUtils from '../../../resources/colors/ColorUtils';
import normDimens from '../../../resources/dimens/normDimens';
import TextView from '../widgets/textView/TextView';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const Main = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;
    const [pageState, setPageState] = useState<string>('tap_to_start');

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

    const onClickTapToStart = () => {
        setPageState('options');
    };

    const onClickBuyTickets = () => {
        navigation.navigate('rides');
    };

    return (
        <SafeArea>
            <View style={styles.container1}>
                <ImageView
                    source={imageFile.IMG_COSTER}
                    style={styles.container2}
                    resizeMode={ImageResizeMode.cover}
                />
                {pageState === 'tap_to_start' ? (
                    <View style={styles.container3}>
                        <TouchableOpacity
                            style={styles.container3}
                            activeOpacity={0.96}
                            onPress={onClickTapToStart}>
                            <View style={styles.container3}>
                                <LinearGradient
                                    colors={[
                                        ColorUtils.getAlphaColor({
                                            colorCode: '#001737',
                                            opacityPercent: 79,
                                        }),
                                        ColorUtils.getAlphaColor({
                                            colorCode: '#001737',
                                            opacityPercent: 89,
                                        }),
                                        ColorUtils.getAlphaColor({
                                            colorCode: '#001737',
                                            opacityPercent: 100,
                                        }),
                                    ]}
                                    style={styles.container3}
                                    locations={[0, 0.56, 1]}
                                />
                                <ImageView
                                    source={imageFile.IC_CLICK}
                                    style={styles.container4}
                                    resizeMode={ImageResizeMode.contain}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.container3}>
                        <LinearGradient
                            colors={[
                                ColorUtils.getAlphaColor({
                                    colorCode: '#001737',
                                    opacityPercent: 79,
                                }),
                                ColorUtils.getAlphaColor({
                                    colorCode: '#001737',
                                    opacityPercent: 89,
                                }),
                                ColorUtils.getAlphaColor({
                                    colorCode: '#001737',
                                    opacityPercent: 100,
                                }),
                            ]}
                            style={styles.container3}
                            locations={[0, 0.56, 1]}
                        />
                        <View style={styles.container5}>
                            <TextView style={styles.text1} fontWeight={FontWeight._700}>
                                {'READY TO GET STARTED?'}
                            </TextView>
                            <TextView style={styles.text2} fontWeight={FontWeight._500}>
                                {'Choose an option to Begin.'}
                            </TextView>
                            <TouchableOpacity
                                style={styles.container6}
                                onPress={onClickBuyTickets}
                                activeOpacity={0.8}>
                                <TextView
                                    style={styles.text3}
                                    fontWeight={FontWeight._600}
                                    onClick={onClickBuyTickets}>
                                    {'Buy Tickets'}
                                </TextView>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeArea>
    );
};

export default Main;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colorCode.white,
        flex: 1,
    },
    container2: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    container3: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container4: {
        display: 'flex',
        flexDirection: 'column',
        width: normDimens.DIMEN_100,
        height: normDimens.DIMEN_100,
        position: 'absolute',
        bottom: normDimens.DIMEN_160,
    },
    container5: {
        display: 'flex',
        flexDirection: 'column',
        marginStart: normDimens.DIMEN_32,
        marginEnd: normDimens.DIMEN_32,
        position: 'absolute',
    },
    container6: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#E9F3F9',
        minWidth: '100%',
        height: normDimens.DIMEN_100,
        borderRadius: normDimens.DIMEN_24,
        padding: normDimens.DIMEN_32,
        marginTop: normDimens.DIMEN_32,
    },
    text1: {
        fontSize: normFonts.FONT_20,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.white, opacityPercent: 100 }),
    },
    text2: {
        fontSize: normFonts.FONT_14,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.white, opacityPercent: 100 }),
        marginTop: normDimens.DIMEN_8,
    },
    text3: {
        fontSize: normFonts.FONT_16,
        color: ColorUtils.getAlphaColor({ colorCode: '#001737', opacityPercent: 100 }),
    },
});
