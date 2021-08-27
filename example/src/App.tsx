import * as React from 'react';
import {
    Dimensions, Platform, SafeAreaView, StyleSheet,
    View
} from 'react-native';
import BubbleSelect, { Bubble, BubbleNode } from 'react-native-bubble-select';

const { width } = Dimensions.get('window');

const arr: any[] = [{ id: '1', text: '1', }, { id: '2', text: '2', }, { id: '3', text: '3', }, { id: '4', text: '4', }];
const arr1: any[] = [
    { id: '5', text: '5', }, { id: '6', text: '6', }, { id: '7', text: '7', },
    { id: '8', text: '8', }, { id: '9', text: '9', }, { id: '10', text: '10', },
];
const arr2: any[] = [
    { id: '11', text: '11', }, { id: '12', text: '12', }, { id: '13', text: '13', },
    { id: '14', text: '14', }, { id: '15', text: '15', }, { id: '16', text: '16', },
];

export default function App() {
    const [cities, setCities] = React.useState<any[]>([]);
    const [selectedCites, setSelectedCities] = React.useState<BubbleNode[]>([]);
    const [removedCities, setRemovedCities] = React.useState<BubbleNode[]>([]);

    React.useEffect(() => {
        setTimeout(() => {
            setCities(arr);
        }, 1000);

        setTimeout(() => {
            addCities(arr1);
        }, 2000);

        setTimeout(() => {
            addCities(arr2);
        }, 3000);
    }, []);

    const addCities = (newCities: any[]) => {
        setCities([...cities, ...newCities]);
    };

    const handleSelect = (bubble: BubbleNode) => {
        setSelectedCities([...selectedCites, bubble]);
    };

    const handleDeselect = (bubble: BubbleNode) => {
        setSelectedCities(selectedCites.filter(({ id }) => id !== bubble.id));
    };

    const handleRemove = (bubble: BubbleNode) => {
        console.log(bubble);
        setRemovedCities([...removedCities, bubble]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ height: 300, width }}>
                    <BubbleSelect
                        onSelect={handleSelect}
                        onDeselect={handleDeselect}
                        onRemove={handleRemove}
                        width={width}
                        fontName={Platform.select({
                            ios: 'SinhalaSangamMN-Bold',
                            android: 'sans-serif-medium',
                        })}
                        fontSize={12}
                        bubbleSize={35}
                    >
                        {cities.map(city => (
                            <Bubble
                                key={city.id}
                                id={city.id}
                                text={city.text}
                                color={'blue'}
                                selectedColor={'blue'}
                                selectedScale={1.5}
                                deselectedScale={1}
                                radius={35}
                                autoSize={false}
                                image={require('../assets/onboarding_2_2.png')}
                            />
                        ))}
                    </BubbleSelect>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 45,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 50,
        paddingRight: 50,
        marginBottom: Platform.select({
            android: 50,
        }),
        alignItems: 'center',
    },
    message: {},
    selectedCity: {
        marginTop: 15,
        fontSize: 12,
        maxWidth: '80%',
        textAlign: 'center',
    },
});
