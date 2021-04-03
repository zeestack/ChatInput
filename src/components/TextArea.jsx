import React from "react";
import { SentimentSatisfiedAltOutlined } from "@material-ui/icons";
import AutoInput from "../common/ChatInput";
import { Picker, emojiIndex } from "emoji-mart";

const TextArea = (props) => {
  const { value, onChange, onSend, ...rest } = props;
  //html value
  return (
    <AutoInput
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
              //menuItem canbe string of HTML or React JSX literal element
            }));
          },
          outPutComponent: (selected) => {
            return selected.native;
            //return (props) => <Chip label={selected.native} {...props} />;
          },
        },
      ]}
      {...rest}
    />
  );
};

export default TextArea;
