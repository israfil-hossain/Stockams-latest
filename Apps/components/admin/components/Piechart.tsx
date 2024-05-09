// import React from 'react';
// import { PieChart } from 'react-native-svg-charts';

// interface PieChartData {
//     value: number;
//     svg: {
//         fill: string;
//         onPress: () => void;
//     };
//     key: string;
// }

// const PieChartExample: React.FC = () => {
//     const data: number[] = [50, 10, 40, 95, -4, -24];

//     const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

//     const pieData: PieChartData[] = data
//         .filter((value) => value > 0)
//         .map((value, index) => ({
//             value,
//             svg: {
//                 fill: randomColor(),
//                 onPress: () => console.log('press', index),
//             },
//             key: `pie-${index}`,
//         }));

//     return <PieChart style={{ height: 200 }} data={pieData} />;
// };

// export default PieChartExample;
