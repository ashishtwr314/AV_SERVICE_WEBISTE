import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Radio,
  Checkbox,
  Input,
  Space,
  Empty,
  Divider,
  Rate,
  Slider,
  Steps,
} from "antd";
import {
  SoundFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  LikeOutlined,
  DislikeOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
// utils
import {
  convertArrToStr,
  convertStrToArrString,
} from "../../../../../../src/utils/utils";
import { useSpeechSynthesis } from "react-speech-kit";

const { Step } = Steps;
const { Paragraph } = Typography;
const { TextArea } = Input;

type DynamicFeedbackType = {
  questions: any;
  f_questionEditor_cust: any;
  handleSubmit: any;
  answered: boolean;
  setAnswered: Function;
  setQuestions: Function;
};

type QuestionType = {
  item: any;
  f_questionEditor_cust: any;
  active?: any;
  setActive?: any;
};

const SingleQuestion = ({ item, f_questionEditor_cust }: QuestionType) => {
  console.log(item);
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <Radio.Group
              name="singleQuest"
              size="large"
              defaultValue={item.given_answer}
              onChange={(e: any) => {
                f_questionEditor_cust(
                  item.uuid,
                  item.type,
                  e.target.value,
                  "given_answer"
                );
              }}
            >
              <Space direction="vertical">
                <Radio value="a">
                  <h6>a. {item.a.a}</h6>
                </Radio>
                <Radio value="b">
                  <h6>b. {item.a.b}</h6>
                </Radio>
                <Radio value="c">
                  <h6>c. {item.a.c}</h6>
                </Radio>
                <Radio value="d">
                  <h6>d. {item.a.d}</h6>
                </Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const MultipleQuestion = ({ item, f_questionEditor_cust }: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);
  const isChecked = (option: any, allSelectedOptions: string) => {
    if (allSelectedOptions === "") return false;

    const selectedOptionsArray = convertStrToArrString(allSelectedOptions);
    if (selectedOptionsArray.includes(option)) {
      return true;
    }
    return false;
  };

  const handleChange = (
    isCheckedOption: boolean,
    option: string,
    existingAns: string
  ) => {
    let existingAnsConvrtArr: any = [];
    if (existingAns !== "")
      existingAnsConvrtArr = convertStrToArrString(existingAns);

    if (isCheckedOption) {
      if (existingAnsConvrtArr && !existingAnsConvrtArr.includes(option)) {
        const tmp = existingAnsConvrtArr;
        tmp.push(option);
        f_questionEditor_cust(
          item.uuid,
          item.type,
          convertArrToStr(tmp),
          "given_answer"
        );
      }
    } else if (!isCheckedOption) {
      if (existingAnsConvrtArr && existingAnsConvrtArr.includes(option)) {
        let tmp = existingAnsConvrtArr;
        tmp = tmp.filter((optionTmp: string) => optionTmp !== option);
        f_questionEditor_cust(
          item.uuid,
          item.type,
          convertArrToStr(tmp),
          "given_answer"
        );
      }
    }
  };

  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <Space direction="vertical">
              <Checkbox
                checked={isChecked("a", item.given_answer)}
                onChange={(e: any) => {
                  handleChange(e.target.checked, "a", item.given_answer);
                }}
              >
                <h6>a. {item.a.a}</h6>
              </Checkbox>
              <Checkbox
                checked={isChecked("b", item.given_answer)}
                onChange={(e: any) => {
                  handleChange(e.target.checked, "b", item.given_answer);
                }}
              >
                <h6>b. {item.a.b}</h6>
              </Checkbox>
              <Checkbox
                checked={isChecked("c", item.given_answer)}
                onChange={(e: any) => {
                  handleChange(e.target.checked, "c", item.given_answer);
                }}
              >
                <h6>c. {item.a.c}</h6>
              </Checkbox>
              <Checkbox
                checked={isChecked("d", item.given_answer)}
                onChange={(e: any) => {
                  handleChange(e.target.checked, "d", item.given_answer);
                }}
              >
                <h6>d. {item.a.d}</h6>
              </Checkbox>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const BooleanQuestion = ({ item, f_questionEditor_cust }: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>

                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <Radio.Group
              name="booleanQuest"
              size="large"
              defaultValue={item.given_answer}
              onChange={(e: any) => {
                f_questionEditor_cust(
                  item.uuid,
                  item.type,
                  e.target.value,
                  "given_answer"
                );
              }}
            >
              <Space direction="vertical">
                <Radio value="a">
                  <h6>a. {item.a.a}</h6>
                </Radio>
                <Radio value="b">
                  <h6>b. {item.a.b}</h6>
                </Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const CommentQuestion = ({ item, f_questionEditor_cust }: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <TextArea
              size="large"
              rows={4}
              showCount
              maxLength={100}
              value={item.given_answer}
              onChange={(e: any) => {
                f_questionEditor_cust(
                  item.uuid,
                  item.type,
                  e.target.value,
                  "given_answer"
                );
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const NpsQuestion = ({ item, f_questionEditor_cust }: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const npsRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <Radio.Group
              name="npsQuest"
              size="large"
              defaultValue={item.given_answer}
              onChange={(e: any) => {
                f_questionEditor_cust(
                  item.uuid,
                  item.type,
                  e.target.value,
                  "given_answer"
                );
              }}
            >
              {npsRating &&
                npsRating.map((rate: number, index: number) => (
                  <Radio.Button key={index.toString()} value={rate}>
                    {rate}
                  </Radio.Button>
                ))}
            </Radio.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const StarRatingQuestion = ({ item, f_questionEditor_cust }: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <h6>
              <Rate
                key={item.uuid}
                defaultValue={item.given_answer}
                onChange={(value: number) => {
                  f_questionEditor_cust(
                    item.uuid,
                    item.type,
                    value,
                    "given_answer"
                  );
                }}
              />
            </h6>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const EmojiRatingQuestion = ({
  item,
  f_questionEditor_cust,
  active,
  setActive,
}: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const Rating1 = () => <div style={{ fontSize: "1.5rem" }}>😡</div>;
  const Rating2 = () => <div style={{ fontSize: "1.5rem" }}>🙁</div>;
  const Rating3 = () => <div style={{ fontSize: "1.5rem" }}>😐</div>;
  const Rating4 = () => <div style={{ fontSize: "1.5rem" }}>😊</div>;
  const Rating5 = () => <div style={{ fontSize: "1.5rem" }}>😍</div>;
  const [hoverActive, setHoverActive] = useState<null | number>(null);
  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];

  const activeIcons: any = {
    1: <Rating1 />,
    2: <Rating2 />,
    3: <Rating3 />,
    4: <Rating4 />,
    5: <Rating5 />,
  };

  const customIcons: any = {
    1: <FrownOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
    2: <FrownOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
    3: <MehOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
    4: <SmileOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
    5: <SmileOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
  };
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <h6>
              <Rate
                key={item.uuid}
                defaultValue={item.given_answer}
                character={({ index }: any) =>
                  hoverActive == index + 1 || active == index + 1
                    ? activeIcons[index + 1]
                    : customIcons[index + 1]
                }
                onHoverChange={(index) => setHoverActive(index)}
                onChange={(value: number) => {
                  setActive(value);
                  f_questionEditor_cust(
                    item.uuid,
                    item.type,
                    value,
                    "given_answer"
                  );
                }}
              />
            </h6>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const SliderQuestion = ({ item, f_questionEditor_cust }: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const marks = {
    0: {
      label: <h6>0</h6>,
    },
    5: {
      label: <h6>5</h6>,
    },
    10: {
      label: <h6>10</h6>,
    },
  };
  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <Slider
              marks={marks}
              defaultValue={item.given_answer}
              max={10}
              onChange={(value: number) => {
                f_questionEditor_cust(
                  item.uuid,
                  item.type,
                  value,
                  "given_answer"
                );
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const ThumbsUpQuestion = ({
  item,
  f_questionEditor_cust,
  active,
  setActive,
}: QuestionType) => {
  const [audio, setAudio] = useState(new Audio(item.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const Rating1 = () => <div style={{ fontSize: "1.5rem" }}>👍</div>;
  const Rating2 = () => <div style={{ fontSize: "1.5rem" }}>👎</div>;
  const Rating3 = () => <div style={{ fontSize: "1.5rem" }}>🙄</div>;

  const [hoverActive, setHoverActive] = useState<null | number>(null);

  const { speak, voices } = useSpeechSynthesis();
  const voice = voices.filter((x: any) => x.lang == "hi-IN")[1];

  const activeIcons: any = {
    1: <Rating1 />,
    2: <Rating2 />,
    3: <Rating3 />,
  };

  const customIcons: any = {
    1: <LikeOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
    2: <DislikeOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
    3: <QuestionOutlined style={{ color: "#b4b4b440", fontSize: "2.05rem" }} />,
  };
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
                xl={{ span: 16 }}
              >
                <h4 style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    {" "}
                    {item.qno}.&nbsp;{item.q}
                  </span>
                  <audio style={{ marginLeft: "2px" }} controls>
                    <source src={item.audio} />
                  </audio>

                  <SoundFilled
                    onClick={() => {
                      speak({ text: `${item.qno}. ${item.q}`, voice });
                      // isPlaying ? audio.pause() : audio.play();
                      // setIsPlaying((prev) => !prev);
                    }}
                    style={{
                      color: "#000",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </h4>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <h6>
              <Rate
                key={item.uuid}
                defaultValue={item.given_answer}
                character={({ index }: any) =>
                  hoverActive == index + 1 || active == index + 1
                    ? activeIcons[index + 1]
                    : customIcons[index + 1]
                }
                onHoverChange={(index) => setHoverActive(index)}
                onChange={(value: number) => {
                  console.log(value);
                  setActive(value);
                  f_questionEditor_cust(
                    item.uuid,
                    item.type,
                    value,
                    "given_answer"
                  );
                }}
              />
            </h6>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Feedback = ({
  questions,
  f_questionEditor_cust,
  handleSubmit,
  answered,
  setAnswered,
  setQuestions,
}: DynamicFeedbackType) => {
  const [current, setCurrent] = useState<number>(0);
  const [active, setActive] = useState<number>(0);

  const next = () => {
    setAnswered(false);
    setCurrent((curr) => curr + 1);
  };

  const prev = () => {
    setCurrent((curr) => curr - 1);
  };

  useEffect(() => {
    const { given_answer } = questions[current];
    setActive(given_answer);

    if (given_answer) {
      setAnswered(true);
    } else {
      setAnswered(false);
    }

    // const questionsCopy = JSON.parse(JSON.stringify(questions));
    // console.log(questionsCopy[current])
    // questionsCopy[current] = {
    //     ...questionsCopy[current],
    //     given_answer: 0,
    // }
    // console.log(questionsCopy)
    // setQuestions(questionsCopy)
  }, [current]);

  return (
    <>
      <div className="steps-content">
        {questions[current] && (
          <>
            {questions[current].type === "single" && (
              <SingleQuestion
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "multiple" && (
              <MultipleQuestion
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "boolean" && (
              <BooleanQuestion
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "comment" && (
              <CommentQuestion
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "nps" && (
              <NpsQuestion
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "star_rating" && (
              <StarRatingQuestion
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "emoji_rating" && (
              <EmojiRatingQuestion
                active={active}
                setActive={setActive}
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "text_slider" && (
              <SliderQuestion
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
            {questions[current].type === "thumbs_up_emoji" && (
              <ThumbsUpQuestion
                active={active}
                setActive={setActive}
                item={questions[current]}
                f_questionEditor_cust={f_questionEditor_cust}
              />
            )}
          </>
        )}
      </div>
      <Divider />
      <div className="steps-action">
        {current > 0 && (
          <button
            style={{ margin: "0 8px" }}
            onClick={prev}
            className="btn btn-primary"
            type="button"
          >
            Previous
          </button>
        )}
        {current === questions.length - 1 && (
          <button
            onClick={() => {
              console.log(questions);
              handleSubmit();
              // submitedStat.setIsSubmitted(true);
            }}
            disabled={!answered}
            className="btn btn-success"
            type="button"
          >
            Finish
          </button>
        )}
        {current < questions.length - 1 && (
          <button
            onClick={next}
            disabled={!answered}
            className="btn btn-primary"
            type="button"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Feedback;
