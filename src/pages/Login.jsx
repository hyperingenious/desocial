import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {TextInput,PasswordInput,Text,Paper,Group,Button,Anchor,Stack,Center,Input,Loader,} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth/auth";
import { useAuthContext } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, authState } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) navigate("/feed");
  }, [isAuthenticated, navigate]);
      console.log(isAuthenticated);


  return (
    <>
      {!isAuthenticated && <LoginContent />}
      {authState === "loading" && (
        <Center h={100}>
          <Loader color="blue" type="oval" />
        </Center>
      )}
    </>
  );
}

function LoginContent(props) {
  const [buttonState, setButtonState] = useState("idle"); // state is loading when's loading
  const [type, toggle] = useToggle(["login", "register"]);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      course: "BCA",
      semester: "1",
    },

    validate: {
      name: (val) =>
        val !== "" || type === "login" ? null : "Must not be empty",
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  async function handleSubmit(values) {
    setButtonState("loading"); // Set loading state

    try {
      if (type === "register") {
        await authService.signUp({ ...values });
        navigate("/feed");
      } else if (type === "login") {
        await authService.login({ ...values });
        navigate("/feed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setButtonState("idle"); // Reset to idle
    }
  }
  return (
    <Center
      maw={"100%"}
      h={"100vh"}
      pt={"xl"}
      style={{ backgroundImage: "url(/src/assets/danger.jpg)" }}
    >
      <Paper maw={400} radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500} mb={"sm"}>
          Welcome to desocial, {type} with
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}
            {type === "register" && (
              <>
                <Input.Wrapper label="Course" description="" error="">
                  <Input
                    onChange={(event) =>
                      form.setFieldValue("course", event.target.value)
                    }
                    defaultValue={"BCA"}
                    component="select"
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                  >
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BA">BA</option>
                    <option value="MBA">MBA</option>
                  </Input>
                </Input.Wrapper>
                <Input.Wrapper label="Semester" description="" error="">
                  <Input
                    onChange={(event) =>
                      form.setFieldValue("semester", event.target.value)
                    }
                    label="semester"
                    component="select"
                    defaultValue={1}
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                  >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                  </Input>
                </Input.Wrapper>
              </>
            )}

            <TextInput
              required
              label="Email"
              placeholder="rajkumar@mail.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              type="submit"
              disabled={buttonState === "loading" ? true : false}
              radius="xl"
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
