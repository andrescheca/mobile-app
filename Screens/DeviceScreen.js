import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TopNav from '../components/TopNav';
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory-native';
import { throttle } from 'lodash';
import DeviceScreenStyle from './Styles/DeviceScreenStyle';
import { useFocusEffect } from '@react-navigation/native';

const MAX_ARRAY_SIZE = 10;
const GRAPH_HEIGHT = 150;

const emptyInitialObject = {
  rr: [],
  tidal: [],
  o2: [],
  peep: [],
};

const parametersArray = [
  {
    key: 'rr',
    title: 'RR',
    color: DeviceScreenStyle.colors.green,
  },
  {
    key: 'tidal',
    title: 'Tidal',
    color: DeviceScreenStyle.colors.blue,
  },
  {
    key: 'o2',
    title: 'o2',
    color: DeviceScreenStyle.colors.purple,
  },
  {
    key: 'peep',
    title: 'PEEP',
    color: DeviceScreenStyle.colors.red,
  },
];
export default function DeviceScreen({ navigation }) {
  const [socket, setSocket] = useState({});
  const [readyState, setReadyState] = useState(0);
  const [graphValues, setGraphValues] = useState({ ...emptyInitialObject });
  // Use aux state to get information from ws
  const delayedSetGraphValues = useRef(
    throttle((data) => {
      setGraphValues((state) => ({
        rr: [...state.rr, data.rr].slice(-MAX_ARRAY_SIZE),
        tidal: [...state.tidal, data.tidal].slice(-MAX_ARRAY_SIZE),
        o2: [...state.o2, data.o2].slice(-MAX_ARRAY_SIZE),
        peep: [...state.peep, data.peep].slice(-MAX_ARRAY_SIZE),
      }));
    }, 500),
  ).current;

  useFocusEffect(
    useCallback(() => {
      const webSocket = new WebSocket('ws://104.248.228.69:8080/yubox/ws');
      webSocket.onmessage = (e) => {
        const data = e.data.split(' ')[1].split('=');
        const timestamp = e.data.split(' ')[2] / 1000000;
        const rr = parseFloat(data[1].split(',')[0]).toFixed(2);
        const tidal = parseFloat(data[2].split(',')[0]).toFixed(2);
        const o2 = parseFloat(data[3]).toFixed(2);
        const peep = parseFloat(data[3]).toFixed(2);

        delayedSetGraphValues({
          rr: { x: parseInt(timestamp, 10), y: parseFloat(rr) },
          tidal: { x: parseInt(timestamp, 10), y: parseFloat(tidal) },
          o2: { x: parseInt(timestamp, 10), y: parseFloat(o2) },
          peep: { x: parseInt(timestamp, 10), y: parseFloat(peep) },
        });
      };
      setSocket(webSocket);
      return () => {
        webSocket.close();
      };
    }, []),
  );

  useEffect(() => {
    if (socket.readyState) {
      setReadyState(socket.readyState);
    }
  }, [socket.readyState]);

  return (
    <View style={DeviceScreenStyle.styles.container}>
      <TopNav
        toggleDrawer={() => {
          navigation.toggleDrawer();
        }}
        title="Ventilador N98"
        connected={0 < readyState && readyState < 3}
      />
      <View style={DeviceScreenStyle.summaryStyles.container}>
        {parametersArray.map((param) => (
          <View key={param.key}>
            <Text style={StyleSheet.flatten([DeviceScreenStyle.summaryStyles.title, param.color])}>{param.title}</Text>
            <Text style={DeviceScreenStyle.summaryStyles.data}>{graphValues[param.key].length > 0 && graphValues[param.key][graphValues[param.key].length - 1].y}</Text>
          </View>
        ))}
      </View>
      <ScrollView style={DeviceScreenStyle.scrollerStyles.container} contentContainerStyle={DeviceScreenStyle.scrollerStyles.contentContainer}>
        {parametersArray.map((param) => (
          <VictoryChart key={param.key} height={GRAPH_HEIGHT}>
            {graphValues[param.key].length > 1 && <VictoryArea style={{ data: { stroke: param.color.color, strokeWidth: 3, fillOpacity: 0 } }} data={graphValues[param.key]} />}
            <VictoryAxis dependentAxis />
          </VictoryChart>
        ))}
      </ScrollView>
    </View>
  );
}
