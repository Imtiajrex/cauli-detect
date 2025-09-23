// import { Tabs } from 'expo-router';
// import { Camera, History, Settings } from 'lucide-react-native';

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#22C55E',
//         tabBarInactiveTintColor: '#6B7280',
//         tabBarStyle: {
//           backgroundColor: '#FFFFFF',
//           borderTopWidth: 1,
//           borderTopColor: '#E5E7EB',
//           paddingBottom: 8,
//           paddingTop: 8,
//           height: 88,
//         },
//         tabBarLabelStyle: {
//           fontFamily: 'Inter-SemiBold',
//           fontSize: 12,
//           marginTop: 4,
//         },
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Detect',
//           tabBarIcon: ({ size, color }) => (
//             <Camera size={size} color={color} strokeWidth={2} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="history"
//         options={{
//           title: 'History',
//           tabBarIcon: ({ size, color }) => (
//             <History size={size} color={color} strokeWidth={2} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: 'Settings',
//           tabBarIcon: ({ size, color }) => (
//             <Settings size={size} color={color} strokeWidth={2} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }










import { Tabs } from 'expo-router';
import { Camera, History, Settings, BookOpen } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 12,
          marginTop: 4,
        },
      }}>
      
      <Tabs.Screen
        name="information"
        options={{
          title: 'Education',
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} strokeWidth={2} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Detect',
          tabBarIcon: ({ size, color }) => (
            <Camera size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => (
            <History size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}