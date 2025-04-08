import { Text, View } from "react-native";
import { useUser } from "../../hooks/UserContext";
import { Link } from "expo-router";

export default function Inicial(){
    const { userData } = useUser()

    return(
        <View>
            <Text>{userData.nombre}</Text>
            <Text>{userData.apellidoPaterno}</Text>
            <Text>{userData.apellidoMaterno}</Text>
            <Text>{userData.fechaNacimiento}</Text>
            <Text>{userData.email}</Text>
            <Text>{userData.password}</Text>
            <Link href="/user" className="text-5xl m-5">Usuario</Link>
        </View>
    )
}