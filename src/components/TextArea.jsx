/*
Author: Zahid Hussain
March 28, 2021
AutoInput with Intellisense for Emoji and anyother character.
*/

import React from "react";
import { SentimentSatisfiedAltOutlined } from "@material-ui/icons";
import { Chip } from "@material-ui/core";
import ChatInput from "../common/ChatInput";
import { Picker, emojiIndex } from "emoji-mart";
import FlexContainer from "../common/FlexContainer";

const TextArea = (props) => {
  const { value, onChange, onSend, ...rest } = props;
  //html value
  return (
    <ChatInput
      value={value}
      onChange={onChange}
      onSend={onSend}
      PickerIcon={SentimentSatisfiedAltOutlined}
      PickerComponent={Picker}
      autoTrigger={[
        {
          trigger: ":",
          dataProvider: (token) => emojiIndex.search(token),
          getDropDownValues: (searchResult) => {
            return searchResult.map((item) => ({
              ...item,
              menuItem: `${item.native} ${item.colons}`,
              //menuItem canbe string, HTML or React JSX literal element
            }));
          },
          outPutComponent: (selected) => {
            //return selected.native;
            //select element can string, HTML or a React component
            return selected.native;
            //return (props) => <span {...props}>{selected.native}</span>;
          },
        },

        {
          trigger: "@",
          dataProvider: (token) => emojiIndex.search(token),
          getDropDownValues: (searchResult) => {
            return searchResult.map((item) => ({
              ...item,
              menuItem: `${item.native} ${item.colons}`,
              //menuItem canbe string, HTML or React JSX literal element
            }));
          },
          outPutComponent: (selected) => {
            //return selected.name;
            //select element can string, HTML or a React component
            return (props) => <Chip label={selected.native} {...props} />;
          },
        },
      ]}
      {...rest}
    />
  );
};

export default TextArea;
