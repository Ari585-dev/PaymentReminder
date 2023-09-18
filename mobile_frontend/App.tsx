import { View, Text, TextInput, Pressable, Image } from 'react-native';
import tailwind from 'twrnc';

export default function LoginScreen() {
  return (
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
      <Image style={{ paddingLeft:320, width: 340, height: 340}} source={require('./img/udistritallogo.png')} />
        <Text style={tailwind`text-3xl font-bold mb-6 text-slate-900`}>Login</Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Ingresa codigo de estudiante"
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#000"
          placeholder="Ingresa contraseña"
        />

        <View style={tailwind`flex flex-row justify-between items-center my-4`}>
          <View style={tailwind`flex-row items-center`}>
            
          </View>
        </View>

        <Pressable
          style={tailwind`h-13 bg-blue-500 rounded-md flex flex-row justify-center items-center px-6`}
        >
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>Login</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}