import {useAppDispatch, useAppSelector} from "./useStore";
import {useUpdateUserMutation} from "../services/authService";
import {selectUser, updateUserData} from "../store/slices/userSlice";

const useUpdateUserData = () => {
    const userData = useAppSelector(selectUser);
    const [updateUser, result] = useUpdateUserMutation();
    const dispatch = useAppDispatch();

    const handleUpdateUser = async (newData: {
        fullName?: string;
        image_url?: string;
        bio?: string;
        email?: string;
    }) => {
        const { fullName, image_url, bio } = newData;
        if (userData) {
            if (fullName && fullName !== userData.fullName && fullName.length >= 2) {
                await updateUser({ userId: userData.id, body: { fullName } });
                if (!result.error) {
                    dispatch(updateUserData({ fullName }));
                }
            }

            if (
                image_url &&
                image_url !== userData.image_url &&
                image_url.length >= 6
            ) {
                await updateUser({ userId: userData.id, body: { image_url } });
                if (!result.error) {
                    dispatch(updateUserData({ image_url }));
                }
            }

            if (bio && bio !== userData.bio && bio.length >= 6) {
                await updateUser({ userId: userData.id, body: { bio } });
                if (!result.error) {
                    dispatch(updateUserData({ bio }));
                }
            }
        }
    };

    return handleUpdateUser;
};

export default useUpdateUserData;
