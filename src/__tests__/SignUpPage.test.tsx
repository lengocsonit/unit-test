import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { shallow } from "enzyme";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import { createShallow, createMount } from "@material-ui/core/test-utils";

// describe("HelloComponent", () => {
//   const mount = createMount(<SignUpPage />);
//   const wrapper = mount()
//   test("starts counter on 0", () => {
//     // const wrapper = shallow(<SignUpPage />);

//     // 初めて画面を表示する
//     expect(wrapper).toMatchSnapshot();

//   });
// });
// function Bar() {
//     return (
//       <div>
//         <div className="in-bar" />
//       </div>
//     );
//   }

// function Foo() {
//     return (
//       <div>
//         <Bar />
//       </div>
//     );
//   }

// describe("<SignUpPage /> interactions", () => {
//   it("should call the onClick function when 'Add Comment' button is clicked", () => {
//     const mockedHandleClickAddComment = jest.fn();
//     wrapper.instance().handleSignUpClick = mockedHandleClickAddComment;
//     wrapper.find(Button).first().onClick();
//     expect(mockedHandleClickAddComment).toHaveBeenCalledTimes(1);
//   });
// });

// describe("SignUpPage.jsx", () => {
//   const defaultValues = {
//     title: "hoge",
//   };

//   test("表示", () => {
//     const signUpPage = shallow(<SignUpPage />);

//     // 初めて画面を表示する
//     expect(signUpPage).toMatchSnapshot();

//     // userName is empty
//     signUpPage.find("#userName").props().value.
//     // Tương tác
//     // expect(checkbox.text()).toEqual('Off');
//     // checkbox.find('input').simulate('change');
//     // expect(checkbox.text()).toEqual('On');

//     // password is empty
//     signUpPage.find("#userName").props().value.

//     // checkbox is not check

//     // button is disable

//     // username typing
//     // password typing
//     // checkbox check
//     // button enable

//     //
//   });

//   test("ユーザ名入力", () => {
//     const signUpPage = shallow(<SignUpPage />);

//     // 初めて画面を表示する
//     signUpPage.find("#userName").text
//     // Tương tác
//     // expect(checkbox.text()).toEqual('Off');
//     // checkbox.find('input').simulate('change');
//     // expect(checkbox.text()).toEqual('On');
//   });
// });
