/*
Author: Zahid Hussain
March 28, 2021
ChatInput with Intellisense for Emoji and anyother character.
*/

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { SentimentSatisfied, SendRounded } from "@material-ui/icons";
import { MenuItem, MenuList, Paper } from "@material-ui/core";

import FlexContainer from "./FlexContainer";
import IconBtn from "./IconBtn";
import withPopup from "./withPopup";
import { withStyles } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";

const StyledMenuList = withStyles((theme) => ({
  root: {
    position: "absolute",
    left: (props) => `${props.position.x}px`,
    top: (props) => `${props.position.y + 25}px`,
    maxHeight: "10rem",
    overflow: "hidden",
  },
}))(({ children, menuRef, ...rest }) => (
  <MenuList ref={menuRef} component={Paper} {...rest}>
    {children}
  </MenuList>
));

const TxtInput = styled.div`
  display: inline-block;
  width: calc(100% - 100px);
  height: 100%;
  text-align: start;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  overflow: hidden;
  background-color: beige;
  border-radius: 16px;
  &:focus {
    outline: none;
  }
`;

const ChatInput = (props) => {
  const {
    id = "some-random-Id-1",
    value = "",
    autoTrigger = [{}],
    PickerComponent = {},
    PickerIcon = SentimentSatisfied,
    onChange,
    onSend,
    ...rest
  } = props;

  const EmojiPicker = withPopup(PickerComponent);
  const [showEmoji, setShowEmoji] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState([]);

  const inputRef = useRef(TxtInput);
  const menuRef = useRef(StyledMenuList);
  const menuItemRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (inputRef.current.innerHTML === value) return null;
    if (inputRef && inputRef.current) {
      inputRef.current.innerHTML = value;
      placeCaretAtEnd(inputRef.current);
    }
  }, [value]);

  function handleSearch(triggerObj, text) {
    //get the trigger and dataProvider from detected triggerObject
    const { trigger, dataProvider } = triggerObj;
    if (!text.includes(trigger)) return [];
    const searchKeys = text.split(trigger);
    const searchKey = searchKeys[searchKeys.length - 1];
    if (!searchKey) return [];
    if (/\s/.test(searchKey)) return [];
    return dataProvider(searchKey);
  }

  function handleClick(e, selected) {
    const trObject = triggerRef.current;
    const value = selected;
    const display = trObject.outPutComponent(value);
    const newText = inputRef.current.innerHTML;
    const texts = newText.split(trObject.trigger);
    const vkey = texts[texts.length - 1];
    newText.replace(`:${vkey}`, display);
    let upText = newText.replace(`${trObject.trigger}${vkey}`, "");
    upText = upText + getHTMLComponent(display);
    onChange(upText);
    setSearch([]);
  }

  function getHTMLComponent(Component) {
    if (typeof Component === "string") return Component;
    const HTMLWrapper = () => <Component contentEditable={false} />;
    return ReactDOMServer.renderToStaticMarkup(HTMLWrapper());
  }

  function getCaretCoordinates(key, trigger) {
    if (key !== trigger) return position;
    let x = position.x,
      y = position.y;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
    }
    setPosition({ x, y });
    return { x, y };
  }

  function placeCaretAtEnd(el) {
    el.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  function resetTextInput() {
    inputRef.current.innerText = "";
    inputRef.current.innerHTML = "";
    if (onChange) onChange(inputRef.current.innerText);
  }

  function handleInputChange(e) {
    const textValue = e.currentTarget.innerText || "";
    let dTrigger = {};
    for (let index = 0; index < autoTrigger.length; index++) {
      const skeys = textValue.split(autoTrigger[index].trigger);
      if (skeys.length > 1) {
        dTrigger = autoTrigger[index];
        triggerRef.current = dTrigger;
        break;
      }
    }
    setSearch(handleSearch(dTrigger, textValue));
    getCaretCoordinates(textValue[textValue.length - 1], dTrigger.trigger);
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      inputRef.current.innerHTML = inputRef.current.innerHTML + "<br>";
      placeCaretAtEnd(inputRef.current);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!inputRef.current.innerHTML) return;
      onChange(inputRef.current.innerHTML);
      onSend(inputRef.current.innerHTML);
      resetTextInput();
    } else if (e.key === "Escape") setSearch([]);
    else if (e.key === "Tab") {
      e.preventDefault();
      if (menuItemRef && menuItemRef.current) {
        inputRef.current.blur();
        menuItemRef.current.focus();
      }
    }
    return e.keyCode >= 38 && e.keyCode <= 40
      ? menuItemRef && menuItemRef.current
        ? menuItemRef.current.focus()
        : inputRef.current.focus()
      : inputRef.current.focus();
  };

  return (
    <div>
      <FlexContainer width="800px" border="1px solid beige" borderRadius={2}>
        <TxtInput
          id={id}
          ref={inputRef}
          value={inputRef.current.innerHTML}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleInputChange}
          onBlur={() => onChange(inputRef.current.innerHTML)}
          onKeyDown={handleKeyDown}
          {...rest}
        />

        <FlexContainer align="center" justify="center">
          <IconBtn
            message="emojis"
            icon={<PickerIcon />}
            onClick={(e) => {
              setAnchor(e.currentTarget);
              setShowEmoji(!showEmoji);
            }}
          />
          <IconBtn
            message="send"
            icon={<SendRounded />}
            onClick={() => {
              if (inputRef.current.innerHTML) {
                onChange(inputRef.current.innerHTML);
                if (onSend) {
                  onSend(inputRef.current.innerHTML);
                  resetTextInput();
                }
              }
            }}
          />
        </FlexContainer>
      </FlexContainer>

      {triggerRef && triggerRef.current && (
        <StyledMenuList
          menuRef={menuRef}
          position={position}
          variant="menu"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSearch([]);
            }
            return !(e.keyCode >= 38 && e.keyCode <= 40)
              ? placeCaretAtEnd(inputRef.current)
              : undefined;
          }}
          autoFocusItem={true}
        >
          {triggerRef.current.getDropDownValues(search).map((item, index) => (
            <MenuItem
              key={item.id}
              ref={index === 0 ? menuItemRef : null}
              onClick={(e) => handleClick(e, item)}
            >
              {item.menuItem}
            </MenuItem>
          ))}
        </StyledMenuList>
      )}
      <EmojiPicker
        name="emojiPicker"
        anchor={anchor}
        open={showEmoji}
        onClickAway={() => setShowEmoji(!showEmoji)}
        set="google"
        onSelect={(emoji) => {
          //setText(`${text}${emoji.native}`);
          setShowEmoji(false);
          onChange(`${inputRef.current.innerHTML}${emoji.native}`);
        }}
        useButton={true}
        showPreview={false}
        showSkinTones={false}
      />
    </div>
  );
};

export default ChatInput;
