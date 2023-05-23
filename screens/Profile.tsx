import { Avatar, Box, Center, Heading } from "native-base";
import React, { useLayoutEffect } from "react";
import Actions from "../components/profile/Actions";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import EditProfile from "../components/profile/EditProfile";
import UserData from "../components/profile/UserData";
import { useAppSelector } from "../hooks/useStore";
import { useGetProfileQuery } from "../services/authService";
import { selectUser } from "../store/slices/userSlice";

interface ProfileProps {
  route: any;
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({ navigation, route }) => {
  const me = useAppSelector(selectUser);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [action, setAction] = React.useState<
    "edit" | "photo" | "change" | null
  >(null);

  const id = route.params?.userId || null;
  const { data: user, isLoading, error } = useGetProfileQuery(id);

  useLayoutEffect(() => {
    if (user && !isLoading) {
      setUserProfile(user);
    } else if (!isLoading) {
      setUserProfile(me);
    }
  }, [id, user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Box flexDir={"row"} alignItems={"center"}>
          <Avatar size={8} source={{ uri: userProfile?.image_url }} mr={2}>
            {userProfile?.fullName.slice(0, 2)}
          </Avatar>
          <Heading fontSize={20}>{userProfile?.fullName || "Loading"}</Heading>
        </Box>
      ),
    });
  }, [userProfile]);

  const onChangeAction = (action: any) => {
    setAction((prev) => (action === prev ? null : action));
  };

  if (!userProfile || !me)
    return (
      <Center flex={1}>
        <Heading size={"xl"} color={"primary.700"}>
          Loading...
        </Heading>
      </Center>
    );

  return (
    <Box flex={1} pt={8} bgColor={"primary.700"} alignItems={"center"}>
      <Box mx={"10%"} w={"80%"}>
        <Box
          flexDir={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={4}
        >
          <Avatar size={"2xl"} mr={4} source={{ uri: userProfile?.image_url }}>
            {userProfile?.fullName.slice(0, 2)}
          </Avatar>
          {userProfile.id === me.id && (
            <Actions action={action} onChange={onChangeAction} />
          )}
        </Box>
        {(!action || userProfile.id !== me.id) && (
          <UserData user={userProfile} />
        )}
        {action === "edit" && <EditProfile user={me} />}
        {action === "photo" && <EditProfile user={me} photo={true} />}
        {action === "change" && (
          <ChangePasswordForm user={me} setAction={setAction} />
        )}
      </Box>
    </Box>
  );
};

export default Profile;
