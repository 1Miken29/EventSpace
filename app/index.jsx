import { Link } from 'expo-router';
import '../global.css'
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className='text-[#9B47C3] text-[35px] w-[354px] m-2 text-center font-outfit-medium'>
        ¿Quieres hacer crecer tu negocio?
      </Text>
      <TouchableOpacity className='w-[322px] border border-[#C4C4C4] py-[18px] rounded-full'>
        <Link href="/Propietario/registerP1" className='text-2xl font-outfit-medium text-center'>Inicia como propietario</Link>
      </TouchableOpacity>
      <Text className='text-[#9B47C3] text-[35px] w-[354px] m-2 text-center font-outfit-medium'>
        ¿Quieres reservar un salón?
      </Text>
      <TouchableOpacity className='w-[322px] border border-[#C4C4C4] py-[18px] rounded-full'>
      <Link href="/Cliente/registerC1" className='text-2xl font-outfit-medium text-center'>Inicia como cliente</Link>
      </TouchableOpacity>
    </View>
  );
}
