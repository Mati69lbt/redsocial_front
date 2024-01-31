import { Global } from "./Global";

const getProfile = async (userId, setUserProfile, token) => {
  try {
    const request = await fetch(Global.url_backend + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setUserProfile(data.user);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getProfile;
