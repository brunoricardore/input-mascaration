import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import InputMask from "../components/Input";

import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

class FormExampleForTest extends React.Component<any, any> {
  //   const [value, setValue] = React.useState("08579449389");

  //   const valueChanged = (newValue: string) => {
  //     console.log(newValue);
  //     setValue(newValue);
  //   };

  constructor(props: any) {
    super(props);
    this.state = { value: "" };
  }

  valueChanged(newValue: string) {
    console.log(newValue);
    this.setState({value: newValue});
  }

  render() {
    return (
      <>
        <button
          id="changeCPF"
          onClick={() => {
            this.setState({ value: "94899169949" });
          }}
        >
          Change input data
        </button>
        <InputMask
          mask="###.###.###-##"
          value={this.state.value}
          onValueChanged={this.valueChanged}
        />
      </>
    );
  }
}

describe("InputMask", () => {
  let container = shallow(<FormExampleForTest />);

  const instance = container.instance();

  test("renders the Input component", () => {
    render(<FormExampleForTest />);
  });

  test("Test value state change", () => {
    // console.log(container.state());
    instance.setState({value: '08579443989'})
    // console.log(container.state());
    console.log(container.find('InputMask').props());
  });
});
