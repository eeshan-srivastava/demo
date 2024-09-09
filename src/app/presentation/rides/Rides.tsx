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
import { useNavigation } from '@react-navigation/native';
import BackPressUtils from '../../../utils/BackPressUtils';

interface Props {}

const Rides = () => {
    const [rides, setRides] = useState<Array<RideItemBean>>([]);
    const [currency, setCurrency] = useState<string>('$');
    const [selectedRides, setSelectedRides] = useState<Array<RideItemBean>>([]);
    const [totalPricing, setTotalPricing] = useState<number>(0);

    const navigation: any = useNavigation();

    const updateData = (data: any) => {
        const _rides = data.data.rides;
        const bean = _rides.map((item: RideItemBean) => {
            const i = { ...item };
            i.selected = false;
            return i;
        });
        setRides(bean);
    };

    const getRides = async () => {
        try {
            // const data = await demoApi.getRidesApi({});
            // updateData(data);
            updateData(cloneDeep(mainJson.rides));
        } catch (err: any) {
            updateData(cloneDeep(mainJson.rides));
        }
    };

    const onClickItem = (selectedRideId: string) => {
        const newData = cloneDeep(rides).map((item) => {
            if (item.id === selectedRideId) {
                const data = { ...item };
                if (data.selected) {
                    data.selected = false;
                    setSelectedRides([...selectedRides].filter((item) => item.id !== selectedRideId));
                    setTotalPricing(totalPricing - item.ticketPricing.value);
                } else {
                    data.selected = true;
                    setSelectedRides([...selectedRides, data]);
                    setTotalPricing(totalPricing + item.ticketPricing.value);
                }
                return data;
            } else {
                return item;
            }
        });
        setRides(newData);
    };

    const _renderItem = useCallback(
        ({ item }: { item: any; index: number }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        onClickItem(item.id);
                    }}
                    activeOpacity={0.7}>
                    <View style={item.selected ? styles.container20 : styles.container2}>
                        <ImageView
                            source={{ uri: item.image }}
                            style={styles.container4}
                            resizeMode={ImageResizeMode.contain}
                        />
                        <View style={styles.container21}>
                            <TextView style={styles.text1} fontWeight={FontWeight._600}>
                                {item.name}
                            </TextView>
                            <TextView style={styles.text2} fontWeight={FontWeight._700}>
                                {item.ticketPricing.text}
                            </TextView>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        },
        [rides],
    );

    const keyExtractor = (item: any, index: any) => item.id.toString();

    useEffect(() => {
        getRides();
    }, []);

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

    const onClickCheckout = () => {
        if(totalPricing!=0){
            navigation.navigate('payments', {
                subTotal: totalPricing,
            });
        }
    };

    return (
        <View style={styles.container6}>
            <TextView style={styles.text3} fontWeight={FontWeight._700}>
                {'Choose Your Rides To Buy'}
            </TextView>
            <TextView style={styles.text4} fontWeight={FontWeight._700}>
                {'Tickets'}
            </TextView>

            <View style={styles.container1}>
                <FlashList
                    data={rides}
                    renderItem={_renderItem}
                    keyExtractor={keyExtractor}
                    estimatedItemSize={normDimens.DIMEN_80}
                />
            </View>
            <View style={styles.container31}>
                <TextView
                    style={styles.text5}
                    fontWeight={FontWeight._600}>{`$${selectedRides.length} Rides Added`}</TextView>
                <TextView style={styles.text6} fontWeight={FontWeight._400}>{`Total: $${totalPricing.toFixed(
                    2,
                )}`}</TextView>
                <View style={styles.container32}>
                    <TouchableOpacity
                        onPress={onBackPresssed}
                        activeOpacity={0.7}
                        style={styles.container330}>
                        <View style={styles.container33}>
                            <ImageView
                                source={imageFile.IC_ARROW_LEFT}
                                style={styles.container35}
                                resizeMode={ImageResizeMode.contain}
                            />
                            <TextView style={styles.text7} fontWeight={FontWeight._500}>
                                {'Back'}
                            </TextView>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClickCheckout}
                        activeOpacity={0.7}
                        style={styles.container340}>
                        <View style={styles.container34}>
                            <TextView style={styles.text8} fontWeight={FontWeight._500}>
                                {'Checkout'}
                            </TextView>
                            <ImageView
                                source={imageFile.IC_ARROW_RIGHT}
                                style={styles.container36}
                                resizeMode={ImageResizeMode.contain}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        width: '100%',
        flex: 1,
        paddingStart: normDimens.DIMEN_20,
        paddingEnd: normDimens.DIMEN_20,
        marginTop: normDimens.DIMEN_20,
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        height: normDimens.DIMEN_78,
        backgroundColor: 'white',
        marginBottom: normDimens.DIMEN_10,
        borderRadius: normDimens.DIMEN_12,
        position: 'relative',
    },
    container20: {
        display: 'flex',
        flexDirection: 'row',
        height: normDimens.DIMEN_80,
        backgroundColor: 'white',
        marginBottom: normDimens.DIMEN_10,
        borderRadius: normDimens.DIMEN_12,
        position: 'relative',
        borderWidth: normDimens.DIMEN_1,
        borderColor: '#00357B',
    },
    container200: {},
    container21: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        marginLeft: normDimens.DIMEN_12,
    },
    container3: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: normDimens.DIMEN_1,
        backgroundColor: colorCode.actionTint,
        position: 'absolute',
        bottom: 0,
    },
    text1: {
        fontSize: normFonts.FONT_12,
        lineHeight: normFonts.FONT_16,
        textAlign: 'left',
        width: '100%',
        color: '#001737',
    },
    text2: {
        fontSize: normFonts.FONT_12,
        lineHeight: normFonts.FONT_16,
        marginTop: normDimens.DIMEN_8,
        fontWeight: '400',
        textAlign: 'left',
        color: '#EC1C2D',
    },
    container4: {
        width: normDimens.DIMEN_70,
        height: normDimens.DIMEN_70,
        marginTop: normDimens.DIMEN_0,
        alignSelf: 'center',
        marginStart: normDimens.DIMEN_4,
    },
    container5: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: normDimens.DIMEN_100,
    },
    text3: {
        fontSize: normFonts.FONT_18,
        lineHeight: normFonts.FONT_16,
        textAlign: 'left',
        width: '100%',
        marginTop: normDimens.DIMEN_40,
        color: '#001737',
        marginLeft: normDimens.DIMEN_20,
    },
    container6: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        backgroundColor: '#f0f5fc',
    },
    container30: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
    },
    text4: {
        fontSize: normFonts.FONT_18,
        lineHeight: normFonts.FONT_16,
        textAlign: 'left',
        width: '100%',
        marginTop: normDimens.DIMEN_4,
        color: '#001737',
        marginLeft: normDimens.DIMEN_20,
    },
    container31: {
        display: 'flex',
        flexDirection: 'column',
        height: normDimens.DIMEN_120,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingLeft: normDimens.DIMEN_16,
        paddingRight: normDimens.DIMEN_16,
        backgroundColor: 'white',
    },
    container32: {
        display: 'flex',
        flexDirection: 'row',
        height: normDimens.DIMEN_36,
        width: '100%',
        marginTop: normDimens.DIMEN_12,
    },
    container33: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        flex: 1.5,
        backgroundColor: 'white',
        borderRadius: normDimens.DIMEN_8,
        marginEnd: normDimens.DIMEN_16,
        borderWidth: normDimens.DIMEN_2,
        borderColor: '#00357B',
    },
    container330: {
        flex: 1.5,
    },
    container34: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        flex: 2,
        backgroundColor: '#00357B',
        borderRadius: normDimens.DIMEN_8,
    },
    container340: {
        flex: 2,
    },
    container35: {
        height: normDimens.DIMEN_12,
        width: normDimens.DIMEN_12,
        alignSelf: 'center',
        marginEnd: normDimens.DIMEN_8,
    },
    container36: {
        height: normDimens.DIMEN_12,
        width: normDimens.DIMEN_12,
        alignSelf: 'center',
        marginStart: normDimens.DIMEN_12,
    },
    text5: {
        fontSize: normFonts.FONT_14,
        textAlign: 'left',
        marginTop: normDimens.DIMEN_16,
    },
    text6: {
        fontSize: normFonts.FONT_14,
        textAlign: 'left',
        marginTop: normDimens.DIMEN_4,
    },
    text7: {
        fontSize: normFonts.FONT_14,
        color: '#00357B',
        alignSelf: 'center',
    },
    text8: {
        fontSize: normFonts.FONT_14,
        color: 'white',
        alignSelf: 'center',
    },
});

export default Rides;
