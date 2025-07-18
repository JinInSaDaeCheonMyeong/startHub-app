import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import BackButton from '../../../component/BackButton';
import { Colors } from '../../../constants/Color';
import { Fonts } from '../../../constants/Fonts';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../../navigation/RootStack";

const { width, height } = Dimensions.get('window');

const CANVAS_WIDTH = width * 0.95;
const CANVAS_HEIGHT = height * 0.35;

const BMCBlock = ({ title, description, style }: { title: string; description: string; style: any }) => (
    <View style={[styles.block, style]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
    </View>
);

type InBMCScreenProps = StackScreenProps<RootStackParamList, 'InBMC'>;

export default function InBMCScreen({navigation, route : {params}} : InBMCScreenProps) {
    const handleBackPress = () => {
        navigation.goBack()
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <BackButton
                        width={24} 
                        height={24} 
                        color={Colors.black2} 
                        onClick={handleBackPress}
                />
                <Text style={styles.headerTitle}>{params.BMC.title}</Text>
                <View style={styles.placeholder} />
            </View>
            
            {/* BMC 캔버스 */}
            <ReactNativeZoomableView
                maxZoom={3}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                style={[styles.wrapper]}
            >
                <View style={styles.centeringView}>
                    <View style={styles.canvas}>
                        <BMCBlock 
                            title="핵심 파트너" 
                            description={params.BMC.keyPartners}
                            style={styles.keyPartners} 
                        />
                        <BMCBlock 
                            title="핵심 활동" 
                            description={params.BMC.keyActivities}
                            style={styles.keyActivities} 
                        />
                        <BMCBlock 
                            title="핵심 자원" 
                            description={params.BMC.keyResources}
                            style={styles.keyResources} 
                        />
                        <BMCBlock 
                            title="가치 제안" 
                            description={params.BMC.valuePropositions}
                            style={styles.valuePropositions} 
                        />
                        <BMCBlock 
                            title="고객 관계" 
                            description={params.BMC.customerRelationships}
                            style={styles.customerRelationships} 
                        />
                        <BMCBlock 
                            title="채널" 
                            description={params.BMC.channels}
                            style={styles.channels} 
                        />
                        <BMCBlock 
                            title="고객 세그먼트" 
                            description={params.BMC.customerSegments}
                            style={styles.customerSegments} 
                        />
                        <BMCBlock 
                            title="비용 구조" 
                            description={params.BMC.costStructure}
                            style={styles.costStructure} 
                        />
                        <BMCBlock 
                            title="수익 흐름" 
                            description={params.BMC.revenueStreams}
                            style={styles.revenueStreams} 
                        />
                    </View>
                </View>
            </ReactNativeZoomableView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.white1,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray3,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.semiBold,
        color: Colors.black2,
        textAlign: 'center',
    },
    placeholder: {
        width: 40, // backButton과 같은 너비로 설정하여 중앙 정렬
    },
    wrapper: {
        flex: 1,
    },
    centeringView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    canvas: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: '#fff',
        position: 'relative',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    block: {
        position: 'absolute',
        borderWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: '#fafafa',
        padding: 6,
        borderRadius: 0,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 8,
        marginBottom: 4,
        color: '#2c3e50',
        textAlign: 'center',
    },
    desc: {
        fontSize: 5,
        color: '#555',
        lineHeight: 10,
    },

    // BMC 위치 스타일
    keyPartners: {
        left: '0%',
        top: '0%',
        width: '20%',
        height: '60%',
    },
    keyActivities: {
        left: '20%',
        top: '0%',
        width: '20%',
        height: '30%',
    },
    keyResources: {
        left: '20%',
        top: '30%',
        width: '20%',
        height: '30%',
    },
    valuePropositions: {
        left: '40%',
        top: '0%',
        width: '20%',
        height: '60%',
    },
    customerRelationships: {
        left: '60%',
        top: '0%',
        width: '20%',
        height: '30%',
    },
    channels: {
        left: '60%',
        top: '30%',
        width: '20%',
        height: '30%',
    },
    customerSegments: {
        left: '80%',
        top: '0%',
        width: '20%',
        height: '60%',
    },
    costStructure: {
        left: '0%',
        top: '60%',
        width: '50%',
        height: '40%',
    },
    revenueStreams: {
        left: '50%',
        top: '60%',
        width: '50%',
        height: '40%',
    },
});
