import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Card, Modal, Icon } from "@ui-kitten/components";
import Context from "../../Context/Context";

import { useForm, useController } from "react-hook-form";

const Login = ({ setVisible }) => {
  const userValue = useContext(Context);
  // console.log("ATTENTION: USERVALUE: ", userValue);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    modal: {
      minWidth: windowWidth * 0.8,
    },
    card: {
      paddingBottom: 10,
    },
    view: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height: windowHeight * 0.27,
    },
    icon: {
      marginRight: 0,
      marginLeft: "auto",
      width: 32,
      height: 32,
    },
    inputView: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      height: windowHeight * 0.14,
    },
    button: {},
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });

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
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
      />
    );
  };

  const onSubmit = () => {};
  return (
    <View>
      <Modal
        // visible={true}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
        style={styles.modal}
      >
        <Card style={styles.card} disabled={true}>
          <View style={styles.view}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon style={styles.icon} fill="#8F9BB3" name="close-outline" />
            </TouchableOpacity>
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
            <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
              Login
            </Button>
          </View>
        </Card>
      </Modal>
    </View>
  );
};

export default Login;
