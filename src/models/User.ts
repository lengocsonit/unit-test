import { List, Record } from "immutable";
import dayjs, { Dayjs } from "dayjs";

import { JSObject } from "../types/Common";

export class UserSignUp extends Record<{
  userName: string;
  userPassword: string;
  language: string;
  role: string;
}>({
  userName: "",
  userPassword: "",
  language: "",
  role: "administrator",
}) {}
