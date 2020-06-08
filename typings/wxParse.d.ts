declare namespace wxParse {
  // 单独属性
  type TMakeMapObj = { [x: string]: boolean };
  type TNodeAttr = {
    [x: string]: string[] | string
  };
  type TNode = {
    node: string
    tag?: string
    index?: string
    tagType?: "block" | "inline" | "closeSelf"
    attr?: TNodeAttr
    classStr?: string
    styleStr?: string
    imgIndex?: number
    from?: string
    text?: string
    textArray?: TEmoji[] | string[]
  };
  interface IResult {
    view?: {
      [key: string]: string | number
    };
    source?: string
    node: string
    nodes: TNode[]
    images: TNode[]
    imageUrls: string[]
  }
  type TEmoji = { [x: string]: string };
  // 方法
  type HTMLParser = () => {};
  type parseStartTag = () => {};
  type parseEndTag = () => {};
  type makeMap = (str: string) => TMakeMapObj;
}