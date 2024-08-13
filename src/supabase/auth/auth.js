import { supabase } from "../supabase";

export async function signUp({
  email,
  password,
  name,
  course,
  semester,
  setButtonState,
  navigate,
}) {
  console.log({
    email,
    password,
    name,
    course,
    semester,
    setButtonState,
    navigate,
  });
  setButtonState("loading");

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    setButtonState("idle");
    throw new Error("There is an Error");
  }

  console.log(data);
  const { data: theData, error: theError } = await supabase
    .from("users")
    .insert([{ course, semester, name }])
    .select();

  if (theError) {
    console.error(theError);
    setButtonState("idle");
    throw new Error("There is an Error");
  }

  setButtonState("idle");
  navigate("/");

  return null;
}

export async function login({ email, password, navigate, setButtonState }) {
  setButtonState("loading");
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    setButtonState("idle");
    throw new Error(`${error.message}`);
  }
  setButtonState("idle");
  navigate("/");
  return null;
}

export async function getUser(navigate) {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    navigate("/authenticate");
    throw Error("Session not found, login in again");
  }
  await supabase.auth.getUser();
  return null;
}
