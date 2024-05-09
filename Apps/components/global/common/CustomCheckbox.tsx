// // CustomCheckbox.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const CustomCheckbox: React.FC<{
//   label: string;
//   value: boolean;
//   name?:string;
//   onValueChange: (value: boolean) => void;
// }> = ({ label, value, onValueChange,name }) => {
//   return (
//     <TouchableOpacity onPress={() => onValueChange(!value)}>
//       <View style={styles.checkboxContainer}>
//         <Ionicons
//           name={value ? 'checkbox' : 'checkbox-outline-blank'}
//           size={24}
//           color="#223e4b"
//         />
//         <Text style={styles.label}>{label}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//     marginBottom: 5,
//   },
//   label: {
//     marginLeft: 8,
//   },
// });

// export default CustomCheckbox;
