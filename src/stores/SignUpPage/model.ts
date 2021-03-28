import { Record } from "immutable";

export class SignUpState extends Record<{
  userName: string;
  userPassword: string;
}>({
  userName: "",
  userPassword: "",
}) {}
