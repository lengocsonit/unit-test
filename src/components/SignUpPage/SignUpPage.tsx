import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Translate } from "react-localize-redux";
import { SignUpPageActions } from "../../stores/SignUpPage/action";
import { State } from "../../stores/reducer";
import { UserSignUp } from "../../models/User";
import { withLocalize, LocalizeContextProps } from "react-localize-redux";

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.mitsubishielectric.co.jp/">
        Mitsubishi Electric Corporation
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,

    color: "#fff",
  },
}));

function SignUpPage({ translate, activeLanguage }: LocalizeContextProps) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { userName, userPassword } = useSelector((state: State) => ({
    userName: state.signUpPage.userName,
    userPassword: state.signUpPage.userPassword,
  }));

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [agreeCheckBox, setAgreeCheckBox] = useState(false);

  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  const [userNameIsError, setUserNameIsError] = useState(false);

  const [userPasswordIsError, setUserPasswordIsError] = useState(false);

  const [confirmUserPasswordIsError, setConfirmUserPasswordIsError] = useState(
    false
  );
  // Null＆空文字列チェック

  const isNullOrEmpty = (value: string) => {
    if (value !== null && value !== "") {
      return false;
    } else {
      return true;
    }
  };

  // ユーザ名検証

  const validateUserName = (userName: string) => {
    // TODO userName(外仕が出来たら検証条件を更新)

    if (userName.length >= 6) {
      return true;
    } else {
      return false;
    }
  };

  // パスワード検証

  const validateUserPassword = (userPassword: string) => {
    // TODO password検証外仕が出来たら検証条件を更新)

    if (userPassword.length >= 6) {
      return true;
    } else {
      return false;
    }
  };

  // 再入力パスワード検証

  const checkConfirmUserPassword = (confirmUserPassword: string) => {
    return userPassword === confirmUserPassword;
  };

  // ユーザ名を入力する時、検証してステートを更新する

  const handleUserNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!isNullOrEmpty(event.target.value)) {
      if (!validateUserName(event.target.value)) {
        setUserNameIsError(true);

        return;
      }
    }

    setUserNameIsError(false);

    // dispatch(SignUpPageActions.setUserName(event.target.value));
  };

  // パスワードを入力する時、検証してステートを更新する

  const handleUserPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!isNullOrEmpty(event.target.value)) {
      if (!validateUserPassword(event.target.value)) {
        setUserPasswordIsError(true);

        return;
      }
    }

    setUserPasswordIsError(false);

    // dispatch(SignUpPageActions.setUserPassword(event.target.value));
  };

  // 再入力パスワードを入力する時、検証してステートを更新する

  const handleConfirmUserPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setConfirmUserPassword(event.target.value);
  };

  // サインインアップボタンを押下する
  const handleSignUpClick = (event: React.MouseEvent) => {
    event.preventDefault();

    signUpHandle();
  };

  // サインアップ実行

  const signUpHandle = () => {
    // dispatch(
    //   SignUpPageActions.signUp(
    //     new UserSignUp({
    //       user_name: userName,
    //       user_password: userPassword,
    //       user_comment: "",
    //       user_role: "administrator",
    //       user_language: languageValue.code,
    //     })
    //   )
    // );
    dispatch(
      SignUpPageActions.signUp(
        new UserSignUp({
          userName: "test123456",
          userPassword: "123456",
          language: "ja",
          role: "administrator",
        })
      )
    );
  };

  // エンターキーを押下する

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      signUpHandle();
    }
  };

  // チェックボックスをチェックする時、ステートを更新する

  const handleAgreeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeCheckBox(event.target.checked);
  };

  // サインアップボタンの状態を更新する

  useEffect(() => {
    // ユーザ名＆パスワード＆チェックボックスチェック確認

    const checkError =
      !userNameIsError &&
      !userPasswordIsError &&
      !userNameIsError &&
      agreeCheckBox &&
      !isNullOrEmpty(userName) &&
      !isNullOrEmpty(userPassword) &&
      !isNullOrEmpty(confirmUserPassword);

    setIsButtonDisabled(!checkError);
  }, [userNameIsError, userPasswordIsError, userNameIsError, agreeCheckBox]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar} />

        <Typography component="h1" variant="h5" id="sign-up">
          Sign Up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={userNameIsError}
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="ç"
                label="Username"
                autoFocus
                onChange={handleUserNameChange}
                onKeyPress={handleKeyPress}
                helperText={userNameIsError ? "Username is correct" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={userPasswordIsError}
                variant="outlined"
                required
                fullWidth
                name="userPassword"
                label="Password"
                type="password"
                id="userPassword"
                autoComplete="current-password"
                onChange={handleUserPasswordChange}
                onKeyPress={handleKeyPress}
                helperText={userPasswordIsError ? "Password is correct" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={confirmUserPasswordIsError}
                variant="outlined"
                required
                fullWidth
                name="confirmUserPassword"
                label="Confirm password"
                type="password"
                id="confirmUserPassword"
                autoComplete="current-password"
                onChange={handleConfirmUserPasswordChange}
                onKeyPress={handleKeyPress}
                helperText={
                  confirmUserPasswordIsError
                    ? "Confirm password is correct"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    onChange={handleAgreeCheckBox}
                  />
                }
                label="Remember me"
              />
            </Grid>
          </Grid>

          <Button
            id="sign-up"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Da co tai khoan
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <Box mt={15}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withLocalize(SignUpPage);
