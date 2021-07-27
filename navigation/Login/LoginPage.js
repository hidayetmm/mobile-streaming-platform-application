import React, { useContext, useState } from "react";
import axios from "axios";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import { Input, Button, Spinner } from "@ui-kitten/components";
import Context from "../../Context/Context";
import { images, COLORS } from "../../constants";

import { useForm, useController } from "react-hook-form";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginRegisterToggle, setLoginRegisterToggle] = useState("login");

  const { loggedIn, setLoggedIn, setUserDetails } = useContext(Context);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 20,
      paddingRight: 20,
      height: windowHeight * 0.78,
    },
    logo: {
      width: 30,
      height: 30,
    },
    view: {
      display: "flex",
      justifyContent: "space-evenly",
      width: windowWidth * 0.8,
      height: windowHeight * (loginRegisterToggle === "login" ? 0.27 : 0.5),
    },
    inputView: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height: windowHeight * (loginRegisterToggle === "login" ? 0.14 : 0.38),
      marginBottom: 5,
    },
    button: {},
    indicator: {
      padding: 0,
      margin: 0,
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });
  const LoadingIndicator = () => <Spinner status="basic" size="tiny" />;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const InputField = ({ name, control, placeholder, defaultValue }) => {
    const { field } = useController({
      control,
      defaultValue: defaultValue,
      name,
      rules: {
        required: true,
      },
    });
    return (
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        secureTextEntry={name === "password" || name === "passwordConfirmer"}
      />
    );
  };

  const signInHandler = (data) => {
    setLoading(true);

    axios
      .post(Config.REACT_APP_MATRIX + "/_matrix/client/r0/login", {
        type: "m.login.password",
        identifier: {
          type: "m.id.user",
          user: data.username.toString().toLowerCase(),
        },
        password: data.password,
      })
      .then((res) => {
        const user = JSON.parse(res.config.data);
        console.log(user);

        const userData = {
          username: user.identifier.user,
          ...res.data,
        };
        console.log(userData);
        setLoading(false);
        setUserDetails(userData);

        AsyncStorage.setItem("userData", JSON.stringify(userData));
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err.message);
      });
  };

  const signUpHandler = (data) => {
    setLoading(true);
    console.log(data);

    const password =
      data.password === data.passwordConfirmer ? data.password : null;

    const signupData = {
      auth: {
        example_credential: "verypoorsharedsecret",
        session: "",
        type: "m.login.dummy",
      },
      password: password,
      username: data.username,
    };

    const url =
      Config.REACT_APP_MATRIX + "/_matrix/client/r0/register?kind=user";
    console.log(signupData);
    console.log(url);

    check_avatar = `https://ui-avatars.com/api/?size=400&name=${data.username}&length=10&font-size=0.1`;

    // Register on Matrix
    axios
      .post(url, signupData)
      .then((res) => {
        //

        axios
          .post(
            Config.REACT_APP_TOOT_BACKEND +
              "users/update?access_token=" +
              res["data"]["access_token"],
            {
              first_name: data.firstname,
              last_name: data.lastname,
              email: data.email,
              avatar_url: check_avatar,
              tags: [1],
            }
          )
          .then((res) => {
            const user_data = res.data.item;
            console.log(res);

            /* create wallet */
            //createWallet(res['data']['access_token'], user_data.matrix_user_id);

            // const url = process.env.REACT_APP_WALLET_URL + "api/v1/wallets";

            // const axiosConfig = {
            //   headers: {
            //     access_token: res["data"]["access_token"],
            //     user_id: user_data.matrix_user_id,
            //   },
            // };
            // axios
            //   .post(url, {}, axiosConfig)
            //   .then(({ data }) => {
            //     setWalletBalance(data.balance);
            //     localStorage.setItem("walletBalance", data.balance);
            //     console.log("ATTENTION: ", data);
            //   })
            //   .catch((err) => {
            //     console.log("ATTENTION: ", err);
            //   });

            /* update last login */
            axios
              .post(
                Config.REACT_APP_TOOT_BACKEND +
                  "users/update_last_login?access_token=" +
                  res["data"]["access_token"]
              )
              .then((updateLastLoginRes) => {
                setLoading(false);

                console.log(updateLastLoginRes);
              })
              .catch((updateLastLoginErr) => {
                setLoading(false);

                console.log(updateLastLoginErr);
              });

            // /* update avatar on matrix */
            // if (check_avatar.length > 0 && Boolean(user_data?.matrix_user_id)) {
            //   updateAvatarOnMatrix(
            //     user_data.matrix_user_id,
            //     res["data"]["access_token"],
            //     check_avatar
            //   );
            // }

            // // send verify code
            // if (registerType === "normal") {
            //   sendVerifyCode(email);
            // }

            // var authdata = {};
            // authdata["user"] = user_data;
            // authdata["access_token"] = res["data"]["access_token"];

            // window.localStorage.setItem("authdata", JSON.stringify(authdata));

            // const redirect_after_login = window.localStorage.getItem(
            //   "redirect_after_login"
            // );

            // setShowAlert(true);
            // setAlertType("success");
            // setAlertMsg("Register success");
            // setAlertRedirectUrl(
            //   Boolean(redirect_after_login) ? redirect_after_login : "/"
            // );
            // setLoading(false);
          });

        //
        // const user = JSON.parse(res.config.data);

        // const userData = {
        //   username: user.username,
        //   ...res.data,
        // };
        // console.log(res);
        // setLoading(false);
        // setUserDetails(userData);

        // AsyncStorage.setItem("userData", JSON.stringify(userData));
        // setLoggedIn(true);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  return (
    <View>
      <View style={styles.modal}>
        <Image style={styles.logo} source={images.logo} resizeMode="contain" />
        {loginRegisterToggle === "login" ? (
          <View style={styles.view}>
            <View style={styles.inputView}>
              <View>
                <InputField
                  control={control}
                  placeholder="Username"
                  name="username"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.username && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
              <View>
                <InputField
                  control={control}
                  placeholder="Password"
                  name="password"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.password && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 110,
                justifyContent: "space-between",
              }}
            >
              <Button
                accessoryLeft={loading ? LoadingIndicator : null}
                style={styles.button}
                onPress={handleSubmit(signInHandler)}
              >
                {!loading && "Login"}
              </Button>
              <Text style={{ color: COLORS.white }}>
                Don't have an account?
              </Text>
              <Button
                style={{ width: 100 }}
                size="small"
                onPress={() => setLoginRegisterToggle("register")}
              >
                Register
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.view}>
            <View style={styles.inputView}>
              <View>
                <InputField
                  control={control}
                  placeholder="First name"
                  name="firstName"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.username && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
              <View>
                <InputField
                  control={control}
                  placeholder="Last name"
                  name="lastName"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.password && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
              <View>
                <InputField
                  control={control}
                  placeholder="E-mail"
                  name="email"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.password && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
              <View>
                <InputField
                  control={control}
                  placeholder="Username"
                  name="username"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.password && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
              <View>
                <InputField
                  control={control}
                  placeholder="Password"
                  name="password"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.password && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
              <View>
                <InputField
                  control={control}
                  placeholder="Confirm password"
                  name="passwordConfirmer"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.password && (
                  <Text style={{ color: "white" }}>This is required.</Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 110,
                justifyContent: "space-between",
              }}
            >
              <Button
                accessoryLeft={loading ? LoadingIndicator : null}
                style={styles.button}
                onPress={handleSubmit(signUpHandler)}
              >
                {!loading && "Register"}
              </Button>
              <Text style={{ color: COLORS.white }}>
                {loginRegisterToggle === "login"
                  ? "Don't have an account?"
                  : "Have an account?"}
              </Text>
              <Button
                style={{ width: 100 }}
                size="small"
                onPress={() => setLoginRegisterToggle("login")}
              >
                Login
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;
